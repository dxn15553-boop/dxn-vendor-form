
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../context/ContentContext';
import { Maximize2, X, Filter } from 'lucide-react';

const ImageGallery: React.FC = () => {
    const { content } = useContent();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(() => {
        // Use the managed category list from content, adding 'All'
        return ['All', ...(content.imageCategories || [])];
    }, [content.imageCategories]);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') return content.galleryImages;
        return content.galleryImages.filter(img => img.category === activeCategory);
    }, [activeCategory, content.galleryImages]);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="relative mb-20 overflow-hidden h-[400px]">
                    <img src={content.assets.GALLERY_HERO} className="w-full h-full object-cover opacity-40 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                    <div className="absolute bottom-12 left-0 w-full text-center px-6">
                        <SectionTitle subtitle="Visual Story" title="Flagship Image Gallery" light />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <Filter className="w-4 h-4 text-red-600 mr-2" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="group relative cursor-pointer overflow-hidden aspect-[4/3] bg-neutral-900 animate-in fade-in zoom-in duration-500"
                            onClick={() => setSelectedImage(img.url)}
                        >
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                                <span className="text-red-500 text-[10px] uppercase font-black tracking-widest mb-1">{img.category}</span>
                                <h3 className="text-white text-xl font-bold uppercase tracking-tighter leading-none">{img.title}</h3>
                                <Maximize2 className="absolute top-8 right-8 text-white w-6 h-6 opacity-40" />
                            </div>
                        </div>
                    ))}
                    {filteredImages.length === 0 && (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10">
                            <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">No assets found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-10 right-10 text-white p-4 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-10 h-10" />
                    </button>
                    <img src={selectedImage} className="max-w-full max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-300" />
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
