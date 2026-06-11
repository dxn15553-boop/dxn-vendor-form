
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { ICON_MAP } from '../constants';
import { ChevronRight, Settings, Database, Activity, Target, Leaf, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAssets } from '../App';
import { useContent } from '../context/ContentContext';

const Divisions: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();

  const getDivisionAsset = (id: string) => {
    switch(id) {
      case 'nutra': return assets.DIV_NUTRA;
      case 'coffee': return assets.DIV_COFFEE;
      case 'cosmetics': return assets.DIV_COSMETICS;
      case 'kombucha': return assets.DIV_KOMBUCHA;
      case 'wetfood': return assets.DIV_WETFOOD;
      case 'agro': return assets.DIV_AGRO;
      default: return assets.HERO_BG;
    }
  };

  return (
    <div className="bg-neutral-950 text-neutral-300">
      {/* Cinematic Intro */}
      <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="lg:max-w-3xl">
            <SectionTitle subtitle="Operational Excellence" title="World-Class Manufacturing Core" light />
            <p className="text-2xl text-neutral-400 font-light leading-relaxed">
              DXN Siddipet is the 'Mother Manufacturing Facility'—a centralized hub of technological innovation where massive scale meets surgical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Divisions List */}
      <div className="space-y-0">
        {content.divisions.map((div, idx) => {
          const IconComp = ICON_MAP[div.icon] || Database;
          const isEven = idx % 2 === 0;
          return (
            <motion.section 
              key={div.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`py-20 md:py-32 border-t border-white/5 transform-gpu ${isEven ? 'bg-neutral-950 text-white' : 'bg-neutral-900 text-white'}`}
            >
              <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-6 mb-10">
                     <div className={`w-20 h-20 rounded-xl flex items-center justify-center bg-red-600 text-white shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)]`}>
                        <IconComp className="w-10 h-10" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-red-500 text-[10px] uppercase font-black tracking-[0.4em] mb-1">Division {idx + 1}</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">{div.name}</h2>
                     </div>
                  </div>
                  
                  <p className="text-xl mb-12 font-light leading-relaxed text-neutral-300">
                    {div.description}
                  </p>
                  
                  {/* Technical Strengths */}
                  <div className="mb-12">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Manufacturing Strengths
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(div.strengths || []).map((strength: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-sm hover:border-red-600/30 transition-all">
                           <Activity className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                           <span className="text-sm text-neutral-200 font-medium">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                     <Target className="text-red-600 w-5 h-5" />
                     <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
                       <span className="text-white">Global Output:</span> {div.capacity}
                     </p>
                  </div>
                </div>
                
                <div className={`${!isEven ? 'lg:order-1' : ''} relative group`}>
                   <div className="hidden md:block absolute -inset-2 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   <motion.div 
                     whileHover={{ y: -10, scale: 1.02 }}
                     transition={{ type: "spring", stiffness: 300 }}
                     className="relative overflow-hidden rounded-sm aspect-[4/3] bg-neutral-800"
                   >
                      <img 
                        src={getDivisionAsset(div.id)} 
                        alt={div.name} 
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                   </motion.div>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default Divisions;
