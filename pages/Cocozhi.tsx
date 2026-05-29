import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Coffee, Info, AlertTriangle, Sparkles } from 'lucide-react';

// Custom Hook for Scroll Animations
const useScrollFade = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, domRef };
};

const FadeInSection: React.FC<{ children: React.ReactNode, delay?: string }> = ({ children, delay = '0ms' }) => {
  const { isVisible, domRef } = useScrollFade();
  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

const Cocozhi: React.FC = () => {
  // Interactive Product Rotation State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'video' | 'image'>('video');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-black mb-20 border-b border-white/5">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <img
            src="/cocozhi.png"
            alt="DXN Cocozhi Background"
            className="w-full h-full object-cover scale-105 filter blur-sm animate-hero-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/80"></div>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <Coffee className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Coffee Division</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100 text-white">
            DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Cocozhi</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            A delicious blend of non-dairy creamer and cocoa with Ganoderma extract. Packaged in a convenient 500g powder form containing 20 sachets.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Image & Quick Facts */}
          <div className="lg:col-span-5 space-y-8">
            <FadeInSection>
              {/* Ambient glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 to-amber-600/10 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>

              {/* Interactive 3D Product Container with Glassmorphism */}
              <div
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-red-500/30"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setMousePos({ x: 0, y: 0 });
                }}
                onMouseMove={handleMouseMove}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isHovering ? `perspective(1000px) rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg)` : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                  transition: isHovering ? 'border-color 0.5s ease' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.5s ease'
                }}
              >
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <Coffee className="absolute top-[15%] left-[10%] w-4 h-4 text-amber-500/20 animate-float delay-100 filter blur-[0.5px]" />
                  <Sparkles className="absolute bottom-[25%] right-[10%] w-4 h-4 text-yellow-500/20 animate-float-delayed delay-300 filter blur-[1px]" />
                  <Package className="absolute top-[35%] right-[15%] w-5 h-5 text-red-500/10 animate-float delay-500" />
                  <Coffee className="absolute bottom-[15%] left-[20%] w-5 h-5 text-amber-600/10 animate-float-delayed delay-200 filter blur-[1.5px]" />
                  <div className="absolute bottom-[40%] left-[8%] w-3 h-3 rounded-full bg-red-500/20 animate-float delay-700 blur-[2px]"></div>
                  <div className="absolute top-[50%] right-[8%] w-2 h-2 rounded-full bg-amber-500/30 animate-float-delayed delay-1000 blur-[1px]"></div>
                </div>

                <div className="absolute top-0 right-0 p-4 z-20 flex gap-2 translate-z-[50px]">
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-black/80 border border-white/20 text-white backdrop-blur-md rounded-full">
                    500g (20 Sachets)
                  </span>
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-red-600 to-red-800 border border-red-500 text-white backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    Cocoa & Ganoderma
                  </span>
                </div>

                <div className="relative z-10 flex justify-center items-center w-full h-[400px]"
                  style={{ transform: 'translateZ(60px)' }}>

                  {/* Video View with smooth transition */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeMedia === 'video' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <video
                      src="/cocozhi.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_20px_40px_rgba(220,38,38,0.15)] shadow-[0_0_30px_rgba(139,90,43,0.1)]"
                    />
                  </div>

                  {/* Image View with smooth transition */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${activeMedia === 'image' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <img
                      src="/cocozhi.png"
                      alt="DXN Cocozhi Packaging"
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(220,38,38,0.15)]"
                    />
                  </div>
                </div>

                {/* Media Toggle Controls */}
                <div className="absolute bottom-4 right-4 z-20 flex gap-1 bg-black/80 border border-white/10 p-1 rounded-lg backdrop-blur-md translate-z-[40px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMedia('video');
                    }}
                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${activeMedia === 'video'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-neutral-400 hover:text-white'
                      }`}
                  >
                    Video
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMedia('image');
                    }}
                    className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${activeMedia === 'image'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-neutral-400 hover:text-white'
                      }`}
                  >
                    Image
                  </button>
                </div>

                {/* Floor reflection effect */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-red-600/20 blur-2xl rounded-full translate-z-[-20px]"></div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl group hover:bg-white/10 transition-colors duration-500 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2 group-hover:text-red-400 transition-colors">
                  <Info className="w-4 h-4 text-red-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2 group/item hover:border-red-500/30 transition-colors">
                    <span className="text-neutral-500 font-medium group-hover/item:text-neutral-300 transition-colors">Appearance</span>
                    <span className="text-white text-right">Powder Form</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2 group/item hover:border-red-500/30 transition-colors">
                    <span className="text-neutral-500 font-medium group-hover/item:text-neutral-300 transition-colors">Color & Odour</span>
                    <span className="text-white text-right">Dark Brown with Cocoa Aroma</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-2 group/item hover:border-red-500/30 transition-colors">
                    <span className="text-neutral-500 font-medium group-hover/item:text-neutral-300 transition-colors">Product Type</span>
                    <span className="text-white text-right">FSSAI Compliant</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Nutritional & Allergen Information relocated to balance column heights */}
            <FadeInSection delay="300ms">
              <div className="bg-gradient-to-br from-red-950/40 to-neutral-900/40 backdrop-blur-xl border border-red-900/30 p-6 md:p-8 rounded-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.1)] transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors"></div>

                <div className="flex items-start gap-4 mb-6 border-b border-red-900/30 pb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Allergen Information</h4>
                    <p className="text-sm text-red-200/80 leading-relaxed">Contains Milk and Barley. Formulated under strict manufacturing practices to prevent contamination.</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 relative z-10">
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Serving Size</h4>
                    <p className="text-xl font-bold text-white">1 Pack (25 gm)</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Servings Per Bag</h4>
                    <p className="text-xl font-bold text-white">20 Servings</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">Product Information</h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                  DXN Cocozhi is prepared from high-grade cocoa powder with Ganoderma extract. It comes in a soluble powder form, packaged individually in convenient sachets to preserve its aroma and freshness. It is designed to be easily prepared with hot milk or water for a rich, satisfying beverage.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="100ms">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl border-l-4 border-l-red-600 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Shelf Life</h4>
                    <p className="text-xl font-bold text-white">36 Months</p>
                  </div>
                </FadeInSection>

                <FadeInSection delay="200ms">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl border-l-4 border-l-red-600 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Division</h4>
                    <p className="text-xl font-bold text-white">Food and Beverage</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors h-full shadow-lg">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-red-600" /> Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { name: 'Cocoa Powder', desc: 'Premium quality cocoa for rich chocolate flavor' },
                      { name: 'Sugar', desc: 'Slightly sweetened' },
                      { name: 'Skimmed Milk Powder', desc: 'Provides smooth texture' },
                      { name: 'Malt Extract', desc: 'Adds wholesome richness' },
                      { name: 'Vanilla', desc: 'For sweet floral aroma' },
                      { name: 'Ganoderma Extract', desc: 'Beneficial mushroom extract' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block group-hover:translate-x-1 transition-transform">{item.name}</span>
                          <span className="text-[11px] text-neutral-500">{item.desc}</span>
                        </div>
                      </li>
                    ))}

                    {/* Non-Dairy Creamer with nested sub-ingredients */}
                    <li className="border-t border-white/5 pt-4 mt-2">
                      <div className="flex items-start gap-3 text-sm group">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Non-Dairy Creamer</span>
                          <p className="text-[11px] text-neutral-500 mb-2">Composed of stabilizers, emulsifiers, and lipids:</p>
                          <div className="flex flex-wrap gap-1.5 mt-2 max-w-full">
                            {[
                              'Glucose Syrup Solids', 'Vegetable Fat (palm)', 'Dipotassium Hydrogen Phosphate',
                              'Sodium Tripolyphosphate', 'Sodium Caseinate (milk derivative)',
                              'Mono & Diglycerides of Fatty Acids', 'Diacetyl Tartaric & Fatty Acid Esters of Glycerol', 'Beta Carotene'
                            ].map((sub, sIdx) => (
                              <span key={sIdx} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-400">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors h-full shadow-lg">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-600" /> Directions & Storage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group">
                      <h5 className="font-bold text-white mb-4 uppercase text-[10px] tracking-widest group-hover:text-red-400 transition-colors">Directions for Use</h5>
                      <div className="space-y-4">
                        {[
                          { step: 1, label: 'Add Cocozhi', desc: 'Pour the contents of one sachet of Cocozhi (25g) in a cup.' },
                          { step: 2, label: 'Pour Water/Milk', desc: 'Add 150 ml of hot water or milk.' },
                          { step: 3, label: 'Stir & Serve', desc: 'Stir thoroughly and enjoy your premium cocoa drink.' }
                        ].map((d, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="w-5 h-5 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center text-[10px] font-black shrink-0">
                              {d.step}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-white">{d.label}</p>
                              <p className="text-[11px] text-neutral-400">{d.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="group mt-8 pt-6 border-t border-white/5">
                      <h5 className="font-bold text-white mb-3 uppercase text-[10px] tracking-widest group-hover:text-red-400 transition-colors">Storage Conditions</h5>
                      <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3">
                        <Info className="w-4 h-4 text-red-500 shrink-0" />
                        <p className="text-[11px] text-neutral-400 leading-normal">
                          Keep in a cool and dry place, away from direct sunlight.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>



          </div>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        @keyframes continuous-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes hero-pan {
          0%, 100% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, -1%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-continuous-spin {
          animation: continuous-spin 12s linear infinite;
          transform-style: preserve-3d;
        }
        .animate-hero-pan {
          animation: hero-pan 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Cocozhi;
