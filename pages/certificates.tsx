
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../context/ContentContext';
import { X, Filter, BadgeCheck, ExternalLink } from 'lucide-react';
import { Certification } from '../types';

const Certificates: React.FC = () => {
    const { content } = useContent();
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(() => {
        const cats = new Set<string>();
        content.quality.certifications.forEach(cert => {
            if (cert.category) cats.add(cert.category);
        });
        return ['All', ...Array.from(cats)];
    }, [content.quality.certifications]);

    const filteredCertifications = useMemo(() => {
        if (activeCategory === 'All') return content.quality.certifications;
        return content.quality.certifications.filter(cert => cert.category === activeCategory);
    }, [activeCategory, content.quality.certifications]);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-neutral-950 text-neutral-300 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                {/* Cinematic Hero Section */}
                <div className="relative mb-24 overflow-hidden h-[380px] rounded-3xl border border-white/5 shadow-2xl flex items-center justify-center">
                    <img src={content.assets.GALLERY_HERO} className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-105" alt="Hero background" />
                    <div className="absolute inset-0 bg-black/35"></div>
                    <div className="relative z-10 text-center px-6 max-w-3xl">
                        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-red-600">Certifications</span>
                        </h1>
                    </div>
                </div>

                {/* Category Filter Capsule */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-20 bg-white/[0.02] backdrop-blur-md p-2 rounded-2xl border border-white/5 max-w-fit mx-auto shadow-xl">
                    <div className="flex items-center pl-4 pr-2 border-r border-white/10 text-neutral-500">
                        <Filter className="w-3.5 h-3.5 text-red-600 mr-2" />
                        <span className="text-[9px] uppercase tracking-wider font-black">Filter</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                                activeCategory === cat 
                                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-950/50 scale-105 border border-red-500/20' 
                                    : 'bg-transparent border border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Premium Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {filteredCertifications.map((cert, idx) => (
                        <div
                            key={cert.id || idx}
                            onClick={() => setSelectedCert(cert)}
                            className={`group cursor-pointer p-8 bg-neutral-900/30 backdrop-blur-xl border rounded-2xl flex flex-col justify-between min-h-[340px] relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                                cert.status === 'active'
                                    ? 'border-white/5 hover:border-red-600/30 hover:shadow-[0_20px_50px_rgba(239,68,68,0.08)]'
                                    : 'border-white/5 opacity-60 hover:opacity-90'
                            }`}
                        >
                            {/* Card Hover Glow effect */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/0 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/5 transition-all duration-700"></div>

                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    {cert.logoUrl || cert.imageUrl ? (
                                        <div className="w-36 h-20 rounded-xl bg-white p-3 flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-105 transition-all duration-500 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                                            <img src={cert.logoUrl || cert.imageUrl} alt={cert.name} className={`w-full h-full object-contain ${cert.imageClass || ''}`} />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-all duration-500">
                                            <BadgeCheck className="w-8 h-8 animate-pulse" />
                                        </div>
                                    )}

                                    {/* Status Badge with Glowing Dot */}
                                    <span className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                                        cert.status === 'active'
                                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                            : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${cert.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                                        {cert.status === 'active' ? 'Certified' : 'In Progress'}
                                    </span>
                                </div>

                                {cert.category && (
                                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-neutral-500 block mb-2">
                                        {cert.category}
                                    </span>
                                )}

                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                                    {cert.name}
                                </h3>

                                <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-6 line-clamp-3">
                                    {cert.description}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase tracking-wider text-neutral-600 font-bold mb-0.5">Certificate No.</span>
                                    <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[150px]" title={cert.certificateNumber || 'N/A'}>
                                        {cert.certificateNumber || 'DXN Global Base'}
                                    </span>
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1.5 hover:text-red-400 transition-colors">
                                    Verify Document <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                </span>
                            </div>
                        </div>
                    ))}
                    {filteredCertifications.length === 0 && (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-neutral-900/10">
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">No certificates found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox / Zoom modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedCert(null)}>
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-red-600 transition-all shadow-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="mb-6 pr-10">
                            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-red-500 block mb-1">{selectedCert.category}</span>
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                                {selectedCert.name}
                            </h3>
                            {selectedCert.certificateNumber && (
                                <span className="text-[10px] font-mono text-neutral-500 uppercase">License: {selectedCert.certificateNumber}</span>
                            )}
                        </div>

                        {selectedCert.imageUrl ? (
                            <div className="w-full h-[60vh] mb-6 rounded-xl bg-white p-6 flex items-center justify-center shadow-inner border border-neutral-800 relative overflow-hidden">
                                <img src={selectedCert.imageUrl} alt={selectedCert.name} className={`max-w-full max-h-full object-contain drop-shadow-md ${selectedCert.imageClass || ''}`} />
                            </div>
                        ) : (
                            <div className="w-full h-64 mb-6 rounded-xl bg-neutral-950 p-8 flex flex-col items-center justify-center border border-white/5 text-center">
                                <BadgeCheck className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                                <p className="text-neutral-400 text-sm font-medium">{selectedCert.description}</p>
                            </div>
                        )}

                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-white/5 pt-4">
                            <div>
                                <span className="block">Authority: {selectedCert.issuingAuthority || 'DXN Global'}</span>
                                <span className="block">Valid: {selectedCert.validUntil || 'Active'}</span>
                            </div>
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="px-6 py-2.5 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-red-600 hover:text-white font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;
