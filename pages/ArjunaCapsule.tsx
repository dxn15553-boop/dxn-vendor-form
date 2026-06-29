import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Info, Leaf, Sparkles } from 'lucide-react';
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

const ArjunaCapsule: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-40 pb-12 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">
          {/* Mobile Title */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm mb-6">
              <Leaf className="w-4 h-4 text-green-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-green-400">Nutraceutical Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-lg">Arjuna</span><br />
              <span className="text-3xl sm:text-4xl text-white/50 tracking-tight">Capsule</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-green-500/30 transition-all duration-700">
                  <div className="absolute -inset-20 bg-gradient-to-br from-green-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-green-500/40">
                        <Leaf className="w-4 h-4 text-green-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-green-400">Nutraceutical Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-lg">Arjuna</span><br />
                        <span className="text-3xl md:text-5xl text-white/50 tracking-tight">Capsule</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10">
                      Arjuna (Terminalia arjuna) is used in Indian traditional medicine (Ayurveda). Arjuna bark is foremost used in cardio care and promotes healthy functioning of heart and it is also best for regulating blood pressure.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        400 mg Capsules
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-green-500/30 bg-green-500/10 rounded-full text-green-400 backdrop-blur-md">
                        Ayurveda
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Image Showcase */}
            <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <FadeInSection delay="200ms">
                <div className="relative w-full max-w-lg aspect-[4/5] lg:aspect-square group">
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/nutra/Arjuna 3d Tablets.png"
                      alt="DXN Arjuna Capsule Packaging"
                      className="w-full h-full object-contain scale-100 filter drop-shadow-[0_20px_40px_rgba(34,197,94,0.3)] contrast-[1.1] saturate-[1.05]"
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/nutra/ReishiGanoProduct.png'; }}
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
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 self-start">
            <FadeInSection>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                <div className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-4 md:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Leaf className="absolute top-[15%] left-[10%] w-4 h-4 text-green-500/20 animate-float delay-100 filter blur-[0.5px]" />
                    <Sparkles className="absolute bottom-[25%] right-[10%] w-4 h-4 text-teal-500/20 animate-float-delayed delay-300 filter blur-[1px]" />
                    <Package className="absolute top-[35%] right-[15%] w-5 h-5 text-green-500/10 animate-float delay-500" />
                  </div>

                  <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-neutral-950 flex items-center justify-center">
                    <img
                      src="/nutra/arjuna.png"
                      className="w-full h-full object-cover filter scale-[1.25] brightness-[1.1] contrast-[1.1] opacity-70"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/nutra/ReishiGanoProduct.png'; }}
                      alt="DXN Arjuna Capsule"
                    />
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-green-600/20 blur-2xl rounded-full "></div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-green-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-green-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Appearance</span>
                    <span className="text-white font-medium text-right">Capsule form</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-green-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Colour and Taste</span>
                    <span className="text-white font-medium text-right">Light pinkish brown and slightly pungent</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 group/item transition-colors">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Type of Product</span>
                    <span className="text-white font-medium text-right">AYUSH</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">Product Information</h2>
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-8">
                  It helps to strengthen and tone up heart muscle, promotes overall heart health and helps to control emaciation. Arjuna is used in Indian traditional medicine (Ayurveda). Arjuna bark is (hrudya) foremost used in cardio care and may promote healthy functioning of heart.
                </p>
              </FadeInSection>

              <FadeInSection delay="100ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] rounded-xl p-5 flex gap-6 divide-x divide-white/[0.06]">
                  <div className="flex-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Shelf Life</h4>
                    <p className="text-base font-bold text-white">36 Months</p>
                  </div>
                  <div className="flex-1 pl-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Division</h4>
                    <p className="text-base font-bold text-white">AYURVEDA</p>
                  </div>
                </div>
              </FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-orange-500/50 pl-3">
                    <Leaf className="w-4 h-4 text-green-500" /> Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Arjuna bark powder',
                      'Arjuna bark extract',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white block group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-orange-500/50 pl-3">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Directions & Storage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-4 uppercase text-[9px] tracking-widest group-hover/item:text-green-400 transition-colors">Directions for Use</h5>
                      <div className="space-y-4">
                        {[
                          { step: 1, label: 'Dosage', desc: 'Take 1-2 capsules per day or as advised by physician.' },
                          { step: 2, label: 'Consumption', desc: 'For better results consume with luke warm water.' }
                        ].map((d, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 flex items-center justify-center text-[10px] font-bold shrink-0">
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
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-green-400 transition-colors">Storage Conditions</h5>
                      <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg flex items-center gap-3">
                        <Info className="w-4 h-4 text-green-500 shrink-0" />
                        <p className="text-xs text-neutral-400 leading-normal">
                          Keep this bottle in a cool & dry place.
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
      <ProductReviews productName="DXN ARJUNA CAPSULE" />
    </div>
  );
};

export default ArjunaCapsule;
