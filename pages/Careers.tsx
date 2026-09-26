import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Users, BookOpen, Heart, ChevronRight, Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { JobApplicationModel } from '../components/JobApplicationModal';

const Careers: React.FC = () => {
   const { content } = useContent();
   const jobs = content.jobs || [];

   // State to control modal visibility and selected vacancy
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedRole, setSelectedRole] = useState<string>('');

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
         <section className="bg-[#FAFAF7] text-neutral-900 py-20 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">

               {/* Header */}
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                  <div>
                     <span className="text-xs font-black uppercase tracking-[0.3em] text-red-700 mb-3 block">— Join Our Team</span>
                     <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-neutral-900">Open<br className="hidden md:block" /> Opportunities</h2>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-6xl font-black text-red-700">{jobs.length}</span>
                     <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 leading-tight">Active<br />Positions</div>
                  </div>
               </div>

               {/* Job Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {jobs.map((job: any, i: number) => (
                     <div
                        key={i}
                        onClick={() => { setSelectedRole(job.role); setIsModalOpen(true); }}
                        className="group bg-white rounded-md shadow-sm border border-neutral-100 hover:shadow-lg hover:border-red-200 border-l-4 border-l-transparent hover:border-l-red-600 transition-all duration-300 cursor-pointer p-7 flex flex-col"
                     >
                        {/* Dept Badge */}
                        <span className="inline-block self-start text-[10px] font-black uppercase tracking-[0.2em] text-red-700 bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-5">
                           {job.dept}
                        </span>

                        {/* Role */}
                        <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 mb-3 leading-tight group-hover:text-red-700 transition-colors flex-grow">
                           {job.role}
                        </h3>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-6">
                           <span>📍 {job.loc}</span>
                           {job.exp && <><span>·</span><span>{job.exp}</span></>}
                        </div>

                        {/* Apply Now Link */}
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 group-hover:gap-3 transition-all">
                           <span>Apply Now</span>
                           <ChevronRight className="w-4 h-4" />
                        </div>
                     </div>
                  ))}
               </div>

               {/* Corporate HR Recruitment Contact Card */}
               <div className="mt-12 bg-white border border-neutral-200/80 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-4 text-left w-full md:w-auto">
                     <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                        <Mail className="w-5 h-5" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                           HR Department & General Inquiries
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                           Don't see an open position matching your profile? Connect directly with our Talent Acquisition Team:
                        </p>
                     </div>
                  </div>
                  <a
                     href="mailto:ts_hr@dxn2u.com"
                     className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm shrink-0"
                  >
                     <Mail className="w-4 h-4 text-red-400" />
                     <span>ts_hr@dxn2u.com</span>
                  </a>
               </div>

            </div>
         </section>

         {/* Application Modal */}
         <JobApplicationModel
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            defaultJobrole={selectedRole}
            allJobs={jobs}
            recipientEmail={content.careersEmail}
            ccEmail={content.careersCcEmail}
         />
      </div>
   );
};

export default Careers;
