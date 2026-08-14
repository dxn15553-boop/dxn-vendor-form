import React from 'react';
import { useAssets } from '../context/AssetContext';
import { useContent } from '../context/ContentContext';
import { Download, ExternalLink, FileText, Newspaper, ArrowRight, Clock } from 'lucide-react';

const Media: React.FC = () => {
  const { assets } = useAssets();
  const { content } = useContent();

  const news = content.news || [];
  const featuredNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-600 selection:text-white pb-24 relative">

      {/* ── BACKGROUND GLOWS (Atmospheric lighting for premium feel) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-[600px] right-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">

        {/* ── REDESIGNED SPLIT HERO SECTION (No Text Overlap, Centered & Premium) ── */}
        <div className="pt-32 md:pt-44 pb-16 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">Press & Media Hub</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
                Media & Press Releases <br /></h1>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-lg">
                Access official announcements, scientific publications, and media resources from DXN Manufacturing India's state-of-the-art flagship campus.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#news-feed" className="bg-red-600 hover:bg-white text-white hover:text-black px-6 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm inline-flex items-center gap-2 shadow-lg shadow-red-900/10">
                  Browse Articles <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#media-kit" className="border border-white/10 bg-white/5 hover:bg-white text-white hover:text-black px-6 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-sm inline-flex items-center gap-2">
                  Download Media Kit <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Image Frame (Focal point with no face overlap) */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[450px] overflow-hidden border border-white/10 bg-neutral-900">
                  <img
                    src={assets.MEDIA_HERO}
                    alt="DXN Ceremony"
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-102"
                  />

                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/20" />

                  {/* Floating Caption Badge (Styled and placed to never block faces) */}
                  <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto bg-neutral-950/85 backdrop-blur-md px-4 py-3 border border-white/10 max-w-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                      <p className="text-[11px] text-neutral-200 font-medium tracking-wide leading-snug">
                        DXN Siddipet Flagship Facility Inauguration Ceremony
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── GRID SYSTEM (News & Sidebar) ── */}
        <div id="news-feed" className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 pt-16">

          {/* ── LEFT: NEWS ARTICLES (8 Cols) ── */}
          <div className="lg:col-span-8 space-y-12">

            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <Newspaper className="w-5 h-5 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Press Publications</span>
            </div>

            {/* ── FEATURED NEWS ARTICLE (Horizontal Wide Card) ── */}
            {featuredNews && (
              <a
                href={featuredNews.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer bg-neutral-900/30 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.08)] flex flex-col md:flex-row hover:-translate-y-1 block"
              >
                {/* Featured Image */}
                {featuredNews.image && (
                  <div className="md:w-1/2 min-h-[250px] md:min-h-full overflow-hidden relative">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      Featured Release
                    </div>
                  </div>
                )}
                {/* Featured Details */}
                <div className="p-8 md:p-10 md:w-1/2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">
                        {featuredNews.source}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {featuredNews.date}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                      {featuredNews.title}
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed font-light line-clamp-4">
                      {featuredNews.summary}
                    </p>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-750 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-lg w-fit">
                    Read Full Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            )}

            {/* ── REMAINING NEWS ITEMS (Editorial Grid Layout) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingNews.map((item: any, idx: number) => (
                <a
                  key={idx}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer bg-neutral-900/20 hover:bg-neutral-900/40 border border-white/5 hover:border-red-500/20 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl block"
                >
                  {/* Image Container with strict Aspect Ratio */}
                  {item.image && (
                    <div className="w-full aspect-[16/10] overflow-hidden bg-neutral-950 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                    </div>
                  )}
                  {/* Text Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-md">
                          {item.source}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {item.date}
                        </span>
                      </div>
                      <h3 className="text-base font-black uppercase tracking-tight leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3 font-light">
                        {item.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-red-500 group-hover:text-white transition-colors">
                      <span>Read Release</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* ── RIGHT: SIDEBAR (4 Cols - Sticky on Desktop) ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-32 space-y-6">

              {/* Media Kit Download Card */}
              <div id="media-kit" className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl border border-white/10 shadow-2xl p-8 group/card">
                {/* Thin header decorative gradient border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-amber-500" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover/card:bg-red-500/15 transition-all duration-500" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-2">Corporate Assets</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Media Kit</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8 font-light">
                    Download official brand graphics, high-resolution plant imagery, and executive profiles verified for press usage.
                  </p>

                  <div className="space-y-3">
                    <a
                      href={content.mediaKit?.brandGuidelines || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between bg-white text-black hover:bg-red-600 hover:text-white px-5 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-xl shadow-lg"
                    >
                      Brand Guidelines <Download className="w-4 h-4 flex-shrink-0" />
                    </a>
                    <a
                      href={content.mediaKit?.facilityAssets || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black px-5 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-xl"
                    >
                      Facility Assets (ZIP) <Download className="w-4 h-4 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Publications List */}
              <div className="border border-white/5 bg-neutral-900/20 backdrop-blur-md rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/5">
                  <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Publications</span>
                </div>

                <ul className="space-y-3">
                  {(content.publications || []).map((pub: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-neutral-800/80 group-hover:bg-red-500/10 border border-white/5 group-hover:border-red-500/30 flex items-center justify-center transition-all rounded-lg">
                          <FileText className="w-4 h-4 text-neutral-400 group-hover:text-red-400 transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-neutral-200 group-hover:text-red-400 transition-colors leading-snug mb-1 line-clamp-1 font-medium">
                            {pub.title}
                          </p>
                          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">{pub.size}</span>
                        </div>
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
