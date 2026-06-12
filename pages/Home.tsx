
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Factory, ShieldCheck, Globe, Zap, Leaf, Sprout, TrendingUp, Users, Award, Heart } from 'lucide-react';
import { ICON_MAP } from '../constants';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState(0);
  const { content, loading } = useContent();

  // Auto-scroll through divisions preview
  useEffect(() => {
    if (content.divisions.length > 0) {
      const timer = setInterval(() => {
        setActiveDivision((prev) => (prev + 1) % content.divisions.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [content.divisions]);

  if (loading) return null;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-24 pb-12 lg:pb-56">
        <div className="absolute inset-0 z-0">
          <img 
            src={content.assets.HERO_BG} 
            alt="DXN Siddipet Campus" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-pan-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 text-center mt-8 md:mt-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
             <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Flagship Manufacturing Hub • India</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 animate-in fade-in zoom-in duration-1000 delay-150">
             {content.hero.headline.split(' ').map((word, i) => (
               <React.Fragment key={i}>
                 {i === 1 ? <><br className="block" /><span className="text-red-600 italic font-display lowercase tracking-normal mr-3 sm:mr-4 align-baseline relative -top-1 sm:top-0 md:top-1">the</span> </> : word + ' '}
               </React.Fragment>
             ))}
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-2xl text-neutral-300 font-light mb-8 md:mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 px-4">
            {content.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 px-6">
             <Link to="/divisions" className="bg-red-600 text-white px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
               {content.hero.primaryCta} <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
             </Link>
             <Link to="/quality" className="bg-transparent border border-white/30 text-white px-8 py-4 md:px-10 md:py-5 font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
               {content.hero.secondaryCta} <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
             </Link>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-8 left-0 w-full hidden lg:block z-20">
          <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-8">
            {content.stats.map((stat, idx) => (
              <div key={stat.id} className="border-l border-white/20 pl-8 group animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${700 + (idx * 100)}ms` }}>
                <span className="text-4xl font-bold block mb-1 group-hover:text-red-500 transition-colors">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{stat.label} {stat.suffix}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State-of-the-art Highlights */}
      <section className="bg-white text-neutral-900 py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <SectionTitle subtitle="Excellence in Scale" title="A State-of-the-Art Hub" />
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
                Spread across 47 acres in the Siddipet Industrial Park, our integrated manufacturing campus represents the pinnacle of DXN's global production capability. 
                With 53,700 sq. m of built-up area, we house six independent manufacturing operations designed for global export quality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Sprout, title: "Vertical Agronomy", desc: "Precision cultivation of Ganoderma & Saffron." },
                  { icon: Factory, title: "Industry 4.0 Core", desc: "AI-driven automated manufacturing lines." },
                  { icon: Zap, title: "Pharma-Grade Quality", desc: "Triple-verification safety protocols." },
                  { icon: Globe, title: "Global Supply Chain", desc: "Seamless export logistics to 180+ markets." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-500 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group mt-12 lg:mt-0">
              <div className="absolute -inset-4 bg-red-600/5 rounded-2xl group-hover:bg-red-600/10 transition-colors"></div>
              <img 
                src={content.assets.LAB_FACILITY} 
                alt="DXN R&D Facility" 
                className="relative rounded-lg shadow-2xl w-full grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-8 left-8 bg-neutral-950 p-6 md:p-8 max-w-[280px] border-l-4 border-red-600">
                 <span className="text-3xl md:text-4xl font-bold text-red-600 block mb-2">₹300Cr+</span>
                 <p className="text-white text-xs font-bold uppercase tracking-widest leading-relaxed">Total Investment in Siddipet Manufacturing Ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Showcase */}
      <section className="bg-neutral-950 py-20 md:py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionTitle light subtitle="Ecosystem" title="Manufacturing Divisions" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.divisions.map((div, idx) => {
              const IconComp = ICON_MAP[div.icon] || Globe;
              return (
                <div 
                  key={div.id} 
                  className={`group relative p-8 md:p-12 h-[400px] md:h-[450px] flex flex-col justify-between border transition-all duration-700 ${activeDivision === idx ? 'bg-red-600 border-red-600 translate-y-[-10px] shadow-2xl shadow-red-900/20' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                  onMouseEnter={() => setActiveDivision(idx)}
                >
                  <div>
                    <div className={`w-16 h-16 rounded mb-8 flex items-center justify-center transition-colors ${activeDivision === idx ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}>
                       <IconComp className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-4">{div.name}</h3>
                    <p className={`text-base md:text-lg transition-colors ${activeDivision === idx ? 'text-white' : 'text-neutral-400'}`}>
                      {div.description}
                    </p>
                  </div>
                  <Link to="/divisions" className={`flex items-center gap-3 font-bold uppercase tracking-widest text-xs transition-colors ${activeDivision === idx ? 'text-white' : 'text-red-500'}`}>
                    View Capabilities <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-neutral-900 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full opacity-10">
          <img src={content.assets.WORKERS_GROUP} className="w-full h-full object-cover grayscale" alt="Local Workforce" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900"></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 text-center">
           <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold tracking-tighter uppercase mb-12">Empowering the <br/><span className="text-red-600">Local Ecosystem</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-20">
              <div className="bg-neutral-950/50 backdrop-blur-md p-10 border border-white/10 group hover:border-red-600/50 transition-colors">
                 <Users className="w-8 h-8 text-red-600 mx-auto mb-6" />
                 <span className="text-5xl md:text-6xl font-bold block mb-4 text-white">1200+</span>
                 <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">Employment Generated</p>
              </div>
              <div className="bg-neutral-950/50 backdrop-blur-md p-10 border border-white/10 group hover:border-red-600/50 transition-colors">
                 <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-6" />
                 <span className="text-5xl md:text-6xl font-bold block mb-4 text-white">85%</span>
                 <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">Local Talent Upskilling</p>
              </div>
              <div className="bg-neutral-950/50 backdrop-blur-md p-10 border border-white/10 group hover:border-red-600/50 transition-colors">
                 <Award className="w-8 h-8 text-red-600 mx-auto mb-6" />
                 <span className="text-5xl md:text-6xl font-bold block mb-4 text-white">100%</span>
                 <p className="text-neutral-400 font-bold uppercase tracking-widest text-sm">Compliance Adherence</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-red-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold tracking-tighter uppercase mb-8 md:mb-12">Ready to Partner with Excellence?</h2>
          <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-red-600 px-8 py-4 md:px-12 md:py-6 text-sm md:text-lg font-bold uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all shadow-2xl">
            Book a Factory Visit <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
      </section>
      <style>{`
        @keyframes pan-slow {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-pan-slow {
          animation: pan-slow 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Home;
