import React, { useState, useRef, useEffect } from 'react';
import { Check, ShieldCheck, Leaf, Sprout, Info, Droplet, Microscope } from 'lucide-react';
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

const Bhringaraja: React.FC = () => {
  return (
    <div className="bg-neutral-950 text-neutral-300 overflow-hidden perspective-1000 pb-16">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-950 via-black to-neutral-900 mb-10 lg:mb-20 border-b border-white/5 pt-40 pb-12 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12">

          {/* Mobile Title */}
          <div className="block lg:hidden flex flex-col items-center text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-700/30 bg-amber-700/5 backdrop-blur-sm mb-6">
              <Microscope className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">R &amp; D Division</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              DXN Pita <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 drop-shadow-lg">Bhringaraja</span><br />
              <span className="text-3xl sm:text-4xl text-white/50 tracking-tight">Oil</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left: Content Card */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <FadeInSection>
                <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-amber-700/30 transition-all duration-700">
                  <div className="absolute -inset-20 bg-gradient-to-br from-amber-700/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col items-start">
                    {/* Desktop Title */}
                    <div className="hidden lg:flex flex-col items-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-700/20 bg-amber-700/5 backdrop-blur-sm mb-8 transition-colors group-hover:border-amber-700/40">
                        <Microscope className="w-4 h-4 text-amber-600 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">R &amp; D Division</span>
                      </div>

                      <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] mb-8 text-white">
                        DXN Pita<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 drop-shadow-lg">Bhringaraja</span><br />
                        <span className="text-3xl md:text-5xl text-white/50 tracking-tight">Oil</span>
                      </h1>
                    </div>

                    <p className="text-neutral-300 max-w-xl text-lg md:text-xl font-light leading-relaxed mb-10 transition-all duration-300 hover:text-white">
                      DXN Pita Bhringaraja Oil is a premium Ayurvedic hair oil crafted with traditional herbal ingredients. Gently massage into the scalp for conditioning and nourishment — leaving hair healthy, strong and revitalised.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-white backdrop-blur-md">
                        100ml · External Use Only
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-700/30 bg-amber-700/10 rounded-full text-amber-400 backdrop-blur-md">
                        Ayurvedic Formula
                      </span>
                      <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-amber-700/30 bg-amber-700/10 rounded-full text-amber-400 backdrop-blur-md">
                        Ganoderma Enriched
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right: Product Image */}
            <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
              <FadeInSection delay="200ms">
                <div className="relative w-full max-w-lg aspect-[4/5] lg:aspect-square group">
                  <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.05]">
                    <img
                      src="/R and D/bhringaraja.png"
                      alt="DXN Pita Bhringaraja Oil"
                      className="w-full h-full object-contain rounded-[2rem] filter drop-shadow-[0_20px_60px_rgba(180,130,20,0.3)]"
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

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 self-start">
            <FadeInSection>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-700/5 to-yellow-700/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                <div className="bg-neutral-900/25 backdrop-blur-xl border border-white/[0.06] p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-amber-700/20">
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Droplet className="absolute top-[20%] left-[20%] w-3 h-3 text-amber-500/30 animate-float delay-100 filter blur-[1px]" />
                    <Leaf className="absolute bottom-[30%] right-[15%] w-4 h-4 text-yellow-600/20 animate-float-delayed delay-300 filter blur-[1px]" />
                    <Sprout className="absolute top-[40%] right-[20%] w-5 h-5 text-amber-600/20 animate-float delay-500" />
                  </div>

                  {/* Product image in card */}
                  <div className="relative z-10 w-full h-[380px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-900/20 to-neutral-900/60 flex items-center justify-center">
                    <img
                      src="/R and D/bhringaraja.png"
                      alt="DXN Pita Bhringaraja Oil"
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-amber-600/15 blur-2xl rounded-full"></div>
                </div>
              </div>
            </FadeInSection>

            {/* Physical Attributes */}
            <FadeInSection delay="200ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-white/15 hover:bg-neutral-900/50 group">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 group-hover:text-white transition-colors">
                  <Info className="w-4 h-4 text-amber-600" /> Physical Attributes
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-700/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Net Weight</span>
                    <span className="text-white font-medium">100 ml</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-700/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Form</span>
                    <span className="text-white font-medium">Oil (External Use)</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/[0.04] pb-3 hover:border-amber-700/20 transition-colors">
                    <span className="text-neutral-400 font-medium">Type</span>
                    <span className="text-white font-medium">Ayurvedic Hair Oil</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-1">
                    <span className="text-neutral-400 font-medium">Division</span>
                    <span className="text-white font-medium">R &amp; D</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Storage */}
            <FadeInSection delay="300ms">
              <div className="bg-neutral-900/30 backdrop-blur-xl border border-white/[0.06] p-6 md:p-8 rounded-2xl hover:border-amber-700/20 transition-all duration-500 relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-700/5 rounded-full blur-2xl group-hover:bg-amber-700/10 transition-colors duration-500"></div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-lime-500/50 pl-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Storage Condition
                </h3>
                <div className="space-y-3 relative z-10 text-sm text-neutral-400">
                  <p className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>Store in a cool, dry place.</p>
                  <p className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>Keep away from direct sunlight.</p>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <div className="mb-12">
              <FadeInSection>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                  Product Information
                </h2>
                <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed mb-4">
                  DXN Pita Bhringaraja Oil is an Ayurvedic hair care formulation based on traditional wisdom. The oil works as a conditioner when left on for 30 minutes before washing with a mild shampoo or as advised by a physician.
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  For external use only. Gently massage into hair ensuring the entire scalp is covered.
                </p>
              </FadeInSection>

              <FadeInSection delay="100ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] rounded-xl p-5 flex gap-6 divide-x divide-white/[0.06]">
                  <div className="flex-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Net Weight</h4>
                    <p className="text-base font-bold text-white">100 ml</p>
                  </div>
                  <div className="flex-1 pl-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Division</h4>
                    <p className="text-base font-bold text-white">R &amp; D</p>
                  </div>
                </div>
              </FadeInSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Ingredients */}
              <FadeInSection delay="300ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl hover:border-white/15 hover:bg-neutral-900/50 hover:-translate-y-0.5 transition-all duration-500 h-full">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-lime-500/50 pl-3">
                    <Leaf className="w-4 h-4 text-amber-500" /> Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Pita Bhringaraja Aerial Part',
                      'Pita Bhringaraja Hedysou',
                      'Tea Tulsi',
                      'Karpooravalli Essential Oil',
                      'Nilavrika Essential Oil',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 group/item">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>

              {/* Directions for Use */}
              <FadeInSection delay="400ms">
                <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl hover:border-white/15 hover:bg-neutral-900/50 hover:-translate-y-0.5 transition-all duration-500 h-full">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-lime-500/50 pl-3">
                    <Droplet className="w-4 h-4 text-amber-500" /> Directions for Use
                  </h3>
                  <div className="space-y-5 text-sm text-neutral-300">
                    {[
                      { step: 1, text: 'Gently massage into hair, ensuring the entire scalp is covered.' },
                      { step: 2, text: 'The oil works as a conditioner of hair — leave it for 30 minutes.' },
                      { step: 3, text: 'Before washing, use a mild shampoo or as advised by the physician.' },
                    ].map((d) => (
                      <div key={d.step} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-amber-700/20 border border-amber-700/30 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {d.step}
                        </span>
                        <p className="text-neutral-400 leading-relaxed">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Key Benefits */}
            <FadeInSection delay="500ms">
              <div className="bg-neutral-900/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-2xl hover:border-amber-700/20 hover:bg-neutral-900/50 transition-all duration-500">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 border-b border-white/[0.08] pb-4 mb-6 flex items-center gap-2.5 border-l-2 border-lime-500/50 pl-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Key Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Scalp Nourishment', desc: 'Deeply nourishes the scalp with traditional Ayurvedic herbs' },
                    { title: 'Hair Conditioning', desc: 'Works as a deep conditioner when left for 30 minutes' },
                    { title: 'Ganoderma Enriched', desc: 'Infused with Ganoderma Lucidum mushroom extract' },
                    { title: 'Traditional Formula', desc: 'Based on time-tested Ayurvedic herbal formulations' },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-amber-700/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></div>
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

      <ProductReviews productName="DXN Pita Bhringaraja Oil" />
    </div>
  );
};

export default Bhringaraja;
