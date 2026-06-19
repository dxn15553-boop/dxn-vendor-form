
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Quote, Factory, FlaskConical, Sprout, Globe, Layers, Zap, Thermometer, BoxSelect, Scan, RefreshCcw, Target, Leaf } from 'lucide-react';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
   const { assets } = useAssets();
   const { content } = useContent();
   const timeline = content.timeline || [];

   return (
      <div className="bg-neutral-950 text-neutral-300">
         {/* Hero */}
         <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
            <SectionTitle subtitle="Our Journey" title="The Global Backbone of Wellness" light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <p className="text-2xl text-neutral-300 font-light leading-relaxed">
                     DXN Manufacturing (India) Pvt. Ltd. stands as a testament to the global vision of <span className="text-white font-medium">'One World One Market'</span>. As the largest manufacturing facility within the DXN ecosystem, this 47-acre campus in Siddipet is not merely a factory—it is a sovereign hub of biotechnology, indigenous cultivation, and advanced nutraceutical engineering designed to serve 180+ international markets.
                  </p>
                  <div className="p-10 border-l-4 border-red-600 bg-white/5 italic relative overflow-hidden group">
                     <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:rotate-12">
                        <Quote className="w-40 h-40 text-white" />
                     </div>
                     <Quote className="text-red-600 w-12 h-12 mb-6 opacity-100 relative z-10" />
                     <p className="text-xl text-white leading-relaxed mb-6 relative z-10 font-display">
                        "Our vision for Siddipet is to create the largest, most advanced manufacturing hub for DXN globally, bringing 'One World One Market' to life with uncompromising quality."
                     </p>
                     <cite className="not-italic font-bold uppercase tracking-widest text-sm text-red-500 relative z-10 block mt-4">— Datuk Lim Siow Jin, Founder</cite>
                  </div>
               </div>
               <div className="relative group">
                  <div className="absolute inset-0 bg-red-600 translate-x-4 translate-y-4 rounded-sm -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <img src={assets.FOUNDER_PHOTO} alt="Datuk Lim Siow Jin" className="rounded-sm shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 w-full z-10 relative" />
                  <div className="absolute -bottom-10 -left-10 bg-neutral-900 p-8 border border-white/10 shadow-xl z-20">
                     <span className="text-white text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-red-600" /> World Visionary
                     </span>
                  </div>
               </div>
            </div>
         </section>

         {/* Vertical Integration */}
         <section className="py-20 md:py-32 bg-neutral-900 border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div className="order-2 lg:order-1 relative">
                     <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/20 to-transparent rounded-full blur-3xl"></div>
                     <img src={assets.AGRO_INDOOR} alt="Vertical Integration" className="relative rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full" />
                     <div className="absolute -bottom-10 -right-10 bg-neutral-950 p-8 border border-white/10 max-w-xs hidden md:block">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 leading-relaxed">
                           "We don't just manufacture wellness; we cultivate it from the DNA up."
                        </p>
                     </div>
                  </div>
                  <div className="order-1 lg:order-2">
                     <SectionTitle subtitle="Core Competency" title="100% Vertical Integration" light />
                     <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
                        DXN distinguishes itself through total control of the supply chain. We do not source; we create. From the microscopic tissue culture of <i>Ganoderma lucidum</i> to the final sealed bottle delivered to the consumer, every step is owned, managed, and executed by DXN.
                     </p>

                     <div className="space-y-8">
                        {[
                           { icon: FlaskConical, title: "Proprietary R&D", desc: "In-house tissue culture and strain development." },
                           { icon: Sprout, title: "Organic Cultivation", desc: "Chemical-free, indigenous farming on 47 acres." },
                           { icon: Factory, title: "Advanced Processing", desc: "Cold-grinding and nano-extraction technology." },
                           { icon: Layers, title: "Global Distribution", desc: "Direct export to 12M+ distributors worldwide." }
                        ].map((item, idx) => (
                           <div key={idx} className="flex items-center gap-6 group">
                              <div className="w-16 h-16 shrink-0 bg-neutral-800 border border-white/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                                 <item.icon className="w-8 h-8" />
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">{item.title}</h4>
                                 <p className="text-sm text-neutral-500">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Gano Cultivation & Process - New Section */}
         <section className="py-20 md:py-32 bg-black text-white border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <div className="mb-24 text-center max-w-4xl mx-auto">
                  <SectionTitle subtitle="Core Science" title="The Ganoderma Blueprint" light />
                  <p className="text-xl text-neutral-400 font-light leading-relaxed">
                     At the heart of DXN's global success is our proprietary 6-step cultivation and processing methodology.
                     This ensures that our <i>Ganoderma lucidum</i> retains the highest potency of therapeutic compounds like Polysaccharides, Triterpenoids, and Adenosine.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                     {
                        step: "01",
                        title: "Tissue Culture",
                        icon: FlaskConical,
                        desc: "Isolation and reproduction of only the strongest, most genetically superior Ganoderma strains in a sterile lab environment."
                     },
                     {
                        step: "02",
                        title: "Organic Substrate",
                        icon: Sprout,
                        desc: "100% natural cultivation using paddy husk, brown rice powder, and scrap wood. No chemical fertilizers or pesticides."
                     },
                     {
                        step: "03",
                        title: "Suspension Method",
                        icon: Layers,
                        desc: "Vertical suspension arrangement cultivation to maximize space, control aeration, and prevent ground-level contamination."
                     },
                     {
                        step: "04",
                        title: "Cold Grinding",
                        icon: Thermometer,
                        desc: "Specialized non-heat technique that pulverizes the mushroom while preserving heat-sensitive active ingredients."
                     },
                     {
                        step: "05",
                        title: "Fiber Separation",
                        icon: BoxSelect,
                        desc: "Patented technology separates hard, indigestible fibers from nutrient-rich spores, resulting in a high 20:1 concentration ratio."
                     },
                     {
                        step: "06",
                        title: "Micro-Powderation",
                        icon: Scan,
                        desc: "Final extraction is processed into micro-particles to ensure maximum bioavailability and rapid absorption in the human body."
                     }
                  ].map((process, idx) => (
                     <div key={idx} className="relative group p-10 border border-white/10 bg-neutral-900/50 hover:bg-neutral-900 hover:border-red-600/50 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                           <span className="text-7xl font-black text-white">{process.step}</span>
                        </div>
                        <div>
                           <div className="w-12 h-12 mb-6 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                              <process.icon className="w-6 h-6" />
                           </div>
                           <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4 group-hover:text-red-500 transition-colors">{process.title}</h3>
                           <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                              {process.desc}
                           </p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 group-hover:text-white transition-colors">
                           <RefreshCcw className={`w-3 h-3 ${idx < 5 ? 'opacity-100' : 'opacity-0'}`} /> {idx < 5 ? 'Next Step' : 'Process Complete'}
                        </div>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-700"></div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Stats / Investment / Timeline */}
         <section className="bg-white text-neutral-900 py-20 md:py-32 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-full bg-neutral-50 skew-x-12 -translate-x-20"></div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
               <div>
                  <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">Strategic <br /><span className="text-red-600">Investment</span></h2>
                  <p className="text-xl text-neutral-600 leading-relaxed mb-8 font-medium">
                     With a strategic capital infusion exceeding <span className="text-neutral-900 font-bold">₹300 Crores</span>, the Siddipet facility is engineered for generational scale. It integrates six specialized manufacturing divisions under one roof, functioning as a self-sufficient industrial ecosystem that adheres to the strictest global GMP, ISO, and Halal standards.
                  </p>

                  {/* Dynamic Timeline - Connected to DB */}
                  <div className="space-y-6 pt-8 border-t border-neutral-200 mt-8">
                     <h4 className="font-bold uppercase tracking-widest text-sm text-red-600 mb-4">Milestones</h4>
                     {timeline.map((item: any, i: number) => (
                        <div key={i} className="flex gap-4 items-start">
                           <div className="font-black text-neutral-900 w-16">{item.year}</div>
                           <div>
                              <div className="font-bold uppercase tracking-wide text-xs mb-1">{item.title}</div>
                              <div className="text-xs text-neutral-500">{item.description}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8">
                  <div className="p-10 border border-neutral-200 bg-white hover:border-red-600 hover:shadow-2xl transition-all group flex flex-col justify-center items-center text-center">
                     <Zap className="w-8 h-8 text-neutral-300 mb-4 group-hover:text-red-600 transition-colors" />
                     <span className="text-6xl font-black text-neutral-900 mb-2">2018</span>
                     <span className="text-xs uppercase font-bold text-neutral-400 tracking-widest">Project Initiated</span>
                  </div>
                  <div className="p-10 border border-neutral-200 bg-white hover:border-red-600 hover:shadow-2xl transition-all group flex flex-col justify-center items-center text-center">
                     <Factory className="w-8 h-8 text-neutral-300 mb-4 group-hover:text-red-600 transition-colors" />
                     <span className="text-6xl font-black text-neutral-900 mb-2">2021</span>
                     <span className="text-xs uppercase font-bold text-neutral-400 tracking-widest">Operations Started</span>
                  </div>
                  <div className="p-10 border border-neutral-200 bg-white hover:border-red-600 hover:shadow-2xl transition-all group flex flex-col justify-center items-center text-center">
                     <Layers className="w-8 h-8 text-neutral-300 mb-4 group-hover:text-red-600 transition-colors" />
                     <span className="text-6xl font-black text-neutral-900 mb-2">6</span>
                     <span className="text-xs uppercase font-bold text-neutral-400 tracking-widest">Core Divisions</span>
                  </div>
                  <div className="p-10 border border-neutral-200 bg-white hover:border-red-600 hover:shadow-2xl transition-all group flex flex-col justify-center items-center text-center">
                     <Globe className="w-8 h-8 text-neutral-300 mb-4 group-hover:text-red-600 transition-colors" />
                     <span className="text-6xl font-black text-neutral-900 mb-2">₹300<span className="text-4xl">Cr</span></span>
                     <span className="text-xs uppercase font-bold text-neutral-400 tracking-widest">Global Investment</span>
                  </div>
               </div>
            </div>
         </section>

         {/* NEW SECTION: Our Vision */}
         <section className="py-20 md:py-32 bg-neutral-900 text-white relative overflow-hidden border-t border-white/5">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
               <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-red-600/20 blur-[100px] rounded-full"></div>
               <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-neutral-800/50 rounded-full border border-white/5"></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                  <div>
                     <SectionTitle subtitle="Strategic Outlook" title="Our Vision" light />
                     <h3 className="text-3xl font-light leading-snug text-neutral-200 mb-8">
                        "To stand as the <span className="text-white font-bold">Mother Manufacturing Hub</span> for the world, embodying the 'One World One Market' philosophy through absolute self-reliance and technological supremacy."
                     </h3>
                     <p className="text-lg text-neutral-400 leading-relaxed">
                        DXN Manufacturing India aspires to redefine the boundaries of nutraceutical production. Our long-term vision extends beyond volume; it is about creating a sovereign supply chain that insulates our global market from external disruptions. We aim to blend ancient Ayurvedic wisdom with futuristic Industry 5.0 automation, ensuring that every household globally has access to affordable, high-quality wellness.
                     </p>
                  </div>
                  <div className="space-y-8">
                     <div className="flex gap-6 p-8 bg-black/40 border border-white/10 hover:border-red-600 transition-colors duration-500 group">
                        <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                           <Globe className="w-8 h-8" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Global Sovereign Supply</h4>
                           <p className="text-sm text-neutral-400">Ensuring 100% stock availability for 180+ countries independent of global logistical crises.</p>
                        </div>
                     </div>
                     <div className="flex gap-6 p-8 bg-black/40 border border-white/10 hover:border-red-600 transition-colors duration-500 group">
                        <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                           <Leaf className="w-8 h-8" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Sustainable Future</h4>
                           <p className="text-sm text-neutral-400">Transitioning to a Net-Zero carbon footprint by integrating solar farms and zero-waste water recycling systems.</p>
                        </div>
                     </div>
                     <div className="flex gap-6 p-8 bg-black/40 border border-white/10 hover:border-red-600 transition-colors duration-500 group">
                        <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                           <Target className="w-8 h-8" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Technological Apex</h4>
                           <p className="text-sm text-neutral-400">Pioneering AI-driven cultivation and nano-extraction technologies to maximize Ganoderma potency.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Leadership Team */}
         <section className="py-20 md:py-32 bg-neutral-950 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <SectionTitle subtitle="Governance" title="Leadership Team" light />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {(content.team || []).map((member: any, idx: number) => (
                     <div key={idx} className="group cursor-default">
                        <div className="aspect-[3/4] overflow-hidden bg-neutral-900 mb-8 border-b-4 border-red-600 relative">
                           <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                              <p className="text-white text-sm font-medium leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                 Driving the strategic vision of DXN India with a focus on innovation, compliance, and global expansion.
                              </p>
                           </div>
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{member.name}</h3>
                        <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">{member.role}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default About;
