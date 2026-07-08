import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Search, ChevronRight } from 'lucide-react';

const capsulesList = [
  { name: 'DXN Arjuna Capsule', path: '/products/arjuna-capsule', image: '/nutra/ArjunaCapsule90.png' },
  { name: 'DXN Amalaki Capsule', path: '/products/amalaki-capsule', image: '/nutra/AmalakiCapsule_90Capsule.png' },
  { name: 'DXN Ashwagandha Capsule', path: '/products/ashwagandha-capsule', image: '/nutra/Ashwagandha90Capsule.png' },
  { name: 'DXN Brahmi Capsule', path: '/products/brahmi-capsule', image: '/nutra/BrahmiCapsule90.png' },
  { name: 'DXN Ganocelium (GL) Capsule', path: '/products/ganocelium-capsule', image: '/nutra/GanoceliumCapsule.png' },
  { name: "DXN Lion's Mane Capsule", path: '/products/lions-mane-capsule', image: '/nutra/LionsManeCapsule450mgx90.png' },
  { name: "DXN Cordyceps Capsule", path: '/products/cordyceps-capsule', image: '/nutra/cordycepsCapsule450mgx90.png' },
  // { name: "DXN Fomes G Capsule", path: '/products/fomes-g-capsule' },
  { name: "DXN Poria-S Capsule", path: '/products/poria-s-capsule', image: '/nutra/Porias-sCapsule450mgx90Capsules.png' },
  { name: "DXN Reishi Gano (RG) Capsule", path: '/products/reishi-gano-capsule', image: '/nutra/RG30.png' },
  // { name: "DXN Giloy Capsule", path: '/products/giloy-capsule' },
  // { name: "DXN Harithaki Capsule", path: '/products/harithaki-capsule' },
  // { name: "DXN Lasuna Capsule", path: '/products/lasuna-capsule' },
  // { name: "DXN Manjista Capsule", path: '/products/manjista-capsule' },
  // { name: "DXN Meshashringi Capsule", path: '/products/meshashringi-capsule' },
  { name: "DXN Neem Capsule", path: '/products/neem-capsule', image: '/nutra/NeemTablet60.png' },
  // { name: "DXN Triphala Capsule", path: '/products/triphala-capsule' },
  // { name: "DXN Tulasi Capsule", path: '/products/tulasi-capsule' },
  // { name: "DXN Yastimadhu Capsule", path: '/products/yastimadhu-capsule' },
  // { name: "DXN Andro-G Capsule", path: '/products/andro-g-capsule' },
  // { name: "DXN Asthisamharaka Capsule", path: '/products/asthisamharaka-capsule' },
  // { name: "DXN Atmagupta Capsule", path: '/products/atmagupta-capsule' },
  // { name: "DXN Dalchini Capsule", path: '/products/dalchini-capsule' },
  // { name: "DXN Gandira Capsule", path: '/products/gandira-capsule' },
  // { name: "DXN Gokshura Capsule", path: '/products/gokshura-capsule' },
  { name: "DXN Spirulina Capsule", path: '/products/spirulina-capsule', image: '/nutra/Spirulina120Capsule.png' },
  { name: "DXN Shatavari Capsule", path: '/products/shatavari-capsule', image: '/nutra/ShatavariCapsule90.png' }
].map(item => ({ ...item, type: 'Capsules' }));

const tabletsList = [
  { name: "DXN Lion's Mane Tablet", path: '/products/lions-mane-tablet', image: '/nutra/LionsManeTablet300mgx360.png' },
  { name: "DXN Cordyceps Tablet", path: '/products/cordyceps-tablet', image: '/nutra/CordycepsTablet300mgx120Tablet.png' },
  // { name: "DXN Fomes G Tablet", path: '/products/fomes-g-tablet' },
  { name: "DXN Poria-S Tablet", path: '/products/poria-s-tablet', image: '/nutra/Porias-sTablet300mgx120tablets.png' },
  { name: "DXN Zhi Mint", path: '/products/zhi-mint', image: '/nutra/ZhiMint.png' },
  { name: "DXN Reishi Gano (RG) Tablet", path: '/products/reishi-gano-tablet', image: '/nutra/RG120Tablet.png' },
  // { name: "DXN Ganocelium (GL) Tablet", path: '/products/ganocelium-tablet', image: '/nutra/GLtablet.png' },
  { name: "DXN Ashwagandha Tablet", path: '/products/ashwagandha-tablet', image: '/nutra/AshwagandhaTabley_120.png' },
  { name: "DXN Asthisamharaka Tablet", path: '/products/asthisamharaka-tablet', image: '/nutra/AsthisamharakaTablet120.png' },
  // { name: "DXN Atmagupta Tablet", path: '/products/atmagupta-tablet' },
  { name: "DXN Brahmi Tablet", path: '/products/brahmi-tablet', image: '/nutra/BramhiTablet120.png' },
  // { name: "DXN Dalchini Tablet", path: '/products/dalchini-tablet' },
  { name: "DXN Gandira Tablet", path: '/products/gandira-tablet', image: '/nutra/GandiraTablet120.png' },
  { name: "DXN Giloy Tablet", path: '/products/giloy-tablet', image: '/nutra/GiloyTablet_60.png' },
  { name: "DXN Gokshura Tablet", path: '/products/gokshura-tablet', image: '/nutra/GokshuraTablet120.png' },
  { name: "DXN Spirulina Tablet", path: '/products/spirulina-tablet', image: '/nutra/spirulina360Capsule.png' },
  { name: "DXN Amalaki Tablet", path: '/products/amalaki-tablet', image: '/nutra/AmalakiTablet120.png' },
  { name: "DXN Arjuna Tablet", path: '/products/arjuna-tablet', image: '/nutra/ArjunaTablet120.png' },
  { name: "DXN Meshashringi Tablet", path: '/products/meshashringi-tablet', image: '/nutra/MeshaShringiTablet120.png' },
  { name: "DXN Harithaki Tablet", path: '/products/harithaki-tablet', image: '/nutra/HarithakiTablet120.png' },
  { name: "DXN Lasuna Tablet", path: '/products/lasuna-tablet', image: '/nutra/LasunaTablet120.png' },
  { name: "DXN Manjista Tablet", path: '/products/manjista-tablet', image: '/nutra/ManjistaTablet120.png' },
  { name: "DXN Sh.Guggulu Tablet", path: '/products/sh-guggulu-tablet', image: '/nutra/Sh.GugguluTablet120.png' },
  // { name: "DXN Triphala Tablet", path: '/products/triphala-tablet' },
  // { name: "DXN Tulasi Tablet", path: '/products/tulasi-tablet' },
  // { name: "DXN Yastimadhu Tablet", path: '/products/yastimadhu-tablet' }
].map(item => ({ ...item, type: 'Tablets' }));

const powdersList = [
  { name: 'DXN Ganocelium Powder', path: '/products/ganocelium-powder', image: '/nutra/ganoceliumPowder.png' },
  { name: 'DXN Poria-S Powder', path: '/products/poria-s-powder', image: '/nutra/PoriasPowder30g.png' },
  { name: 'DXN Reishi Gano Powder', path: '/products/reishi-gano-powder', image: '/nutra/RG30gPowder.png' },
  { name: 'Amalaki Churna', path: '/products/amalaki-churna', image: '/nutra/amalaki50powder.png' },
  { name: 'DXN Arjuna Powder', path: '/products/arjuna-powder', image: '/nutra/ArjunaPowder50.png' },
  { name: 'DXN Asana Powder', path: '/products/asana-powder', image: '/nutra/asanaPowder50g.png' },
  { name: 'DXN Asthisamharaka Powder', path: '/products/asthisamharaka-powder', image: '/nutra/AsthisamharakaPowder50g.png' },
  { name: 'DXN Asvagandha Powder', path: '/products/asvagandha-powder', image: '/nutra/AshvagandhaPowder50g.png' },
  { name: 'DXN Atmagupta Powder', path: '/products/atmagupta-powder', image: '/nutra/atmagupta_50gPowder.png' },
  { name: 'DXN Brahmi Powder', path: '/products/brahmi-powder', image: '/nutra/BramhiPowder50g.png' },
  { name: 'DXN Gandira Powder', path: '/products/gandira-powder', image: '/nutra/gandiraPowder50g.png' },
  { name: 'DXN Gokshura Powder', path: '/products/gokshura-powder', image: '/nutra/GokshuraPowder50g.png' },
  { name: 'DXN Guduci Powder', path: '/products/guduci-powder', image: '/nutra/GudiciPowder50g.png' },
  { name: 'DXN Haridra Powder', path: '/products/haridra-powder', image: '/nutra/haridraPowder50g.png' },
  { name: 'DXN Harithaki Powder', path: '/products/harithaki-powder', image: '/nutra/HarithakiPowder50g.png' },
  { name: 'DXN Kalamegh Powder', path: '/products/kalamegh-powder', image: '/nutra/KalameghPower50g.png' },
  // { name: 'DXN Karavallaka Powder', path: '/products/karavallaka-powder' },
  { name: 'DXN Khadira Sara Powder', path: '/products/khadira-sara-powder', image: '/nutra/KhadiraSaraPowder50.png' },
  { name: 'DXN Kunduru Powder', path: '/products/kunduru-powder', image: '/nutra/kunduruPowder50g.png' },
  { name: 'DXN Lasuna Powder', path: '/products/lasuna-powder', image: '/nutra/LasunaPowder50g.png' },
  // { name: 'DXN Manjista Powder', path: '/products/manjista-powder' },
  { name: 'DXN Meshashringi Powder', path: '/products/meshashringi-powder', image: '/nutra/MeshashringiPowder50.png' },
  { name: 'DXN Methika Powder', path: '/products/methika-powder', image: '/nutra/Methika50g.png' },
  { name: 'DXN Neem Powder', path: '/products/neem-powder', image: '/nutra/Neem50g.png' },
  { name: 'DXN Sh.Guggulu Powder', path: '/products/sh-guggulu-powder', image: '/nutra/sh.gugguluPowder50g.png' },
  { name: 'DXN Roselle Premix Powder', path: '/products/roselle-premix-powder', image: '/nutra/RosellePowder.png' },
  // { name: 'DXN Spirulina Powder', path: '/products/spirulina-powder' },
  { name: 'DXN Svarnapatri Powder', path: '/products/svarnapatri-powder', image: '/nutra/SvarnapatriPowder50g.png' },
  { name: 'DXN Tulasi Powder', path: '/products/tulasi-powder', image: '/nutra/TulasiPowder50g.png' },
  { name: 'DXN Yastimadhu Churna', path: '/products/yastimadhu-churna', image: '/nutra/yastimadhuChurna50g.png' }
].map(item => ({ ...item, type: 'Powders' }));

const allProducts = [...capsulesList, ...tabletsList, ...powdersList];

const categories = ['All', 'Capsules', 'Tablets', 'Powders'];

const NutraProducts: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows of 4 items

  // Extract category from URL if present (e.g. ?type=Capsules)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type && categories.includes(type)) {
      setActiveCategory(type);
    }
  }, [location]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.type === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 relative overflow-hidden">
      {/* Background Aurora Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 pt-24 mb-16 z-10">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6 text-white">
            Nutraceuticals <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Gallery.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-400 text-sm md:text-base">
            Premium herbal solutions curated for holistic wellness.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-24 relative z-10">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-neutral-900 text-neutral-500 hover:text-white border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-5 py-2.5 pl-11 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          </div>
        </div>

        {/* Product Grid — Luxury Image-First Style */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {paginatedProducts.map((product: any, idx) => (
                <Link
                  key={idx}
                  to={product.path}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden mb-4 rounded-sm">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-700 ease-in-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-neutral-600" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    {/* Type pill — top left */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-900/80 backdrop-blur-sm px-2 py-1 rounded-sm border border-white/5">
                        {product.type}
                      </span>
                    </div>
                  </div>

                  {/* Text below image */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight leading-snug group-hover:text-red-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {product.type === 'Powders' ? 'Pure Churna Powder' : product.type === 'Tablets' ? 'Herbal Tablet' : 'Dietary Capsule'}
                    </p>
                    {/* Animated underline CTA */}
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300">
                      <span>Explore</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                      <div className="ml-auto h-px w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-red-500 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-16 pt-8 border-t border-white/5">
                <button
                  onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Prev
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                        page === currentPage
                          ? 'bg-red-600 text-white'
                          : 'text-neutral-500 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <Package className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
            <p className="text-neutral-500">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutraProducts;
