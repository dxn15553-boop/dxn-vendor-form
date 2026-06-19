
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Sun, Leaf, Cpu, Recycle, BarChart3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Sustainability: React.FC = () => {
   const { content } = useContent();
   const roadmap = content.roadmap || [];

   return (
      <div className="bg-neutral-950 text-neutral-300">
         <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
            <SectionTitle subtitle="Future Vision" title="Sustaining Global Wellness" light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-8">
                  <p className="text-2xl text-neutral-300 font-light leading-relaxed">
                     Manufacturing for the future means protecting the resources of tomorrow. DXN Siddipet is committed to full automation, renewable energy, and organic agronomy.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
                     <div className="flex items-center gap-4">
                        <Sun className="text-amber-500 w-8 h-8" />
                        <span className="font-bold uppercase tracking-widest text-xs">Solar Energy Integrated</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <Leaf className="text-green-500 w-8 h-8" />
                        <span className="font-bold uppercase tracking-widest text-xs">Organic Farming Focus</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <Cpu className="text-blue-500 w-8 h-8" />
                        <span className="font-bold uppercase tracking-widest text-xs">Full Process Automation</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <Recycle className="text-red-500 w-8 h-8" />
                        <span className="font-bold uppercase tracking-widest text-xs">Waste Conscious Ops</span>
                     </div>
                  </div>
               </div>
               <div className="relative">
                  <img src="https://picsum.photos/seed/sustain_nature/800/800" className="rounded-full border-[20px] border-white/5 opacity-80" alt="Sustainability" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-red-600 w-40 h-40 rounded-full flex items-center justify-center animate-pulse">
                        <Leaf className="text-white w-20 h-20" />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Roadmap */}
         <section className="bg-white text-neutral-900 py-20 md:py-32 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <div className="text-center mb-24">
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">2025 – 2030 Roadmap</h2>
                  <div className="h-1 w-20 bg-red-600 mx-auto"></div>
               </div>

               <div className="relative">
                  <div className="absolute left-0 lg:left-1/2 top-0 h-full w-px bg-neutral-200"></div>
                  <div className="space-y-24">
                     {roadmap.map((step: any, i: number) => (
                        <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                           <div className="flex-1 text-center lg:text-right">
                              {i % 2 === 0 && (
                                 <div>
                                    <h3 className="text-3xl font-black text-red-600 mb-2">{step.year}</h3>
                                    <h4 className="text-xl font-bold uppercase mb-4">{step.title}</h4>
                                    <p className="text-neutral-500">{step.desc}</p>
                                 </div>
                              )}
                           </div>
                           <div className="z-10 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold ring-8 ring-white shadow-xl">
                              {i + 1}
                           </div>
                           <div className="flex-1 text-center lg:text-left">
                              {i % 2 !== 0 && (
                                 <div>
                                    <h3 className="text-3xl font-black text-red-600 mb-2">{step.year}</h3>
                                    <h4 className="text-xl font-bold uppercase mb-4">{step.title}</h4>
                                    <p className="text-neutral-500">{step.desc}</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Sustainability;
