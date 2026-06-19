import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Contact: React.FC = () => {
   const { content } = useContent();
   const info = content.contactInfo || {} as any;
   const inquiryTypes = info.inquiryTypes || ["Factory Visit Request", "Bulk Order Inquiry", "Export Distribution", "Careers"];

   return (
      <div className="bg-neutral-950 text-neutral-300">
         <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
            <SectionTitle subtitle="Connect" title="Visit the Hub" light />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
               {/* Info Side */}
               <div className="space-y-12">
                  <div className="flex gap-6">
                     <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shrink-0"><MapPin className="text-white w-7 h-7" /></div>
                     <div>
                        <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Location</h4>
                        <p className="text-neutral-400 leading-relaxed text-lg max-w-sm">{info.address}</p>
                     </div>
                  </div>

                  <div className="flex gap-6">
                     <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shrink-0"><Phone className="text-white w-7 h-7" /></div>
                     <div>
                        <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Inquiry</h4>
                        <p className="text-neutral-400 text-lg">{info.phone}</p>
                        <p className="text-neutral-400 text-lg">{info.email}</p>
                     </div>
                  </div>

                  <div className="flex gap-6">
                     <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shrink-0"><Clock className="text-white w-7 h-7" /></div>
                     <div>
                        <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Factory Hours</h4>
                        <p className="text-neutral-400 text-lg">{info.workDays}</p>
                        <p className="text-neutral-400 text-lg">{info.hours}</p>
                     </div>
                  </div>

                  <div className="p-8 border border-white/10 bg-white/5 rounded-sm">
                     <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-4">{info.logisticsTitle || "Logistics Connectivity"}</h4>
                     <p className="text-sm text-neutral-400 leading-relaxed italic">
                        {info.logisticsText || "Strategically located in Telangana's industrial heart, offering seamless connectivity to Hyderabad's international logistics corridor for global export distribution."}
                     </p>
                  </div>
               </div>

               {/* Form Side */}
               <div className="bg-white p-12 text-neutral-900 shadow-2xl">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Send an Inquiry</h3>
                  <form className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Full Name</label>
                           <input type="text" className="w-full bg-neutral-50 border-b-2 border-neutral-200 focus:border-red-600 px-4 py-3 outline-none transition-colors" />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Email Address</label>
                           <input type="email" className="w-full bg-neutral-50 border-b-2 border-neutral-200 focus:border-red-600 px-4 py-3 outline-none transition-colors" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Inquiry Type</label>
                        <select className="w-full bg-neutral-50 border-b-2 border-neutral-200 focus:border-red-600 px-4 py-3 outline-none transition-colors">
                           {inquiryTypes.map((type: string, i: number) => (
                              <option key={i}>{type}</option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-2">Message</label>
                        <textarea rows={4} className="w-full bg-neutral-50 border-b-2 border-neutral-200 focus:border-red-600 px-4 py-3 outline-none transition-colors resize-none"></textarea>
                     </div>
                     <button className="w-full bg-neutral-950 text-white py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-red-600 transition-all">
                        Submit Message <Send className="w-5 h-5" />
                     </button>
                  </form>
               </div>
            </div>
         </section>

         {/* Map Mockup */}
         <section className="h-[600px] w-full bg-neutral-800 relative grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
               <MapPin className="text-red-600 w-16 h-16 mb-4 animate-bounce" />
               <p className="text-white font-bold uppercase tracking-[0.5em] text-sm">{info.mapLocation || "Mandapally, Siddipet"}</p>
            </div>
            {/* Visual Guide: Embedded Google Map showing the precise location of DXN Manufacturing Siddipet */}
            <img src="https://res.cloudinary.com/dmslyftme/image/upload/v1766587481/Screenshot_2025-12-24_200707_ephdxd.png" alt="Map View" className="w-full h-full object-cover opacity-30" />
         </section>
      </div>
   );
};

export default Contact;