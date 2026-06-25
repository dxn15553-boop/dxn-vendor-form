import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Leaf, Sprout, Info, AlertTriangle, Droplet, PlayCircle } from 'lucide-react';
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

const DBurgerPattyDough: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-40 pb-12 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm mb-6">
              <Sprout className="w-4 h-4 text-pink-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-pink-400">Food Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              D'Burger <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 drop-shadow-lg">Patty Dough</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-pink-500/30 transition-all duration-700">
                  <div className="absolute -inset-20 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-pink-500/40">
                        <Sprout className="w-4 h-4 text-pink-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-pink-400">Food Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        D'Burger <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 drop-shadow-lg">Patty Dough</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      Vegetable Dough is made for cooked, boiled or reheated vegetables. Sandwich a veggie patty between two sandwich halves, then top with lettuce, mayonnaise, raw onion slices, and any additional topping you choose.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        Thermally Sterilized
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-pink-500/30 bg-pink-500/10 rounded-full text-pink-400 backdrop-blur-md">
                        Plant Based
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
                      src="/agro/Dburger.jpg copy.png"
                      alt="D'Burger Patty Dough"
                      className="w-full h-full object-contain rounded-[2rem] filter drop-shadow-[0_20px_40px_rgba(236,72,153,0.25)]"
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
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/5 to-rose-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                <div className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-pink-500/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Droplet className="absolute top-[20%] left-[20%] w-3 h-3 text-pink-400/30 animate-float delay-100 filter blur-[1px]" />
                    <Droplet className="absolute bottom-[30%] right-[15%] w-4 h-4 text-pink-400/20 animate-float-delayed delay-300 filter blur-[1.5px]" />
                    <Sprout className="absolute top-[40%] right-[20%] w-5 h-5 text-pink-500/20 animate-float delay-500" />
                    <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-pink-500/40 animate-float-delayed delay-700 blur-[2px]"></div>
                  </div>

                  {/* Product Video Placeholder */}
                  <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex flex-col items-center justify-center border border-white/5">
                    <PlayCircle className="w-16 h-16 text-white/10 mb-4" />
                    <span className="text-white/30 text-xs font-bold tracking-widest uppercase">Video Coming Soon</span>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-pink-600/20 blur-2xl rounded-full"></div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-pink-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-pink-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Physical appearance</span>
                    <span className="text-white font-medium text-right max-w-[55%] leading-snug">Square shape</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-pink-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Colour</span>
                    <span className="text-white font-medium">Reddish Pink colour</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-pink-500/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Type of product</span>
                    <span className="text-white font-medium">FSSAI</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 transition-colors">
                    <span className="text-neutral-400 font-medium">Division</span>
                    <span className="text-white font-medium">Food</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Allergen & Servings */}
            <FadeInSection delay="300ms">
              <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-pink-500/25 hover:shadow-[0_20px_50px_rgba(236,72,153,0.06)] hover:-translate-y-0.5 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-600/5 rounded-full blur-2xl group-hover:bg-pink-600/10 transition-colors duration-500"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-pink-500" /> Additional Details
                </h3>

                <div className="flex items-start gap-3 bg-neutral-900/50 border border-white/10 p-4 rounded-xl relative z-10 mb-6">
                  <AlertTriangle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Description</h4>
                    <p className="text-[11px] text-neutral-400">Thermally Sterilized Dough</p>
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
                  Vegetable Dough is made for cooked, boiled or reheated vegetables. Sandwich a veggie patty between two sandwich halves then top with lettuce, mayonnaise, raw onion, slices and any additional topping you choose.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <FadeInSection delay="100ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-pink-600 p-6 rounded-xl transition-all duration-500 hover:border-l-pink-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Shelf Life</h4>
                    <p className="text-lg font-bold text-white">12 Months</p>
                  </div>
                </FadeInSection>
                <FadeInSection delay="200ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-pink-600 p-6 rounded-xl transition-all duration-500 hover:border-l-pink-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Division</h4>
                    <p className="text-lg font-bold text-white">Food</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Ingredients */}
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <Leaf className="w-4 h-4 text-pink-500" /> Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'EO Mushroom',
                      'Beetroot',
                      'Black Beans',
                      'Corn',
                      'Red Onion',
                      'Green Capsicum',
                      'Garlic',
                      'Salt',
                      'Oats',
                      'Cumin powder',
                      'Paprika powder',
                      'Black pepper powder',
                      'Cajun seasoning'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 group/item">
                        <Check className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                        <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              {/* Directions & Storage */}
              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-pink-500" /> Preparation
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-pink-400 transition-colors">Direction for use</h5>
                      <ol className="list-decimal pl-4 space-y-2 marker:text-pink-500 text-xs leading-relaxed">
                        <li>Open the packet and make the dough into balls.</li>
                        <li>Compress the balls into patties.</li>
                        <li>Preheat the grill pan and grill it for 5-6 mins on each side for medium, and 8-9 mins on each side for well-done.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Key Benefits */}
            <FadeInSection delay="500ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-pink-500/20 hover:bg-neutral-900/50 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-pink-500" /> Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Plant-Based', desc: 'Made from mushrooms, beans, and fresh vegetables' },
                    { title: 'Customizable', desc: 'Shape into balls or compress into burger patties' },
                    { title: 'Rich Flavor', desc: 'Seasoned with Cajun, cumin, and paprika' },
                    { title: 'Easy to Cook', desc: 'Ready to grill in minutes' },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-pink-500/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-pink-500 mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wide mb-1" dangerouslySetInnerHTML={{ __html: benefit.title }} />
                        <p className="text-xs text-neutral-500" dangerouslySetInnerHTML={{ __html: benefit.desc }} />
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
      <ProductReviews productName="D'Burger Patty Dough" />
    </div>
  );
};

export default DBurgerPattyDough;
