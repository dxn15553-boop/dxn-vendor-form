
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../App';
import { useContent } from '../context/ContentContext';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const Events: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative mb-20 overflow-hidden h-[400px]">
           <img src={assets.EVENTS_HERO} className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
           <div className="absolute bottom-12 left-0 w-full text-center">
              <SectionTitle subtitle="Milestones" title="Corporate Events & Summits" light />
           </div>
        </div>

        <div className="grid gap-20">
           {(content.events || []).map((event, idx) => (
             <div key={idx} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 relative overflow-hidden aspect-video lg:aspect-[4/5] bg-neutral-900">
                   <img src={event.image} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                   <div className="absolute top-8 left-8 bg-red-600 text-white px-6 py-2 text-xs font-black uppercase tracking-widest">
                      {event.category}
                   </div>
                </div>
                <div className="lg:col-span-7">
                   <div className="flex items-center gap-4 text-red-500 mb-6 font-black uppercase tracking-[0.3em] text-xs">
                      <Calendar className="w-4 h-4" /> {event.date}
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 group-hover:text-red-500 transition-colors">
                      {event.title}
                   </h2>
                   <p className="text-xl text-neutral-400 font-light leading-relaxed mb-10 max-w-2xl">
                      {event.description}
                   </p>
                   <div className="flex items-center gap-4 text-neutral-600 font-bold uppercase tracking-widest text-xs mb-10">
                      <MapPin className="w-4 h-4" /> Siddipet Integrated Campus, India
                   </div>
                   <button className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-all">
                      Read Full Story <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
