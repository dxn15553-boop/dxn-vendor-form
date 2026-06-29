import React, { useState, useMemo, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package, Check, Filter, ArrowRight, AlertCircle, X, Download, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
const Products: React.FC = () => {
   const { assets } = useAssets();
   const { content } = useContent();
   const location = useLocation();
   const navigate = useNavigate();
   const [activeCategory, setActiveCategory] = useState(() => {
      const params = new URLSearchParams(location.search);
      return params.get('category') || 'All';
   });

   const handleCategoryChange = (cat: string) => {
      setActiveCategory(cat);
      navigate(`?category=${encodeURIComponent(cat)}`, { replace: true });
      if (carouselRef.current) {
         carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
   };

   React.useEffect(() => {
      const params = new URLSearchParams(location.search);
      const cat = params.get('category');
      if (cat) setActiveCategory(cat);
   }, [location.search]);
   const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
   const [isClosing, setIsClosing] = useState(false);

   const handleCloseModal = () => {
      setIsClosing(true);
      setTimeout(() => {
         setSelectedProduct(null);
         setIsClosing(false);
      }, 600); // Matches animation duration
   };

   const carouselRef = useRef<HTMLDivElement>(null);

   const scrollLeft = () => {
      if (carouselRef.current) {
         const scrollAmount = carouselRef.current.clientWidth + 32; // Container width + gap-8 (32px)
         carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
   };

   const scrollRight = () => {
      if (carouselRef.current) {
         const scrollAmount = carouselRef.current.clientWidth + 32;
         carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
   };

   // Fallback for missing product images
   const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2000&auto=format&fit=crop";

   // Explicitly define all categories so divisions like Agro and Wetfood always appear
   const categories = useMemo(() => {
      return ['All', 'Nutraceuticals', 'Coffee', 'Cosmetics', 'Kombucha', 'Wetfood', 'Agro', 'R&D'];
   }, []);

   const filteredProducts = useMemo(() => {
      if (activeCategory === 'All') return content.products || [];
      return (content.products || []).filter(p => p.category === activeCategory);
   }, [activeCategory, content.products]);

   const handleViewSpecs = (product: any) => {
      setSelectedProduct(product);
   };

   return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300">
         {/* Cinematic Hero */}
         <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black pt-24 mb-16 md:mb-24">
            <div className="absolute inset-0 z-0">
               <img
                  src={assets.PRODUCTS_HERO}
                  alt="DXN Product Catalog"
                  className="w-full h-full object-cover opacity-40 scale-105 text-transparent"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/60"></div>
            </div>
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                  <Package className="w-3 h-3 text-red-600" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Global Catalog</span>
               </div>
               <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100">
                  Engineered for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Wellness.</span>
               </h1>
            </div>
         </section>

         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            {/* Filter System */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/5 pb-8">
               <div className="flex items-center gap-4 text-neutral-400">
                  <Filter className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-widest">Filter By Division:</span>
               </div>
               <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((cat) => (
                     <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border ${activeCategory === cat
                           ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20'
                           : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30 hover:text-white'
                           }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* Product Carousel */}
            <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
            <div className="relative group/carousel">
               {filteredProducts.length > 3 && (
                  <button
                     onClick={scrollLeft}
                     className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 bg-neutral-900 border border-white/10 p-4 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-xl items-center justify-center"
                     aria-label="Scroll left"
                  >
                     <ChevronLeft className="w-6 h-6" />
                  </button>
               )}

               <div
                  ref={carouselRef}
                  className="flex items-stretch overflow-x-auto gap-8 snap-x snap-mandatory pb-12 pt-4 scroll-smooth hide-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
               >
                  {filteredProducts.map((product, idx) => (
                     <motion.div
                        key={product.id}
                        onClick={() => handleViewSpecs(product)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.5) }}
                        whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.15)" }}
                        className="w-full md:w-[calc((100%_-_2rem)_/_2)] lg:w-[calc((100%_-_4rem)_/_3)] shrink-0 snap-start group bg-neutral-900 border-0 transition-colors transform-gpu flex flex-col h-full relative overflow-hidden cursor-pointer rounded-sm focus:outline-none focus-visible:outline-none ring-0"
                     >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-20">
                           <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${product.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
                              product.status === 'Coming Soon' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
                                 'bg-blue-950/80 border-blue-500 text-blue-400'
                              }`}>
                              {product.status}
                           </span>
                        </div>

                        {/* Image Area */}
                        <div className="h-80 relative overflow-hidden bg-black flex items-center justify-center">
                           {product.image ? (
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className={`w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700 ${product.category === 'Kombucha'
                                       ? 'object-contain scale-[0.8] group-hover:scale-90'
                                       : product.image === '/coffee/cocozhi.png' || product.image === '/coffee/lingzhi2in1.png'
                                          ? 'object-contain scale-[1.05] group-hover:scale-[1.12]'
                                          : product.image === '/coffee/lingzhi.png' || product.image === '/coffee/cordyceps.png'
                                             ? 'object-contain scale-[1.1] group-hover:scale-[1.15]'
                                             : product.image === '/coffee/hibiscus.png' || product.image === '/coffee/wedelia.png' || product.image === '/coffee/butterflyPea.png'
                                                ? 'object-contain scale-[0.8] group-hover:scale-[0.9]'
                                                : product.image === '/agro/Radist Salt.png'
                                                   ? 'object-cover scale-100 group-hover:scale-105'
                                                   : product.image === '/cosmetics/shampoo.png'
                                                      ? 'object-contain scale-[0.85] group-hover:scale-[0.9]'
                                                      : product.image?.startsWith('/') && product.image?.endsWith('.png')
                                                         ? 'object-contain scale-[1.2] group-hover:scale-[1.3]'
                                                         : 'object-cover group-hover:scale-105'
                                    }`}
                                 style={product.image === '/coffee/cordyceps.png' ? { imageRendering: '-webkit-optimize-contrast' } : undefined}
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                 <span className="text-neutral-600 font-bold uppercase tracking-widest text-xs">Image Coming Soon</span>
                              </div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10 pointer-events-none"></div>
                           <div className="absolute bottom-4 left-4 z-20">
                              <span className="inline-block px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-xl">{product.category}</span>
                           </div>
                        </div>

                        {/* Content Area */}
                        <div className="-mt-px p-8 flex-grow flex flex-col relative bg-neutral-900">
                           <div>
                              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 group-hover:text-red-500 transition-colors focus:outline-none focus-visible:outline-none">{product.name}</h3>

                              <div className="flex items-center gap-2 mb-4">
                                 <div className="flex text-red-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                       <Star key={star} className={`w-3.5 h-3.5 ${star <= 4 ? 'fill-current' : 'text-neutral-700'}`} />
                                    ))}
                                 </div>
                                 <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">(4.8)</span>
                              </div>

                              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium line-clamp-3 min-h-[4.5rem]">
                                 {product.description}
                              </p>

                              {/* Features */}
                              <div className="space-y-2 mb-8">
                                 {(product.features || []).slice(0, 3).map((feature: string, fIdx: number) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                       <Check className="w-3 h-3 text-red-600 shrink-0" />
                                       <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{feature}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <button
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleViewSpecs(product);
                              }}
                              className="mt-auto w-full py-4 bg-white text-black border border-white hover:bg-red-600 hover:border-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-xl focus:outline-none focus-visible:outline-none"
                           >
                              View Specifications <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                           </button>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {filteredProducts.length > 3 && (
                  <button
                     onClick={scrollRight}
                     className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 bg-neutral-900 border border-white/10 p-4 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-xl items-center justify-center"
                     aria-label="Scroll right"
                  >
                     <ChevronRight className="w-6 h-6" />
                  </button>
               )}
            </div>

            {filteredProducts.length === 0 && (
               <div className="py-32 text-center border border-dashed border-white/10 bg-white/5">
                  <AlertCircle className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-400 uppercase tracking-widest">No Products Found</h3>
                  <p className="text-neutral-600 text-sm mt-2">Adjust your filters or check back later.</p>
               </div>
            )}
         </div>

         {/* Quick View Modal */}
         {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-500" onClick={handleCloseModal}>
               <div
                  className={`bg-neutral-900 border border-white/10 w-full max-w-5xl shadow-2xl relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-sm [transform-style:preserve-3d] ${isClosing ? 'animate-flip-out' : 'animate-flip-in'
                     }`}
                  onClick={e => e.stopPropagation()}
               >
                  <button onClick={handleCloseModal} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white hover:bg-red-600 transition-colors rounded-full">
                     <X className="w-5 h-5" />
                  </button>

                  {/* Image Side */}
                  <div className="relative h-64 lg:h-auto bg-neutral-950 flex items-center justify-center overflow-hidden p-4">
                     {selectedProduct.image ? (
                        <img
                           src={selectedProduct.image}
                           alt={selectedProduct.name}
                           className={`opacity-90 transition-transform duration-500 ${selectedProduct.category === 'Kombucha'
                                 ? 'w-auto h-auto max-h-[300px] lg:max-h-[450px] object-contain'
                                 : selectedProduct.image === '/coffee/cocozhi.png' || selectedProduct.image === '/coffee/lingzhi2in1.png'
                                    ? 'w-full h-full object-contain scale-[1.0]'
                                    : selectedProduct.image === '/coffee/lingzhi.png' || selectedProduct.image === '/coffee/cordyceps.png'
                                       ? 'w-full h-full object-contain scale-[1.0]'
                                       : selectedProduct.image === '/coffee/hibiscus.png' || selectedProduct.image === '/coffee/wedelia.png' || selectedProduct.image === '/coffee/butterflyPea.png'
                                          ? 'w-full h-full object-contain scale-[0.85]'
                                          : selectedProduct.image === '/agro/Radist Salt.png'
                                             ? 'w-full h-full object-contain scale-[1.0]'
                                             : selectedProduct.image === '/cosmetics/shampoo.png'
                                                ? 'w-full h-full object-contain scale-[0.85]'
                                                : selectedProduct.image?.startsWith('/') && selectedProduct.image?.endsWith('.png')
                                                   ? 'w-full h-full object-contain scale-[1.2]'
                                                   : 'w-full h-full object-contain'
                              }`}
                        />
                     ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center opacity-50">
                           <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Image Coming Soon</span>
                        </div>
                     )}
                     <div className="absolute top-6 left-6 z-10">
                        <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${selectedProduct.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
                           selectedProduct.status === 'Coming Soon' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
                              'bg-blue-950/80 border-blue-500 text-blue-400'
                           }`}>
                           {selectedProduct.status}
                        </span>
                     </div>
                  </div>

                  {/* Details Side */}
                  <div className="p-6 md:p-10 flex flex-col justify-center bg-neutral-900 max-h-[90vh] overflow-y-auto">
                     <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" /> {selectedProduct.category}
                     </span>
                     <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">{selectedProduct.name}</h2>
                     <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-light border-b border-white/5 pb-6">
                        {selectedProduct.description}
                     </p>

                     <div className="space-y-3 mb-8 bg-black/20 p-5 border border-white/5 rounded-sm">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Technical Highlights</h4>
                        <ul className="space-y-2">
                           {(selectedProduct.features || []).map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-3 text-neutral-400 text-sm">
                                 <Check className="w-4 h-4 text-red-600 shrink-0" /> {feature}
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-auto">
                        <button className="py-4 bg-white text-black border border-white font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-all text-[10px] md:text-xs flex items-center justify-center gap-2">
                           Download Spec Sheet <Download className="w-4 h-4" />
                        </button>
                        <button onClick={handleCloseModal} className="py-4 bg-transparent text-white border border-white/20 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-[10px] md:text-xs">
                           Close View
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <style>{`
        @keyframes flipIn {
          0% {
            transform: perspective(1500px) rotateY(-90deg);
            opacity: 0;
          }
          100% {
            transform: perspective(1500px) rotateY(0deg);
            opacity: 1;
          }
        }
        @keyframes flipOut {
          0% {
            transform: perspective(1500px) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: perspective(1500px) rotateY(90deg);
            opacity: 0;
          }
        }
        .animate-flip-in {
          animation: flipIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-flip-out {
          animation: flipOut 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      </div>
   );
};

export default Products;
