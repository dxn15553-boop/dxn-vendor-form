
import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Microscope, ClipboardList, CheckCircle, Activity, Award, BadgeCheck, FileCheck, X, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '../types';

const Quality: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();
  const quality = content.quality;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomScale(1);
  const closeLightbox = () => {
      setSelectedCert(null);
      setZoomScale(1);
  };

  return (
    <div className="bg-neutral-950 text-neutral-300">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SectionTitle subtitle="Global Standards" title="Accreditations & Trust" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {quality.certifications.map((cert: Certification, i: number) => (
              <div
                key={cert.id || i}
                onClick={() => setSelectedCert(cert)}
                className={`group cursor-pointer p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between min-h-[300px] rounded-xl relative overflow-hidden ${cert.status === 'active'
                  ? 'bg-neutral-900/60 hover:bg-neutral-900 border-white/10 hover:border-red-600/40 hover:shadow-2xl hover:shadow-red-950/20'
                  : 'bg-neutral-950 border-white/5 opacity-60 hover:opacity-90'
                  }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full pointer-events-none group-hover:bg-red-600/10 transition-colors"></div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    {cert.logoUrl || cert.imageUrl ? (
                      <div className="w-40 h-20 rounded-xl bg-white p-2.5 flex items-center justify-center shadow-lg border border-neutral-200 group-hover:scale-105 transition-transform overflow-hidden">
                        <img src={cert.logoUrl || cert.imageUrl} alt={cert.name} className={`w-full h-full object-contain ${cert.imageClass || ''}`} />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <BadgeCheck className="w-8 h-8" />
                      </div>
                    )}

                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${cert.status === 'active'
                      ? 'border-red-600/40 bg-red-600/10 text-red-500'
                      : 'border-neutral-700 bg-neutral-800/50 text-neutral-400'
                      }`}>
                      {cert.status === 'active' ? 'Certified' : 'In Progress'}
                    </span>
                  </div>

                  {cert.category && (
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-1">
                      {cert.category}
                    </span>
                  )}

                  <h4 className="text-xl font-black uppercase tracking-tighter text-white mb-2 group-hover:text-red-500 transition-colors">
                    {cert.name}
                  </h4>

                  <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-4 line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  {cert.certificateNumber ? (
                    <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[170px]" title={cert.certificateNumber}>
                      {cert.certificateNumber}
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                      DXN Global Base
                    </span>
                  )}

                  <span className="text-xs font-bold text-red-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Details <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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


      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl overflow-hidden flex flex-col"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-red-600 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4 pr-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                  {selectedCert.name}
                </h3>
                {selectedCert.imageUrl && (
                  <div className="flex items-center gap-3 bg-neutral-800 px-3 py-2 rounded-lg border border-white/5 shadow-md w-fit shrink-0">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest select-none">Zoom:</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="3" 
                      step="0.05" 
                      value={zoomScale} 
                      onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                      className="w-28 sm:w-36 accent-red-600 h-1 bg-neutral-950 rounded-lg appearance-none cursor-pointer"
                      title="Adjust Zoom"
                    />
                    <span className="text-xs font-mono font-bold text-neutral-300 min-w-[45px] text-right select-none">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    {zoomScale > 1 && (
                      <button
                        onClick={handleResetZoom}
                        className="p-1.5 rounded text-neutral-400 hover:text-white transition-colors border-l border-white/5 pl-2 ml-1"
                        title="Reset Zoom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Certificate Image Preview Box */}
              {selectedCert.imageUrl ? (
                <div className={`w-full h-72 sm:h-[400px] mb-6 rounded-xl bg-white p-6 sm:p-10 shadow-lg border border-neutral-300 relative overflow-auto ${zoomScale > 1 ? 'flex items-start justify-start' : 'flex items-center justify-center'}`}>
                  <img 
                    src={selectedCert.imageUrl} 
                    alt={selectedCert.name} 
                    className={`transition-all duration-200 drop-shadow-md ${zoomScale > 1 ? 'max-w-none' : 'w-full h-full object-contain'} ${selectedCert.imageClass || ''}`}
                    onClick={() => {
                      if (zoomScale === 1) {
                        setZoomScale(2);
                      } else {
                        setZoomScale(1);
                      }
                    }}
                    style={{
                      cursor: zoomScale > 1 ? 'zoom-out' : 'zoom-in',
                      width: zoomScale > 1 ? `${zoomScale * 100}%` : undefined,
                      height: zoomScale > 1 ? 'auto' : undefined
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-64 mb-6 rounded-xl bg-neutral-950 p-8 flex flex-col items-center justify-center border border-white/5 text-center">
                  <BadgeCheck className="w-16 h-16 text-red-500 mb-4" />
                  <p className="text-neutral-400 text-sm font-medium">{selectedCert.description}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={closeLightbox}
                  className="px-6 py-2.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Audit Statement */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20">
        <div className="bg-red-600 p-12 md:p-20 text-center relative overflow-hidden rounded-xl">
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
