import React, { useState, useRef, useEffect } from 'react';
import { Package, Check, ShieldCheck, Leaf, Sprout, Info, AlertTriangle, Droplet } from 'lucide-react';
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

const VegMinus: React.FC = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm mb-6">
              <Sprout className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Agro Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white flex flex-wrap justify-center gap-x-4">
              DXN VEG <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-lg">Mayonnaise</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column: Content */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-700">
                  {/* Soft decorative background glow inside the card */}
                  <div className="absolute -inset-20 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-emerald-500/40">
                        <Sprout className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Agro Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white flex flex-wrap gap-x-4">
                        DXN VEG <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-lg">Mayonnaise</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      DXN Veg Mayonnaise recipe is an amazing substitute for traditional mayo. It is thick and creamy, perfect for sandwiches, salads, or a dip. This Eggless Mayonnaise is creamy, smooth, and perfect to spread over sandwiches and salads.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        500g Pack
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/10 rounded-full text-emerald-400 backdrop-blur-md">
                        100% Eggless
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
                      src="/agro/veg_minus.png"
                      alt="DXN Veg Mayonnaise Product"
                      className="w-full h-full object-contain rounded-[2rem] filter drop-shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
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
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                {/* Inner stable Product Container with Glassmorphism */}
                <div
                  className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Droplet className="absolute top-[20%] left-[20%] w-3 h-3 text-white/30 animate-float delay-100 filter blur-[1px]" />
                    <Droplet className="absolute bottom-[30%] right-[15%] w-4 h-4 text-white/20 animate-float-delayed delay-300 filter blur-[1.5px]" />
                    <Sprout className="absolute top-[40%] right-[20%] w-5 h-5 text-green-500/20 animate-float delay-500" />
                    <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-emerald-500/40 animate-float-delayed delay-700 blur-[2px]"></div>
                  </div>



                  {/* Image Container */}

                  <div className="relative z-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      src="/agro/veg_mayyonnoiseVedio.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.1]"
                    />
                  </div>

                  {/* Floor reflection effect */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-emerald-600/20 blur-2xl rounded-full translate-z-[-20px]"></div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 transition-colors group-hover:text-white">
                  <Info className="w-4 h-4 text-emerald-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 group/item transition-colors hover:border-emerald-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Appearance</span>
                    <span className="text-white font-medium text-right">Smooth and thick consistency with clear whitish color.</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1 group/item transition-colors hover:border-emerald-500/20">
                    <span className="text-neutral-400 font-medium transition-colors group-hover/item:text-neutral-200">Color</span>
                    <span className="text-white font-medium text-right">Clear white Color.</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Allergen & Servings Dashboard */}
            <FadeInSection delay="300ms">
              <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-emerald-500/25 hover:shadow-[0_20px_50px_rgba(16,185,129,0.06)] hover:-translate-y-0.5 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/10 transition-colors duration-500"></div>

                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Allergen & Servings
                </h3>

                {/* Allergen Notification */}
                <div className="flex items-start gap-3 bg-red-950/10 border border-red-900/20 p-4 rounded-xl relative z-10 mb-6">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Allergen Information</h4>
                    <p className="text-[11px] text-neutral-400 leading-normal">Contains Soya</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/[0.06] relative z-10">
                  <div>
                    <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Serving Size</h4>
                    <p className="text-sm font-semibold text-white">20g</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Servings Per Pack</h4>
                    <p className="text-sm font-semibold text-white">About 25</p>
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
                  DXN Veg Mayonnaise is a rich and creamy plant-based spread made with high-quality ingredients like soybean oil, RO water, vinegar, salt, and non-dairy creamer. Enhanced with xanthan gum for smooth texture and citric acid for a tangy taste, it's perfect for sandwiches, salads, and dips. Enjoy a delicious, egg-free alternative with a balance of flavor and quality in every spoonful.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="100ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-emerald-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-emerald-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">Shelf Life</h4>
                    <p className="text-lg font-bold text-white">12 Months</p>
                  </div>
                </FadeInSection>

                <FadeInSection delay="200ms">
                  <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] border-l-[3px] border-l-emerald-600 p-6 rounded-xl transition-all duration-500 hover:border-white/15 hover:border-l-emerald-500 hover:bg-neutral-900/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5">FSSAI Category</h4>
                    <p className="text-lg font-bold text-white">Seasonings & Condiments</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <Leaf className="w-4 h-4 text-emerald-500" /> Ingredients list
                  </h3>
                  <ul className="space-y-4">
                    {['Soya bean oil', 'RO Water', 'Sugar', 'Vinegar', 'Non-Dairy Creamer', 'Xanthan gum', 'Salt', 'Citric acid'].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 group/item">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 h-full group">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Storage & Usage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group/item">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-emerald-400 transition-colors">Directions for Use</h5>
                      <ol className="list-decimal pl-4 space-y-2 marker:text-emerald-500">
                        <li>Remove the cap, pour desired amount of DXN Veg Mayonnaise on the dish.</li>
                        <li>After using, store the bag appropriately to prevent air exposure and keep in fridge for freshness.</li>
                      </ol>
                    </div>
                    <div className="group/item mt-6 pt-6 border-t border-white/[0.08]">
                      <h5 className="font-bold text-white mb-3 uppercase text-[9px] tracking-widest group-hover/item:text-emerald-400 transition-colors">Storage Conditions</h5>
                      <p className="leading-relaxed">Do not use if the product is bloated/ leakage/ damage. Store in a cool and dry hygienic place. Once opened, keep in refrigerator and consume within 2 months or best before date whichever is earlier.</p>
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
      <ProductReviews productName="Veg-Minus" />
    </div>
  );
};

export default VegMinus;
