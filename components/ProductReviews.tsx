import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp, Filter, MessageSquare, Send, Trash2 } from 'lucide-react';
import { getProductReviews, addReview, deleteReview } from '../services/SupabaseService';


export type Review = {
  id: string | number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
};

interface ProductReviewsProps {
  productName: string;
  reviews?: Review[];
}

const defaultReviews: Review[] = [];

const ProductReviews: React.FC<ProductReviewsProps> = ({ productName, reviews: initialReviews = defaultReviews }) => {
  const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  // New state for fetched reviews and the form
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isWriting, setIsWriting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [newReview, setNewReview] = useState({ author: '', title: '', content: '', rating: 5 });

  // Fetch reviews from Firebase on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const dbReviews = await getProductReviews(productName);
      if (dbReviews && dbReviews.length > 0) {
        setReviews(dbReviews as Review[]);
      }
    };
    fetchReviews();
  }, [productName]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.content) return;

    setIsSubmitting(true);
    try {
      await addReview(productName, newReview);
      // Optimistically add it to the UI
      setReviews([{
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        verifiedPurchase: false,
        helpfulCount: 0,
        ...newReview
      }, ...reviews]);

      // Reset form
      setIsWriting(false);
      setNewReview({ author: '', title: '', content: '', rating: 5 });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (reviewId: string | number) => {
    if (!window.confirm('Remove this review?')) return;
    setDeletingId(reviewId);
    try {
      await deleteReview(String(reviewId));
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) 
    : "0.0";

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating as keyof typeof ratingCounts]++;
    }
  });
  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(r => r.rating.toString() === filter);

  return (
    <section className="bg-neutral-950 py-16 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

          <div className="md:w-1/3 lg:w-1/4 shrink-0">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-6">Customer Reviews</h3>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-black text-white">{averageRating}</div>
              <div>
                <div className="flex text-red-500 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= Number(averageRating) ? 'fill-current' : 'text-neutral-700'}`} />
                  ))}
                </div>
                <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Based on {totalReviews} reviews</div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating as keyof typeof ratingCounts];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div
                    key={rating}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setFilter(rating.toString() as any)}
                  >
                    <div className="flex items-center gap-1 w-12 text-xs font-bold text-neutral-400 group-hover:text-white transition-colors">
                      {rating} <Star className="w-3 h-3" />
                    </div>
                    <div className="flex-grow h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right text-xs font-bold text-neutral-500">{count}</div>
                  </div>
                );
              })}
            </div>

            <button
              className="w-full py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              onClick={() => setIsWriting(!isWriting)}
            >
              <MessageSquare className="w-4 h-4" /> {isWriting ? 'Cancel' : 'Write a Review'}
            </button>

            {/* NEW FORM SECTION */}
            {isWriting && (
              <form onSubmit={handleSubmit} className="mt-8 bg-neutral-900 border border-white/10 p-6 rounded-sm animate-in fade-in slide-in-from-top-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Submit Your Review</h4>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors ${star <= newReview.rating ? 'text-red-500 fill-current' : 'text-neutral-700 hover:text-red-500/50'}`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 block">Your Name</label>
                  <input required type="text" value={newReview.author} onChange={e => setNewReview({ ...newReview, author: e.target.value })} className="w-full bg-black border border-white/10 p-3 text-white text-sm focus:border-red-500 outline-none" placeholder="John Doe" />
                </div>

                <div className="mb-4">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 block">Review Title</label>
                  <input required type="text" value={newReview.title} onChange={e => setNewReview({ ...newReview, title: e.target.value })} className="w-full bg-black border border-white/10 p-3 text-white text-sm focus:border-red-500 outline-none" placeholder="Great product!" />
                </div>

                <div className="mb-6">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 block">Your Review</label>
                  <textarea required value={newReview.content} onChange={e => setNewReview({ ...newReview, content: e.target.value })} className="w-full bg-black border border-white/10 p-3 text-white text-sm h-32 resize-none focus:border-red-500 outline-none" placeholder="Tell us what you think..." />
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full bg-red-600 text-white font-bold uppercase tracking-widest text-[10px] py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Review</>}
                </button>
              </form>
            )}
            {/* END NEW FORM SECTION */}

          </div>

          <div className="md:w-2/3 lg:w-3/4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h4 className="text-lg font-bold uppercase tracking-widest text-white">
                {filter === 'all' ? 'All Reviews' : `${filter} Star Reviews`}
              </h4>

              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-1"
                >
                  <Filter className="w-3 h-3" /> Clear Filter
                </button>
              )}
            </div>

            <div className="space-y-8">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="bg-neutral-900/50 p-6 md:p-8 border border-white/5 rounded-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-red-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-neutral-700'}`} />
                            ))}
                          </div>
                          <span className="text-white font-bold tracking-wide text-sm">{review.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 font-bold tracking-widest uppercase">
                          <span>{review.author}</span>
                          {review.verifiedPurchase && (
                            <span className="flex items-center gap-1 text-green-500">
                              <CheckCircle className="w-3 h-3" /> Verified Buyer
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-neutral-600 font-bold uppercase tracking-widest">{review.date}</span>
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          title="Remove review"
                          className="p-1.5 text-neutral-700 hover:text-red-500 hover:bg-red-500/10 rounded transition-all disabled:opacity-40"
                        >
                          {deletingId === review.id
                            ? <span className="text-[10px] text-neutral-500">…</span>
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {review.content}
                    </p>

                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({review.helpfulCount})
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border border-dashed border-white/10">
                  <p className="text-neutral-500 text-sm uppercase tracking-widest font-bold">No reviews found for this filter.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
