import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Coffee, Info, AlertTriangle, Sparkles } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';

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

const Cordyceps: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-24 pb-12 lg:py-24">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title - Visible only on small screens */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-6">
              <Coffee className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Coffee Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Cordyceps</span><br />
              <span className="text-3xl sm:text-4xl text-white/50 tracking-tight">Coffee</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-amber-500/30 transition-all duration-700">
                  {/* Soft decorative background glow inside the card */}
                  <div className="absolute -inset-20 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-amber-500/40">
                        <Coffee className="w-4 h-4 text-amber-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Coffee Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Cordyceps</span><br />
                        <span className="text-3xl md:text-5xl text-white/50 tracking-tight">Coffee</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10">
                      This unique blend combines premium instant coffee mix, Cordyceps extract, and a rich, creamy non-dairy creamer. This convenient mix offers a delightful balance of taste and wellness in every cup.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        500g (20g Sachets)
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-400 backdrop-blur-md">
                        Cordyceps Coffee
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Video Showcase */}
            <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <FadeInSection delay="200ms">
                <div className="relative w-full max-w-lg aspect-[4/5] lg:aspect-square group">
                  {/* Image Container */}
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/coffee/cordyceps.png"
                      alt="DXN Cordyceps Coffee Packaging"
                      className="w-full h-full object-contain scale-[1.3] md:scale-[1.4] filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.3)] contrast-[1.1] saturate-[1.05]"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                    />
                  </div>
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Image & Quick Facts */}
          <div className="lg:col-span-5 space-y-8">
            <FadeInSection>
              {/* Outer static wrapper that is stable and sticky */}
              <div className="relative group">
                {/* Soft ambient glow behind card */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                {/* Inner stable Product Container with Glassmorphism */}
                <div
                  className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-amber-500/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Coffee className="absolute top-[15%] left-[10%] w-4 h-4 text-amber-500/20 animate-float delay-100 filter blur-[0.5px]" />
                    <Sparkles className="absolute bottom-[25%] right-[10%] w-4 h-4 text-yellow-500/20 animate-float-delayed delay-300 filter blur-[1px]" />
                    <Package className="absolute top-[35%] right-[15%] w-5 h-5 text-amber-500/10 animate-float delay-500" />
                    <Coffee className="absolute bottom-[15%] left-[20%] w-5 h-5 text-amber-600/10 animate-float-delayed delay-200 filter blur-[1.5px]" />
                    <div className="absolute bottom-[40%] left-[8%] w-3 h-3 rounded-full bg-amber-500/20 animate-float delay-700 blur-[2px]"></div>
                    <div className="absolute top-[50%] right-[8%] w-2 h-2 rounded-full bg-yellow-500/30 animate-float-delayed delay-1000 blur-[1px]"></div>
                  </div>



                  <div className="relative z-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      src="/coffee/Preparing_Cordyceps_Coffee_swirl…_202606051003.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.1]"
                    />
                  </div>

                  {/* Floor reflection effect */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-amber-600/20 blur-2xl rounded-full translate-z-[-20px]"></div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-amber-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-amber-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Appearance</span>
                    <span className="text-white font-medium text-right">Powder</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-amber-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Colour and Odour</span>
                    <span className="text-white font-medium text-right">Dark Brown and Coffee Aroma</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 group/item transition-colors">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Type of Product</span>
                    <span className="text-white font-medium text-right">FSSAI</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Allergen & Servings Dashboard */}
            <FadeInSection delay="300ms">
              <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-amber-500/25 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)] hover:-translate-y-0.5 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Allergen & Servings
                </h3>

                {/* Allergen Notification */}
                <div className="flex items-start gap-3 bg-red-950/10 border border-red-900/20 p-4 rounded-xl relative z-10 mb-6">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Allergen Information</h4>
                    <p className="text-[11px] text-neutral-400 leading-normal">Contains Milk and Soya</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/[0.06] relative z-10">
                  <div>
                    <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Serving Size</h4>
                    <p className="text-sm font-semibold text-white">1 Pack (20 gm)</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Servings Per Bag</h4>
                    <p className="text-sm font-semibold text-white">25</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">Product Information</h2>
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-8">
                  DXN Cordyceps coffee 3 in 1 is a premix coffee added with Cordyceps. This unique formulation gives you a refreshing taste and aroma of coffee. It is in a convenient sachet pack, enabling you to enjoy a cup of coffee anytime, anywhere.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="100ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-amber-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-amber-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Shelf Life</h4>
                    <p className="text-lg font-bold text-white">36 Months</p>
                  </div>
                </FadeInSection>

                <FadeInSection delay="200ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-amber-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-amber-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Division</h4>
                    <p className="text-lg font-bold text-white">Food and Beverage</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <Coffee className="w-4 h-4 text-amber-500" /> Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Sugar',
                      'Instant Coffee',
                      'Cordyceps Powder',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white block group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}

                    {/* Non-Dairy Creamer with nested sub-ingredients */}
                    <li className="border-t border-white/[0.08] pt-4 mt-2">
                      <div className="flex items-start gap-3 text-sm group/item">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Non-Dairy Creamer</span>
                          <p className="text-xs text-neutral-400 mb-2">Composed of stabilizers, emulsifiers, and lipids:</p>
                          <div className="flex flex-wrap gap-1.5 mt-2 max-w-full">
                            {[
                              'Glucose Syrup Solids', 'Vegetable Fat (palm)', 'Dipotassium Hydrogen Phosphate',
                              'Sodium Tripolyphosphate', 'Sodium Caseinate (a milk derivative)',
                              'Mono and Diglycerides of Fatty Acids', 'Diacetyl tartaric and Fatty Acid Esters of Glycerol', 'Beta Carotene'
                            ].map((sub, sIdx) => (
                              <span key={sIdx} className="text-[10px] bg-white/[0.02] border border-white/[0.06] px-2 py-0.5 rounded text-neutral-300">
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
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-500" /> Directions & Storage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-4 uppercase text-[9px] tracking-widest group-hover/item:text-amber-400 transition-colors">Directions for Use</h5>
                      <div className="space-y-4">
                        {[
                          { step: 1, label: 'Add Coffee Powder', desc: 'Pour the content of Cordyceps coffee 3 in 1 premix powder in a cup,' },
                          { step: 2, label: 'Add Hot Water', desc: 'add 150 ml hot water and' },
                          { step: 3, label: 'Stir & Serve', desc: 'stir.' }
                        ].map((d, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {d.step}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-white">{d.label}</p>
                              <p className="text-xs text-neutral-400">{d.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="group/item mt-8 pt-6 border-t border-white/[0.08]">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-amber-400 transition-colors">Storage Conditions</h5>
                      <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg flex items-center gap-3">
                        <Info className="w-4 h-4 text-amber-500 shrink-0" />
                        <p className="text-xs text-neutral-400 leading-normal">
                          Keep in a cool, dry place.
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
        @keyframes premium-zoom {
          0%, 100% { transform: scale(1) translateZ(10px); }
          50% { transform: scale(1.08) translateZ(40px); }
        }
        .animate-premium-zoom {
          animation: premium-zoom 10s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>
      <ProductReviews productName="Cordyceps" />
    </div>
  );
};

export default Cordyceps;
