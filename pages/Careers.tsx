
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Users, BookOpen, Heart, Briefcase, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Careers: React.FC = () => {
   const { content } = useContent();
   const jobs = content.jobs || [];

   return (
      <div className="bg-neutral-950 text-neutral-300">
         <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
            <SectionTitle subtitle="Ecosystem" title="Empowering Telangana" light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
               <div>
                  <p className="text-2xl text-neutral-300 font-light leading-relaxed mb-10">
                     Join the 1000-strong team building the future of global wellness. We believe in local empowerment and global standard skill development.
                  </p>
                  <div className="space-y-6">
                     {[
                        { icon: Users, title: "Inclusive Culture", desc: "A diverse workforce bringing 'One World One Market' to life." },
                        { icon: BookOpen, title: "Skill Development", desc: "Rigorous training in GMP and modern manufacturing tech." },
                        { icon: Heart, title: "Wellness First", desc: "Competitive benefits and a focus on employee health." }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-6 p-6 border border-white/10 hover:bg-white/5 transition-all">
                           <item.icon className="text-red-600 w-10 h-10 shrink-0" />
                           <div>
                              <h4 className="text-xl font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                              <p className="text-neutral-400 text-sm">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="relative overflow-hidden group">
                  <img src="https://res.cloudinary.com/dmslyftme/image/upload/v1766555971/165444_dzvaj4.jpg" alt="Work Culture" className="rounded-lg shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/60 to-transparent flex items-end p-12">
                     <p className="text-3xl font-black uppercase tracking-tighter text-white">Shaping Local Potential <br /> into Global Leaders</p>
                  </div>
               </div>
            </div>
         </section>

         {/* Jobs Section */}
         <section className="bg-white text-neutral-900 py-20 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
               <div className="flex justify-between items-end mb-16">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">Open Opportunities</h2>
                  <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs border-b border-neutral-200 pb-2">Updated Today</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {jobs.map((job: any, i: number) => (
                     <div key={i} className="group p-10 border border-neutral-100 hover:border-red-600 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-red-600">
                              <Briefcase className="w-6 h-6" />
                           </div>
                           <ChevronRight className="w-6 h-6 text-neutral-300 group-hover:text-red-600 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">{job.role}</h3>
                        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                           <span className="text-red-600">{job.dept}</span>
                           <span>•</span>
                           <span>{job.loc}</span>
                           {job.exp && (
                              <>
                                 <span>•</span>
                                 <span className="text-neutral-400">{job.exp}</span>
                              </>
                           )}
                        </div>
                     </div>
                  ))}
               </div>

               <div className="mt-16 text-center">
                  <p className="text-neutral-500 mb-8 font-light italic">Don't see a fit? Send your CV to careers.india@dxn2u.com</p>
                  <button className="bg-neutral-950 text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
                     Submit General Application
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Careers;
