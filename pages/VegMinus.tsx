import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Package, Check, ShieldCheck, Leaf, Sprout, Info, AlertTriangle, Droplet } from 'lucide-react';

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
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000">



      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-black mb-20 border-b border-white/5">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <img
            src="/veg_minus.jpeg"
            alt="DXN Veg Mayonnaise Background"
            className="w-full h-full object-cover scale-105 filter blur-sm animate-hero-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/80"></div>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <Sprout className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Agro Division</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100 text-white">
            DXN Veg <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Mayonnaise</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            A creamy, eggless spread crafted for sandwiches, salads, and dips. Packaged in a convenient 500g format.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Image & Quick Facts */}
          <div className="lg:col-span-5 space-y-8">
            <FadeInSection>
              {/* Outer static wrapper that is stable and sticky */}
              <div className="relative group">
                {/* Inner stable Product Container with Glassmorphism */}
                <div
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden transition-colors duration-500 group-hover:border-red-500/30"
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Droplet className="absolute top-[20%] left-[20%] w-3 h-3 text-white/30 animate-float delay-100 filter blur-[1px]" />
                    <Droplet className="absolute bottom-[30%] right-[15%] w-4 h-4 text-white/20 animate-float-delayed delay-300 filter blur-[1.5px]" />
                    <Sprout className="absolute top-[40%] right-[20%] w-5 h-5 text-green-500/20 animate-float delay-500" />
                    <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-red-500/40 animate-float-delayed delay-700 blur-[2px]"></div>
                  </div>

                  <div className="absolute top-0 right-0 p-4 z-20 flex gap-2 translate-z-[50px]">
                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-black/80 border border-white/20 text-white backdrop-blur-md rounded-full">
                      500g
                    </span>
                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-red-600 to-red-800 border border-red-500 text-white backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                      Eggless
                    </span>
                  </div>

                  <div className="relative z-10 flex justify-center items-center w-full h-[400px] animate-premium-zoom">
                    <img
                      src="/veg_minus.jpeg"
                      alt="DXN Veg Mayonnaise"
                      className="w-full h-full object-contain filter drop-shadow-[0_30px_50px_rgba(220,38,38,0.2)]"
                    />
                  </div>

                  {/* Floor reflection effect */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-red-600/20 blur-2xl rounded-full translate-z-[-20px]"></div>
                </div>
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
                    <span className="text-white text-right">Smooth & thick consistency</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2 group/item hover:border-red-500/30 transition-colors">
                    <span className="text-neutral-500 font-medium group-hover/item:text-neutral-300 transition-colors">Color</span>
                    <span className="text-white text-right">Clear whitish</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-2 group/item hover:border-red-500/30 transition-colors">
                    <span className="text-neutral-500 font-medium group-hover/item:text-neutral-300 transition-colors">Category</span>
                    <span className="text-white text-right">Seasonings & Condiments</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="lg:col-span-7">

            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">Product Information</h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                  DXN Veg Mayonnaise is manufactured under strict quality standards to ensure premium taste and texture. Our eggless formula provides a versatile, creamy base suitable for various culinary applications, maintaining consistency and flavor profile throughout its shelf life.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeInSection delay="100ms">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl border-l-4 border-l-red-600 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Shelf Life</h4>
                    <p className="text-xl font-bold text-white">12 Months</p>
                  </div>
                </FadeInSection>

                <FadeInSection delay="200ms">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl border-l-4 border-l-red-600 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] transition-all duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">FSSAI Status</h4>
                    <p className="text-xl font-bold text-white">Compliant</p>
                  </div>
                </FadeInSection>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <FadeInSection delay="300ms">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors h-full shadow-lg">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-red-600" /> Ingredients list
                  </h3>
                  <ul className="space-y-4">
                    {['Soya bean oil', 'RO Water', 'Sugar', 'Vinegar', 'Non-Dairy Creamer', 'Xanthan gum', 'Salt', 'Citric acid'].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 group">
                        <Check className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5 group-hover:text-red-500 transition-colors" />
                        <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              <FadeInSection delay="400ms">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors h-full shadow-lg">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-600" /> Storage & Usage
                  </h3>
                  <div className="space-y-6 text-sm text-neutral-300">
                    <div className="group">
                      <h5 className="font-bold text-white mb-3 uppercase text-[10px] tracking-widest group-hover:text-red-400 transition-colors">Directions</h5>
                      <ol className="list-decimal pl-4 space-y-2 marker:text-red-600">
                        <li>Remove the cap, pour desired amount on dish.</li>
                        <li>Store properly after use and keep in fridge.</li>
                      </ol>
                    </div>
                    <div className="group">
                      <h5 className="font-bold text-white mb-3 uppercase text-[10px] tracking-widest group-hover:text-red-400 transition-colors mt-6">Storage Conditions</h5>
                      <p className="leading-relaxed">Store in a cool and dry hygienic place. Once opened, keep refrigerated and consume within 2 months or before expiry.</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Nutritional & Allergen */}
            <FadeInSection delay="500ms">
              <div className="bg-gradient-to-br from-red-950/40 to-neutral-900/40 backdrop-blur-xl border border-red-900/30 p-6 md:p-8 rounded-2xl hover:shadow-[0_0_40px_rgba(220,38,38,0.1)] transition-shadow duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-colors"></div>

                <div className="flex items-start gap-4 mb-6 border-b border-red-900/30 pb-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Allergen Information</h4>
                    <p className="text-sm text-red-200/80 leading-relaxed">Contains Soya. Formulated in a facility that adheres to stringent cross-contamination protocols.</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 relative z-10">
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Serving Size</h4>
                    <p className="text-xl font-bold text-white">20g</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Servings Per Pack</h4>
                    <p className="text-xl font-bold text-white">Approx. 25</p>
                  </div>
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
    </div>
  );
};

export default VegMinus;
