import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Sparkles, Info, Droplet, Wind } from 'lucide-react';
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

const GanozhiShampoo: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-40 pb-12 lg:pt-40 lg:pb-32">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Personal Care Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Ganozhi</span><br />
              <span className="text-3xl sm:text-4xl text-white/50 tracking-tight">Shampoo</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-amber-500/30 transition-all duration-700">
                  {/* Soft decorative background glow */}
                  <div className="absolute -inset-20 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-amber-500/40">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Personal Care Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Ganozhi</span><br />
                        <span className="text-3xl md:text-5xl text-white/50 tracking-tight">Shampoo</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      Specially designed using Ganoderma extract with vitamin B5 (Panthenol), this refreshing shampoo makes hair smooth, healthy, soft and shiny. Suitable for all types of hair.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        230ml &amp; 8ml
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-400 backdrop-blur-md">
                        Ganoderma Extract
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-400 backdrop-blur-md">
                        Vitamin B5
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Image */}
            <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <FadeInSection delay="200ms">
                <div className="relative w-full max-w-lg aspect-[4/5] lg:aspect-square group">
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/cosmetics/shampoo.png"
                      alt="DXN Ganozhi Shampoo"
                      className="w-full h-full object-contain scale-[1.2] translate-y-20 filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.3)]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback placeholder when image is not available */}

                  </div>
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Quick Facts */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 self-start">
            <FadeInSection>
              <div className="flex-1 lg:pl-12 lg:border-l lg:border-white/[0.05]">
                {/* Visual Representation Area */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/[0.06]">
                  <video
                    src="/cosmetics/Shampoo_rinsing_hair_clean_202606221204.mp4"
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover max-h-[400px]"
                  />
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
                    <span className="text-white font-medium text-right">Viscous Liquid</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-amber-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Colour</span>
                    <span className="text-white font-medium text-right">Brown</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-amber-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Type of Product</span>
                    <span className="text-white font-medium text-right">Cosmetics</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 group/item transition-colors">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Division</span>
                    <span className="text-white font-medium text-right">Personal Care</span>
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
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-4">
                  The product containing Ganoderma extract and vitamin B5, DXN Shampoo is mild and suits all types of hair. Use it regularly for healthier, softer and shiner hair.
                </p>
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8">
                  Available in 230 ml and 8 ml viscous liquid form.
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
                    <p className="text-base font-bold text-white">Personal Care</p>
                  </div>
                </div>
              </FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-rose-500/50 pl-3">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Aqua',
                      'Cocamidopropyl Betaine',
                      'Sodium Laureth Sulfate',
                      'Cocamide DEA',
                      'Lanolin',
                      'Glycerin',
                      'Ganoderma lucidum (Mushroom) Extract',
                      'Hydroxyethyl Cellulose',
                      'Panthenol',
                      'Fragrance'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm group/item">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white block group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-rose-500/50 pl-3">
                    <Droplet className="w-4 h-4 text-amber-500" /> Directions
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-4 uppercase text-[9px] tracking-widest group-hover/item:text-amber-400 transition-colors">Directions for Use</h5>
                      <div className="space-y-4">
                        {[
                          { step: 1, label: 'Wet', desc: 'Apply to wet hair.' },
                          { step: 2, label: 'Lather', desc: 'Lather thoroughly into scalp and hair.' },
                          { step: 3, label: 'Rinse', desc: 'Rinse thoroughly with water.' }
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

                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Benefits Section */}
            <FadeInSection delay="500ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-amber-500/20 hover:bg-neutral-900/50 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-rose-500/50 pl-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Smooth & Soft', desc: 'Leaves hair silky smooth and soft to touch' },
                    { title: 'Healthy Shine', desc: 'Imparts a healthy, natural shine to your hair' },
                    { title: 'Ganoderma Powered', desc: 'Enriched with Ganoderma lucidum mushroom extract' },
                    { title: 'All Hair Types', desc: 'Suitable for all hair types – mild and gentle formula' },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-amber-500/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">{benefit.title}</p>
                        <p className="text-xs text-neutral-500">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
      <ProductReviews productName="Ganozhi Shampoo" />
    </div>
  );
};

export default GanozhiShampoo;
