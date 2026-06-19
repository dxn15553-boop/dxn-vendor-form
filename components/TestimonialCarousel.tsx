import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Health & Wellness Coach",
    content: "The quality of DXN products coming from the Siddipet facility is absolutely world-class. The Saffron Kombucha has become a staple for all my clients. Unmatched purity.",
    rating: 5,
    date: "March 2026"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Daily Consumer",
    content: "I've been using DXN Lingzhi coffee for years, and knowing it's manufactured with such high standards right here in India gives me incredible peace of mind. Highly recommended!",
    rating: 5,
    date: "February 2026"
  },
  {
    id: 3,
    name: "Dr. Ananya Reddy",
    role: "Ayurvedic Practitioner",
    content: "The rigorous quality control and pharma-grade testing at the DXN India Hub ensure that every batch of Ganoderma maintains its therapeutic efficacy. Truly impressive.",
    rating: 5,
    date: "May 2026"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Distributor",
    content: "The consistent quality and reliable supply chain from the new mega-factory has transformed my business. My customers are always satisfied.",
    rating: 4,
    date: "January 2026"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-neutral-950 py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none flex items-center justify-center">
        <Quote className="w-96 h-96 text-white" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4">Global Trust</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">What People Are Saying</h3>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-neutral-900 border border-white/10 p-8 md:p-16 shadow-2xl rounded-sm">
            <div className="min-h-[200px] flex flex-col justify-center">
              <div className="flex gap-1 mb-6 text-red-500">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-xl md:text-3xl font-light text-neutral-300 leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                <div>
                  <h4 className="text-white font-bold text-lg uppercase tracking-wider">{testimonials[currentIndex].name}</h4>
                  <p className="text-neutral-500 text-sm uppercase tracking-widest">{testimonials[currentIndex].role}</p>
                </div>
                <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest">
                  {testimonials[currentIndex].date}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 bg-black border border-white/20 p-3 text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xl rounded-full focus:outline-none"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 bg-black border border-white/20 p-3 text-white hover:bg-red-600 hover:border-red-600 transition-all shadow-xl rounded-full focus:outline-none"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-red-600 w-8' : 'bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
