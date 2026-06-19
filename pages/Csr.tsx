
import React from 'react';
import SectionTitle from '../components/SectionTitle';


import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { Heart, Globe, BookOpen, Droplets, Sun, Sprout, Users, ShieldCheck, FileText, ArrowRight, Target, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Csr: React.FC = () => {
   const { assets } = useAssets();
   const { content } = useContent();
   const csr = content.csr;

   return (
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">

         {/* 1. Cinematic Hero */}
         <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black mb-24">
            <div className="absolute inset-0 z-0">
               <img
                  src={assets.CSR_HERO}
                  alt="DXN CSR Community"
                  className="w-full h-full object-cover opacity-50 scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/40"></div>
            </div>
            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                  <Heart className="w-3 h-3 text-red-600 fill-red-600" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Philanthropy & Impact</span>
               </div>
               <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100">
                  Responsible <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Manufacturing.</span>
               </h1>
               <p className="max-w-2xl mx-auto text-xl text-neutral-300 font-light mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                  {csr.subheadline}
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                  <button className="bg-red-600 text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                     View Impact Report
                  </button>
                  <button className="bg-transparent border border-white/30 text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                     Partner With Us
                  </button>
               </div>
            </div>
         </section>

         {/* 2. CSR Summary & Quick Facts */}
         <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
               <div>
                  <SectionTitle subtitle="Our Commitments" title="The Three Pillars of Responsibility" light />
                  <div className="space-y-8 mt-12">
                     <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                           <Target className="w-8 h-8 text-neutral-400 group-hover:text-white" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Responsible Manufacturing</h4>
                           <p className="text-neutral-400 text-sm leading-relaxed">Implementing global best practices in safety, ethics, and resource efficiency within our Siddipet hub.</p>
                        </div>
                     </div>
                     <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                           <Leaf className="w-8 h-8 text-neutral-400 group-hover:text-white" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Sustainable Agronomy</h4>
                           <p className="text-neutral-400 text-sm leading-relaxed">Empowering local farmers through organic cultivation techniques, buy-back guarantees, and knowledge transfer.</p>
                        </div>
                     </div>
                     <div className="flex gap-6 group">
                        <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                           <Users className="w-8 h-8 text-neutral-400 group-hover:text-white" />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Community Empowerment</h4>
                           <p className="text-neutral-400 text-sm leading-relaxed">Uplifting the Telangana region through education, water access projects, and skill development partnerships.</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Quick Facts Grid */}
               <div className="bg-neutral-900 border border-white/5 p-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2">
                     <Globe className="w-4 h-4" /> Impact at a Glance
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                     {csr.impactStats.map((stat: any, idx: number) => (
                        <div key={idx} className="p-6 border border-white/5 bg-black/40">
                           <span className="block text-4xl font-black text-white mb-2">{stat.value}</span>
                           <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{stat.label}</span>
                           <span className="block text-[9px] font-medium text-red-600 uppercase">{stat.suffix}</span>
                        </div>
                     ))}
                     <div className="p-6 border border-white/5 bg-black/40">
                        <span className="block text-4xl font-black text-white mb-2">47</span>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Acres</span>
                        <span className="block text-[9px] font-medium text-red-600 uppercase">Eco-Campus</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Sunyatee International Foundation */}
         <section className="py-32 bg-white text-neutral-900 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                     <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop" alt="Sunyatee Foundation Work" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 border-[20px] border-white/20 pointer-events-none"></div>
                     </div>
                  </div>
                  <div className="lg:col-span-7">
                     <div className="inline-block px-4 py-2 bg-neutral-100 text-neutral-900 text-xs font-black uppercase tracking-widest mb-6">Philanthropic Partner</div>
                     <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">Sunyatee International <span className="text-red-600">Foundation</span></h2>
                     <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                        The Sunyatee International Foundation serves as the dedicated philanthropic arm for DXN's community initiatives. With a mission to foster holistic wellbeing, the Foundation spearheads local interventions ranging from drinking water infrastructure to educational retreats.
                     </p>
                     <p className="text-lg text-neutral-500 leading-relaxed mb-12">
                        Active within the Siddipet district, the Foundation works in tandem with DXN Manufacturing India to identify critical community needs, ensuring that our corporate growth directly translates into improved quality of life for local residents.
                     </p>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4 p-6 border border-neutral-200 hover:border-red-600 transition-colors">
                           <Droplets className="w-8 h-8 text-blue-500 shrink-0" />
                           <div>
                              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Water Security</h4>
                              <p className="text-sm text-neutral-500">Constructing RO water plants and community drinking water facilities in underserved villages.</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 border border-neutral-200 hover:border-red-600 transition-colors">
                           <BookOpen className="w-8 h-8 text-amber-500 shrink-0" />
                           <div>
                              <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Education Support</h4>
                              <p className="text-sm text-neutral-500">Providing infrastructure aid to local schools and educational materials for underprivileged students.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. Sunya Training & Wellbeing */}
         <section className="py-32 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
               <div className="text-center mb-20">
                  <SectionTitle subtitle="Capacity Building" title="Sunya Training at Siddipet" light />
                  <p className="max-w-3xl mx-auto text-xl text-neutral-400 font-light">
                     Beyond manufacturing skills, we prioritize the mental and emotional resilience of our workforce and community through the proprietary Sunya philosophy.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                  {[
                     { title: "Workforce Wellbeing", desc: "Regular meditation and mindfulness sessions for factory staff to reduce stress and enhance focus." },
                     { title: "Leadership Development", desc: "Training interns and managers in ethical leadership rooted in the 'One World One Market' ethos." },
                     { title: "Community Wellness", desc: "Open sessions for local residents to learn simple, effective techniques for mental hygiene." }
                  ].map((item, i) => (
                     <div key={i} className="bg-black border border-white/10 p-10 hover:border-red-600/50 transition-all group text-center">
                        <div className="w-16 h-16 mx-auto bg-neutral-900 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                           <Sun className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-4">{item.title}</h4>
                        <p className="text-neutral-500 leading-relaxed text-sm">{item.desc}</p>
                     </div>
                  ))}
               </div>

               <div className="bg-gradient-to-r from-red-900/20 to-neutral-900 border border-red-900/30 p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                     <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Upcoming Training Batch</h3>
                     <p className="text-neutral-400 text-sm">Applications open for the next Sunya Internship Cycle at Siddipet Campus.</p>
                  </div>
                  <button className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all">
                     Request Session Details
                  </button>
               </div>
            </div>
         </section>

         {/* 5. Case Studies */}
         <section className="py-32 bg-neutral-950">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <SectionTitle subtitle="Measured Impact" title="Impact Stories" light />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                  {/* Case Study A */}
                  <div className="group border border-white/10 bg-neutral-900/50 hover:bg-neutral-900 transition-all overflow-hidden">
                     <div className="h-64 overflow-hidden relative">
                        <img src={assets.CSR_WATER} alt="Drinking Water Project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">Reported Activity</div>
                     </div>
                     <div className="p-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Clean Water Access Initiative</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                           As reported in local coverage, DXN and Sunyatee Foundation inaugurated a safe drinking water facility for a neighboring village in the Siddipet district. This project addresses the critical need for fluoride-free water, directly benefiting hundreds of families and reducing water-borne health risks. The facility is maintained with community participation to ensure long-term sustainability.
                        </p>
                        <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest">
                           <Target className="w-3 h-3" /> Status: Operational
                        </div>
                     </div>
                  </div>

                  {/* Case Study B */}
                  <div className="group border border-white/10 bg-neutral-900/50 hover:bg-neutral-900 transition-all overflow-hidden">
                     <div className="h-64 overflow-hidden relative">
                        <img src={assets.CSR_TRAINING} alt="Sunya Internship Graduation" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">Reported Activity</div>
                     </div>
                     <div className="p-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Internship & Sunya Graduation</h3>
                        <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                           The Siddipet facility recently hosted a graduation ceremony for its latest batch of interns, who completed a rigorous program combining technical manufacturing training with Sunya wellness practices. This dual-focus approach ensures that future industry leaders are not only skilled professionals but also balanced, ethical individuals. The program has been cited as a model for holistic workforce development.
                        </p>
                        <div className="flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest">
                           <Users className="w-3 h-3" /> Beneficiaries: 50+ per batch
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. Environment & Safety */}
         <section className="bg-white text-neutral-900 py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div>
                     <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">Environmental <span className="text-red-600">Stewardship</span></h2>
                     <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                        Our 47-acre campus is designed as an eco-industrial park. We are actively pursuing a roadmap towards carbon neutrality through solar integration, zero-liquid discharge (ZLD) water systems, and extensive green cover.
                     </p>
                     <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-neutral-700">
                           <Sun className="w-5 h-5 text-amber-500" /> Solar Roadmap (In Development)
                        </li>
                        <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-neutral-700">
                           <Droplets className="w-5 h-5 text-blue-500" /> 100% Water Recycling (ZLD Target)
                        </li>
                        <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-neutral-700">
                           <Sprout className="w-5 h-5 text-green-500" /> Organic Ganoderma Cultivation
                        </li>
                     </ul>
                     <div className="p-6 bg-neutral-100 border-l-4 border-red-600">
                        <h5 className="font-black uppercase tracking-widest text-xs mb-2">Health & Safety Commitment</h5>
                        <p className="text-sm text-neutral-600">
                           We are committed to OHSAS 45001 standards (in-progress) to ensure the highest safety benchmarks for our employees and contractors.
                        </p>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute top-0 right-0 w-full h-full bg-neutral-200 -translate-y-6 translate-x-6 z-0"></div>
                     <img src={assets.SUSTAIN_NATURE} alt="Environmental Stewardship" className="relative z-10 w-full grayscale shadow-2xl" />
                  </div>
               </div>
            </div>
         </section>

         {/* 7. Future Roadmap */}
         <section className="py-32 bg-neutral-900 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
               <SectionTitle subtitle="The Path Ahead" title="3-Year CSR Roadmap" light />
               <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="p-8 border border-white/10 bg-black">
                     <span className="text-4xl font-black text-white/20 mb-4 block">01</span>
                     <h4 className="text-lg font-bold uppercase text-white mb-2">Expand Farmer Network</h4>
                     <p className="text-sm text-neutral-500">Increase direct farmer partnerships for saffron and herbal sourcing by 200%.</p>
                  </div>
                  <div className="p-8 border border-white/10 bg-black">
                     <span className="text-4xl font-black text-white/20 mb-4 block">02</span>
                     <h4 className="text-lg font-bold uppercase text-white mb-2">Scale Sunya Training</h4>
                     <p className="text-sm text-neutral-500">Launch a certified Sunya Wellness Instructor program for local youth.</p>
                  </div>
                  <div className="p-8 border border-white/10 bg-black">
                     <span className="text-4xl font-black text-white/20 mb-4 block">03</span>
                     <h4 className="text-lg font-bold uppercase text-white mb-2">Renewable Transition</h4>
                     <p className="text-sm text-neutral-500">Achieve 40% renewable energy mix for factory operations by 2028.</p>
                  </div>
               </div>

               <div className="mt-20">
                  <h4 className="text-white font-black uppercase tracking-widest text-lg mb-8">Governance & Transparency</h4>
                  <p className="text-neutral-400 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
                     Our CSR initiatives are overseen by the factory leadership in coordination with the Sunyatee International Foundation, ensuring alignment with DXN Global's sustainability policies and local compliance regulations.
                  </p>
                  <div className="flex gap-4 justify-center">
                     <button className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                        <FileText className="w-4 h-4" /> Download Policy
                     </button>
                     <Link to="/contact" className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" /> Contact CSR Cell
                     </Link>
                  </div>
               </div>
            </div>
         </section>

      </div>
   );
};

export default Csr;
