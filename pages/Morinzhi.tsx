import React, { useState, useRef, useEffect } from 'react';
import { Check, ShieldCheck, Sparkles, Info, Droplet, AlertTriangle, Leaf } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';

// Custom Hook for Scroll Animations
const useScrollFade = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, domRef };
};

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay = '0ms' }) => {
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

const Morinzhi: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-40 pb-12 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Food and Beverage</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Morinzhi</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-amber-500/30 transition-all duration-700">
                  <div className="absolute -inset-20 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-amber-500/40">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Food and Beverage</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 drop-shadow-lg">Morinzhi</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      Morinzhi is a health drink made from Noni fruit. It is prepared using a natural process and is commonly consumed daily to support overall health and wellness.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        600 ml bottle
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-400 backdrop-blur-md">
                        AYUSH
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Column: Image */}
            <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <FadeInSection delay="200ms">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[400px] md:h-[500px] lg:h-auto lg:aspect-square group mx-auto">
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/kombucha/Morinzhi Bottle 600ml.png"
                      alt="DXN Morinzhi"
                      className="w-full h-full object-contain scale-[0.85] md:scale-90 filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.3)]"
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

          {/* Left Column: Quick Facts */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 self-start">

            <FadeInSection>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                <div className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-amber-500/20">
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Droplet className="absolute top-[20%] left-[20%] w-3 h-3 text-amber-400/30 animate-float delay-100 filter blur-[1px]" />
                    <Droplet className="absolute bottom-[30%] right-[15%] w-4 h-4 text-amber-400/20 animate-float-delayed delay-300 filter blur-[1.5px]" />
                    <Leaf className="absolute top-[40%] right-[20%] w-5 h-5 text-amber-500/20 animate-float delay-500" />
                    <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-amber-500/40 animate-float-delayed delay-700 blur-[2px]"></div>
                  </div>

                  {/* Product Image */}
                  <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 flex items-center justify-center">
                    <img
                      src="/kombucha/Morinzhi Bottle 600ml.png"
                      alt="DXN Morinzhi bottle"
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-amber-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Physical Appearance</span>
                    <span className="text-white font-medium text-right max-w-[55%] leading-snug">Slightly turbid liquid with high viscosity</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Colour</span>
                    <span className="text-white font-medium">Dark brown</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Type of Product</span>
                    <span className="text-white font-medium">AYUSH</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 transition-colors">
                    <span className="text-neutral-400 font-medium">Pack Size</span>
                    <span className="text-white font-medium">600 ml</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Serving Info */}
            <FadeInSection delay="300ms">
              <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-amber-500/25 hover:shadow-[0_20px_50px_rgba(245,158,11,0.06)] hover:-translate-y-0.5 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-600/5 rounded-full blur-2xl group-hover:bg-amber-600/10 transition-colors duration-500"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-purple-500/50 pl-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Serving Size
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start gap-3 bg-neutral-900/50 border border-white/10 p-4 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Adults</h4>
                      <p className="text-[11px] text-neutral-400">30 ml juice with 60 ml warm water — once a day</p>
                      <p className="text-[11px] text-neutral-500 mt-1">Per bottle: ~20 serves</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-neutral-900/50 border border-white/10 p-4 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Children</h4>
                      <p className="text-[11px] text-neutral-400">15 ml juice with 30 ml warm water — once a day</p>
                      <p className="text-[11px] text-neutral-500 mt-1">Per bottle: ~40 serves</p>
                    </div>
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
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-4">
                  Morinzhi is a health drink made from Noni fruit. It is prepared using a Natural process and is commonly consumed daily to support overall health and wellness.
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  <strong className="text-white">Label Claim:</strong> Morinda citrifolia has been used among various tropical folks to promote health since time immemorial. Morinzhi is specially formulated by Morinda citrifolia and hibiscus sabdariffa powder with no added preservatives and colours.
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  <strong className="text-white">Allergen Information:</strong> NA
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <FadeInSection delay="100ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-amber-600 p-6 rounded-xl transition-all duration-500 hover:border-l-amber-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Shelf Life</h4>
                    <p className="text-lg font-bold text-white">36 Months</p>
                  </div>
                </FadeInSection>
                <FadeInSection delay="200ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-amber-600 p-6 rounded-xl transition-all duration-500 hover:border-l-amber-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Description</h4>
                    <p className="text-base font-bold text-white leading-snug">Each bottle contains 600 ml of Morinzhi</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Ingredients */}
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-purple-500/50 pl-3">
                    <Leaf className="w-4 h-4 text-amber-500" /> Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'RO Water',
                      'Sugar',
                      'Noni powder',
                      'Roselle powder'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 group/item">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              {/* Directions & Storage */}
              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-purple-500/50 pl-3">
                    <ShieldCheck className="w-4 h-4 text-amber-500" /> Directions & Storage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-amber-400 transition-colors">Direction for Use</h5>
                      <div className="space-y-3">
                        {[
                          'Adults: 30 ml (Add 60 ml warm water) once a day',
                          'Children: 15 ml (Add 30 ml warm water) once a day'
                        ].map((desc, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-xs text-neutral-400">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="group/item pt-4 border-t border-white/[0.08]">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-amber-400 transition-colors">Storage Condition</h5>
                      <div className="bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg flex items-center gap-3">
                        <Info className="w-4 h-4 text-amber-500 shrink-0" />
                        <p className="text-xs text-neutral-400 leading-normal">
                          Store in a cool dry hygienic place.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Key Benefits */}
            <FadeInSection delay="500ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-amber-500/20 hover:bg-neutral-900/50 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-purple-500/50 pl-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Natural Process', desc: 'Prepared using traditional natural methods from Noni fruit' },
                    { title: 'No Preservatives', desc: 'Formulated with no added preservatives or colours' },
                    { title: 'Daily Wellness', desc: 'Consumed daily to support overall health and wellness' },
                    { title: 'AYUSH Certified', desc: 'Certified under AYUSH standards' },
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

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }
      `}</style>
      <ProductReviews productName="DXN Morinzhi" />
    </div>
  );
};

export default Morinzhi;
