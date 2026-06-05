import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Sparkles, Info, Droplet } from 'lucide-react';

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

const GanozhiSoap: React.FC = () => {
  return (
    <div className="pt-32 bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-24 pb-12 lg:py-24">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title - Visible only on small screens */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-400">Skin Care Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 drop-shadow-lg">Ganozhi</span><br />
              <span className="text-3xl sm:text-4xl text-white/50 tracking-tight">Soap</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-rose-500/30 transition-all duration-700">
                  {/* Soft decorative background glow inside the card */}
                  <div className="absolute -inset-20 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-rose-500/40">
                        <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-400">Skin Care Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 drop-shadow-lg">Ganozhi</span><br />
                        <span className="text-3xl md:text-5xl text-white/50 tracking-tight">Soap</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      75 g round-shaped soap stamped with DXN logo on both sides.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        75g Bar
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-rose-500/30 bg-rose-500/10 rounded-full text-rose-400 backdrop-blur-md">
                        Ganoderma Extract
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
                  {/* Image Container */}
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/cosmetics/cosmetics.png"
                      alt="DXN Ganozhi Soap"
                      className="w-full h-full object-contain scale-[1.2] filter drop-shadow-[0_20px_40px_rgba(244,63,94,0.3)]"
                    />
                  </div>
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section >

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Details & Specs */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">Product Information</h2>
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-8">
                  75 g round-shaped soap stamped with DXN logo on both sides. A carefully formulated toiletry product designed for personal care, enriched with Ganoderma lucidum extract.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="100ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-rose-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-rose-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Shelf Life</h4>
                    <p className="text-lg font-bold text-white">36 Months</p>
                  </div>
                </FadeInSection>

                <FadeInSection delay="200ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-rose-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-rose-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Division</h4>
                    <p className="text-lg font-bold text-white">Skin Care</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-rose-500" /> Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { name: 'Sodium Palmate', desc: 'Soap Base' },
                      { name: 'Ganoderma lucidum Extract', desc: 'Mushroom Extract' },
                      { name: 'Glycerin', desc: 'Glycerin' },
                      { name: 'Fragrance', desc: 'Fragrance' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block group-hover/item:translate-x-1 transition-transform">{item.name}</span>
                          <span className="text-xs text-neutral-400">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <Droplet className="w-4 h-4 text-rose-500" /> Directions
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-4 uppercase text-[9px] tracking-widest group-hover/item:text-rose-400 transition-colors">Directions for Use</h5>
                      <div className="space-y-4">
                        {[
                          { step: 1, label: 'Lather', desc: 'Lather the soap.' },
                          { step: 2, label: 'Apply', desc: 'Apply to the desired body part.' },
                          { step: 3, label: 'Rinse', desc: 'Rinse off.' }
                        ].map((d, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center text-[10px] font-bold shrink-0">
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

                  </div>
                </div>
              </FadeInSection>
            </div>

          </div>

          {/* Right Column: Physical Attributes & Image */}
          <div className="lg:col-span-5 space-y-8">
            <FadeInSection>
              {/* Outer static wrapper that is stable and sticky */}
              <div className="relative group">
                {/* Soft ambient glow behind card */}
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/5 to-pink-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                {/* Inner stable Product Container with Glassmorphism */}
                <div
                  className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-rose-500/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Sparkles className="absolute top-[15%] left-[10%] w-4 h-4 text-rose-500/20 animate-float delay-100 filter blur-[0.5px]" />
                    <Droplet className="absolute bottom-[25%] right-[10%] w-4 h-4 text-pink-500/20 animate-float-delayed delay-300 filter blur-[1px]" />
                    <Package className="absolute top-[35%] right-[15%] w-5 h-5 text-rose-500/10 animate-float delay-500" />
                    <Sparkles className="absolute bottom-[15%] left-[20%] w-5 h-5 text-rose-600/10 animate-float-delayed delay-200 filter blur-[1.5px]" />
                    <div className="absolute bottom-[40%] left-[8%] w-3 h-3 rounded-full bg-rose-500/20 animate-float delay-700 blur-[2px]"></div>
                    <div className="absolute top-[50%] right-[8%] w-2 h-2 rounded-full bg-pink-500/30 animate-float-delayed delay-1000 blur-[1px]"></div>
                  </div>

                  <div className="relative z-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-neutral-800 flex items-center justify-center p-8">
                    <img
                      src="/cosmetics/cosmetics.png"
                      alt="Ganozhi Soap"
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  {/* Floor reflection effect */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-rose-600/20 blur-2xl rounded-full translate-z-[-20px]"></div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-rose-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-rose-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Appearance</span>
                    <span className="text-white font-medium text-right">Solid</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-rose-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Color</span>
                    <span className="text-white font-medium text-right">Brown</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 group/item transition-colors">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Product Type</span>
                    <span className="text-white font-medium text-right">Toiletry</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
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
      `}</style>
    </div >
  );
};

export default GanozhiSoap;
