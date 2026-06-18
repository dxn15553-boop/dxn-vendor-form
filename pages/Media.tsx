
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { Download, ExternalLink, FileText, Newspaper } from 'lucide-react';

const Media: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative mb-20 overflow-hidden h-[400px]">
           <img src={assets.MEDIA_HERO} className="w-full h-full object-cover opacity-30" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
           <div className="absolute bottom-12 left-0 w-full text-center">
              <SectionTitle subtitle="Newsroom" title="Media & Press Releases" light />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* News Grid */}
           <div className="lg:col-span-2 space-y-12">
              <h3 className="text-xs font-black uppercase tracking-[0.5em] text-red-600 mb-8 flex items-center gap-3">
                 <Newspaper className="w-4 h-4" /> Recent Updates
              </h3>
              
              <div className="grid gap-8">
                 {(content.news || []).map((news: any, idx: number) => (
                   <div key={idx} className="group p-10 bg-neutral-900/50 border border-white/5 hover:border-red-600/30 transition-all">
                      <div className="flex justify-between items-start mb-6">
                         <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{news.source}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{news.date}</span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-500 transition-colors">{news.title}</h4>
                      <p className="text-neutral-400 font-light leading-relaxed mb-8">{news.summary}</p>
                      <button className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:gap-4 transition-all">
                         Read Press Release <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           {/* Media Kit Sidebar */}
           <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                 <div className="p-10 bg-red-600 text-white">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Media Kit</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-10 font-medium">
                       Access high-resolution factory imagery, corporate logos, and leadership profiles for press usage.
                    </p>
                    <div className="space-y-4">
                       <a href={content.mediaKit?.brandGuidelines || '#'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between bg-white text-black px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-all">
                          Brand Guidelines <Download className="w-4 h-4" />
                       </a>
                       <a href={content.mediaKit?.facilityAssets || '#'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between bg-black/20 backdrop-blur-sm border border-white/20 text-white px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                          Facility Assets (ZIP) <Download className="w-4 h-4" />
                       </a>
                    </div>
                 </div>

                 <div className="p-10 border border-white/5 bg-neutral-950">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center gap-2">
                       <FileText className="w-4 h-4" /> Publications
                    </h4>
                    <ul className="space-y-6">
                       {(content.publications || []).map((pub: any, idx: number) => (
                         <li key={idx} className="group cursor-pointer">
                            <a href={pub.url} target="_blank" rel="noopener noreferrer">
                              <p className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">{pub.title}</p>
                              <span className="text-[10px] text-neutral-500 uppercase font-bold">{pub.size}</span>
                            </a>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
