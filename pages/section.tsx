
import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAssets } from '../App';
import { useContent } from '../context/ContentContext';
import { Package, Check, Filter, ArrowRight, AlertCircle, X, Download } from 'lucide-react';

const Products: React.FC = () => {
    const { assets } = useAssets();
    const { content } = useContent();
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    // Fallback for missing product images
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2000&auto=format&fit=crop";

    // Extract unique categories from divisions plus any manual ones
    const categories = useMemo(() => {
        const cats = new Set(['All']);
        // Add categories from actual products
        (content.products || []).forEach(p => cats.add(p.category));
        return Array.from(cats);
    }, [content.products]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') return content.products || [];
        return (content.products || []).filter(p => p.category === activeCategory);
    }, [activeCategory, content.products]);

    const handleViewSpecs = (product: any) => {
        setSelectedProduct(product);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
            {/* Cinematic Hero */}
            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black mb-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src={assets.PRODUCTS_HERO}
                        alt="DXN Product Catalog"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/60"></div>
                </div>
                <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        <Package className="w-3 h-3 text-red-600" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Global Catalog</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6 animate-in fade-in zoom-in duration-1000 delay-100">
                        Engineered for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Wellness.</span>
                    </h1>
                </div>
            </section>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* Filter System */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-4 text-neutral-400">
                        <Filter className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-widest">Filter By Division:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border ${activeCategory === cat
                                        ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20'
                                        : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            onClick={() => handleViewSpecs(product)}
                            className="group bg-neutral-900 border border-white/5 hover:border-red-600/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden cursor-pointer"
                        >
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-20">
                                <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${product.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
                                        product.status === 'Coming Soon' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
                                            'bg-blue-950/80 border-blue-500 text-blue-400'
                                    }`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Image Area */}
                            <div className="h-64 relative overflow-hidden bg-black">
                                <img
                                    src={product.image || FALLBACK_IMAGE}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em]">{product.category}</span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 flex-grow flex flex-col justify-between relative bg-neutral-900 group-hover:bg-neutral-900/80 transition-colors">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-red-500 transition-colors">{product.name}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-8">
                                        {(product.features || []).slice(0, 3).map((feature: string, fIdx: number) => (
                                            <div key={fIdx} className="flex items-center gap-3">
                                                <Check className="w-3 h-3 text-red-600" />
                                                <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewSpecs(product);
                                    }}
                                    className="w-full py-4 bg-white text-black border border-white hover:bg-red-600 hover:border-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-xl"
                                >
                                    View Specifications <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-32 text-center border border-dashed border-white/10 bg-white/5">
                        <AlertCircle className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-neutral-400 uppercase tracking-widest">No Products Found</h3>
                        <p className="text-neutral-600 text-sm mt-2">Adjust your filters or check back later.</p>
                    </div>
                )}
            </div>

            {/* Quick View Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-neutral-900 border border-white/10 w-full max-w-5xl shadow-2xl relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-sm" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white hover:bg-red-600 transition-colors rounded-full">
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Side */}
                        <div className="relative h-64 lg:h-auto bg-black">
                            <img src={selectedProduct.image || FALLBACK_IMAGE} alt={selectedProduct.name} className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:bg-gradient-to-r"></div>
                            <div className="absolute top-6 left-6 z-10">
                                <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${selectedProduct.status === 'Available' ? 'bg-green-950/80 border-green-500 text-green-400' :
                                        selectedProduct.status === 'Coming Soon' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
                                            'bg-blue-950/80 border-blue-500 text-blue-400'
                                    }`}>
                                    {selectedProduct.status}
                                </span>
                            </div>
                        </div>

                        {/* Details Side */}
                        <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900 max-h-[80vh] overflow-y-auto">
                            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4" /> {selectedProduct.category}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">{selectedProduct.name}</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed mb-8 font-light border-b border-white/5 pb-8">
                                {selectedProduct.description}
                            </p>

                            <div className="space-y-4 mb-10 bg-black/20 p-6 border border-white/5 rounded-sm">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Technical Highlights</h4>
                                <ul className="space-y-3">
                                    {(selectedProduct.features || []).map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-3 text-neutral-400 text-sm">
                                            <Check className="w-4 h-4 text-red-600 shrink-0" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-4 bg-white text-black border border-white font-black uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-all text-[10px] md:text-xs flex items-center justify-center gap-2">
                                    Download Spec Sheet <Download className="w-4 h-4" />
                                </button>
                                <button onClick={() => setSelectedProduct(null)} className="py-4 bg-transparent text-white border border-white/20 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all text-[10px] md:text-xs">
                                    Close View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
