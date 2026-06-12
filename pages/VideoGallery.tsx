
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../context/ContentContext';
import { Play, X, Clapperboard } from 'lucide-react';

const VideoGallery: React.FC = () => {
  const { content } = useContent();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoSections = useMemo(() => {
    // Map videos to the managed categories
    const sections: Record<string, any[]> = {};
    const managedCategories = content.videoCategories || [];
    
    managedCategories.forEach(cat => {
      sections[cat] = content.galleryVideos.filter(vid => vid.category === cat);
    });

    // Also include videos that might be in deleted or missing categories
    content.galleryVideos.forEach(vid => {
      if (!managedCategories.includes(vid.category)) {
        if (!sections['Other']) sections['Other'] = [];
        sections['Other'].push(vid);
      }
    });

    return Object.entries(sections).filter(([_, vids]) => vids.length > 0);
  }, [content.galleryVideos, content.videoCategories]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative mb-20 overflow-hidden h-[400px]">
           <img src={content.assets.VIDEO_HERO} className="w-full h-full object-cover opacity-30" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
           <div className="absolute bottom-12 left-0 w-full text-center px-6">
              <SectionTitle subtitle="Motion" title="Cinematic Video Gallery" light />
           </div>
        </div>

        {videoSections.map(([category, videos], sIdx) => (
          <div key={category} className="mb-24 last:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-12">
              <Clapperboard className="text-red-600 w-6 h-6" />
              <h2 className="text-2xl font-black uppercase tracking-tighter border-b border-red-600 pb-2">{category} Series</h2>
            </div>
            
            <div className="space-y-12">
               {videos.map((vid, idx) => (
                 <div key={vid.id} className="group relative grid grid-cols-1 lg:grid-cols-5 bg-neutral-900 border border-white/5 hover:border-red-600/30 transition-all overflow-hidden">
                    <div className="lg:col-span-3 relative h-[300px] lg:h-[450px]">
                       <img src={vid.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={() => setActiveVideo(vid.id)}
                            className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group-hover:shadow-red-600/20"
                          >
                             <Play className="w-10 h-10 ml-2" />
                          </button>
                       </div>
                    </div>
                    <div className="lg:col-span-2 p-12 flex flex-col justify-center">
                       <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Production {idx + 1}</span>
                       <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-none">{vid.title}</h3>
                       <div className="flex items-center gap-4 text-neutral-500 font-bold uppercase tracking-widest text-xs">
                          <span>Full HD 4K</span>
                          <span>•</span>
                          <span>{vid.duration} Minutes</span>
                       </div>
                       <button 
                        onClick={() => setActiveVideo(vid.id)}
                        className="mt-10 self-start text-sm font-black uppercase tracking-widest border-b-2 border-red-600 pb-2 hover:text-red-500 transition-colors"
                       >
                         Watch Now
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
        {videoSections.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10">
             <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">No video content found.</p>
          </div>
        )}
      </div>

      {/* Video Modal Placeholder */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6">
           <button onClick={() => setActiveVideo(null)} className="absolute top-10 right-10 text-white p-4 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-10 h-10" />
           </button>
           <div className="w-full max-w-5xl aspect-video bg-neutral-900 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                 <Play className="w-64 h-64 text-white" />
              </div>
              <div className="relative text-center p-12">
                 <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Video Playback Initializing</h2>
                 <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">Loading: {activeVideo.replace('-', ' ')}</p>
                 <div className="w-24 h-1 bg-red-600 mx-auto mt-8 animate-pulse"></div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
