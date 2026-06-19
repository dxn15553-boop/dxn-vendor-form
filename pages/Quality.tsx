
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Microscope, ClipboardList, CheckCircle, Activity, Award, BadgeCheck, FileCheck } from 'lucide-react';

const Quality: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();
  const quality = content.quality;

  return (
    <div className="bg-neutral-950 text-neutral-300">
      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SectionTitle subtitle="Commitment" title={quality.headline} light />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="text-2xl text-neutral-300 font-light leading-relaxed mb-10">
              {quality.description}
            </p>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex gap-8 group">
                <div className="shrink-0 w-20 h-20 bg-red-600 rounded flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform"><Microscope className="w-10 h-10" /></div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Integrated Quality Lab</h3>
                  <p className="text-neutral-400 leading-relaxed font-medium">
                    Equipped with high-precision analytical and microbiological tools, our R&D center performs comprehensive inbound, in-process, and outbound verification across the entire production lifecycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-2 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src={assets.QUALITY_PPE} alt="Quality Control PPE" className="relative rounded border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 w-full" />
            <div className="absolute bottom-8 right-8">
              <div className="bg-red-600 p-8 shadow-2xl">
                <ShieldCheck className="w-12 h-12 text-white" />
                <p className="mt-4 text-white text-xs font-black uppercase tracking-[0.2em]">Zero-Defect Goal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Triple Verification Framework */}
      <section className="bg-neutral-900 py-20 md:py-32 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-red-600 mb-6">Compliance Protocol</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Triple Verification Framework</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quality.tripleVerification.map((step: any, i: number) => (
              <div key={i} className="p-12 bg-neutral-950 border border-white/5 hover:border-red-600/30 transition-all group">
                <span className="text-5xl font-black text-white/5 mb-8 block group-hover:text-red-600/20 transition-colors">0{i + 1}</span>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 leading-none">{step.title}</h4>
                <p className="text-neutral-400 font-medium leading-relaxed">{step.desc}</p>
                <div className="mt-10 h-1 w-12 bg-red-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionTitle subtitle="Global Standards" title="Accreditations & Trust" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quality.certifications.map((cert: any, i: number) => (
              <div key={i} className={`p-8 border border-white/5 transition-all flex flex-col justify-between h-64 ${cert.status === 'active' ? 'bg-neutral-900/50 hover:bg-neutral-900' : 'bg-transparent opacity-50'}`}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <BadgeCheck className={`w-8 h-8 ${cert.status === 'active' ? 'text-red-600' : 'text-neutral-600'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 border ${cert.status === 'active' ? 'border-red-600 text-red-600' : 'border-neutral-600 text-neutral-600'}`}>
                      {cert.status === 'active' ? 'Certified' : 'In Progress'}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{cert.name}</h4>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                {cert.status === 'active' && (
                  <div className="pt-4 flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" /> Regulator Approved
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Statement */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20">
        <div className="bg-red-600 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2">
            <ShieldCheck className="w-[400px] h-[400px] text-white" />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
              Rigorous Quality Lab & R&D Excellence
            </h3>
            <p className="max-w-3xl mx-auto text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Our triple verification system ensures that every batch produced at the Siddipet Mother Facility matches the high-quality benchmarks set by DXN Global. We are audited, GMP monitored, and fully documented for worldwide compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Real-time Monitoring</span>
              <span className="flex items-center gap-2"><FileCheck className="w-4 h-4" /> Documented Audits</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Global Certifications</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quality;
