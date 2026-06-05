import React, { useState, useMemo, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../App';
import { useContent } from '../context/ContentContext';
import { useLocation } from 'react-router-dom';
import { Package, Check, Filter, ArrowRight, AlertCircle, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const Products: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('category') || 'All';
  });

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
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Fallback for missing product images
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2000&auto=format&fit=crop";

  // Explicitly define all categories so divisions like Agro and Wetfood always appear
  const categories = useMemo(() => {
    return ['All', 'Nutraceuticals', 'Coffee', 'Cosmetics', 'Kombucha', 'Wetfood', 'Agro'];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return content.products || [];
    return (content.products || []).filter(p => p.category === activeCategory);
  }, [activeCategory, content.products]);

  const handleViewSpecs = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black mb-20">
         <div className="absolute inset-0 z-0">
           <img 
             src={assets.PRODUCTS_HERO} 
             alt="DXN Product Catalog" 
             className="w-full h-full object-cover opacity-40 scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/60"></div>
         </div>
         <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
               <Package className="w-3 h-3 text-red-600" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Global Catalog</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100">
               Engineered for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Wellness.</span>
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
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border ${
                       activeCategory === cat 
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
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 bg-neutral-900 border border-white/10 p-4 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-xl"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div 
            ref={carouselRef}
            className="flex items-stretch overflow-x-auto gap-8 snap-x snap-mandatory pb-12 pt-4 -mx-4 px-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
           {filteredProducts.map((product, idx) => (
              <div 
                key={product.id} 
                onClick={() => handleViewSpecs(product)}
                className="w-[85vw] sm:w-[400px] shrink-0 snap-start group bg-neutral-900 border border-white/5 hover:border-red-600/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden cursor-pointer rounded-sm hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)]"
              >
                 {/* Status Badge */}
                 <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${
                       product.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
                       product.status === 'Coming Soon' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
                       'bg-blue-950/80 border-blue-500 text-blue-400'
                    }`}>
                       {product.status}
                    </span>
                 </div>

                 {/* Image Area */}
                 <div className="h-64 relative overflow-hidden bg-black flex items-center justify-center">
                    <img 
                       src={product.image || FALLBACK_IMAGE} 
                       alt={product.name} 
                       className={`w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700 ${
                         product.image?.startsWith('/coffee/') && product.image?.endsWith('.png') 
                           ? 'object-contain scale-[1.85] group-hover:scale-[1.95]' 
                           : product.image?.startsWith('/') && product.image?.endsWith('.png')
                             ? 'object-contain scale-[1.2] group-hover:scale-[1.3]'
                             : 'object-cover group-hover:scale-105'
                       }`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4">
                       <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em]">{product.category}</span>
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="p-8 flex-grow flex flex-col relative bg-neutral-900 group-hover:bg-neutral-900/80 transition-colors">
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-red-500 transition-colors">{product.name}</h3>
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
                       className="mt-auto w-full py-4 bg-white text-black border border-white hover:bg-red-600 hover:border-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-xl"
                    >
                       View Specifications <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                    </button>
                 </div>
              </div>
           ))}
          </div>

          {filteredProducts.length > 3 && (
            <button 
              onClick={scrollRight} 
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-30 bg-neutral-900 border border-white/10 p-4 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-red-600 hover:scale-110 shadow-xl"
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
              className={`bg-neutral-900 border border-white/10 w-full max-w-5xl shadow-2xl relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-sm [transform-style:preserve-3d] ${
                isClosing ? 'animate-flip-out' : 'animate-flip-in'
              }`} 
              onClick={e => e.stopPropagation()}
            >
               <button onClick={handleCloseModal} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white hover:bg-red-600 transition-colors rounded-full">
                  <X className="w-5 h-5" />
               </button>
               
               {/* Image Side */}
               <div className="relative h-64 lg:h-auto bg-neutral-950 flex items-center justify-center overflow-hidden p-4">
                   <img 
                      src={selectedProduct.image || FALLBACK_IMAGE} 
                      alt={selectedProduct.name} 
                      className={`w-full h-full opacity-90 transition-transform duration-500 ${
                        selectedProduct.image?.startsWith('/coffee/') && selectedProduct.image?.endsWith('.png') 
                          ? 'object-contain scale-[1.6]' 
                          : selectedProduct.image?.startsWith('/') && selectedProduct.image?.endsWith('.png')
                            ? 'object-contain scale-[1.2]'
                            : 'object-contain'
                      }`} 
                   />
                   <div className="absolute top-6 left-6 z-10">
                      <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${
                         selectedProduct.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
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
