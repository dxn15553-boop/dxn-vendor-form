
import { DEFAULT_ASSETS, KEY_STATS, DIVISIONS, CORPORATE_EVENTS, MEDIA_NEWS, CERTIFICATIONS, TIMELINE, ADDRESS } from '../constants';
import { Product } from '../types';
import { getSiteConfig, saveSiteConfig } from './FirebaseService';

export const INITIAL_CONTENT = {
  hero: {
    headline: "Engineering the Future",
    subheadline: "DXN Manufacturing (India) Pvt. Ltd. – India’s largest production base serving as the global mother facility for nutraceuticals, coffee, and biotechnology.",
    primaryCta: "Explore Divisions",
    secondaryCta: "View Compliance"
  },
  contactInfo: {
    address: ADDRESS,
    phone: "+91 40 2354 XXXX",
    email: "info@dxn2u.com",
    hours: "09:00 AM – 06:00 PM IST",
    workDays: "Monday – Saturday",
    logisticsTitle: "Logistics Connectivity",
    logisticsText: "Strategically located in Telangana's industrial heart, offering seamless connectivity to Hyderabad's international logistics corridor for global export distribution.",
    mapLocation: "Mandapally, Siddipet",
    inquiryTypes: ["Factory Visit Request", "Bulk Order Inquiry", "Export Distribution", "Careers"]
  },
  quality: {
    headline: "Quality You Can Measure. Trust You Can Feel.",
    description: "Trust is the foundation of the DXN ecosystem. Our Siddipet facility operates under an Integrated Quality Management System (QMS) that ensures every product meets international safety and efficacy standards.",
    tripleVerification: [
      { title: "Quality Control (QC)", desc: "Rigorous laboratory testing of raw materials, in-process samples, and finished goods." },
      { title: "Quality Assurance (QA)", desc: "Systematic monitoring of manufacturing processes to ensure strict adherence to protocols." },
      { title: "Quality Management System (QMS)", desc: "Global standards alignment for continuous improvement and regulatory excellence." }
    ],
    certifications: CERTIFICATIONS
  },
  csr: {
    headline: "Responsible Manufacturing. Measurable Impact.",
    subheadline: "Empowering the Telangana region through sustainable industrial practices and community stewardship under the guidance of the Sunyatee International Foundation.",
    impactStats: [
      { label: "Community Projects", value: "15+", suffix: "Executed" },
      { label: "Trainees Graduated", value: "850+", suffix: "Verified" },
      { label: "Water Access", value: "5000+", suffix: "Beneficiaries" }
    ]
  },
  roadmap: [
    { year: "2025", title: "Ayurveda Expansion", desc: "Launch of dedicated Ayurveda tablet and floral tea manufacturing lines." },
    { year: "2026", title: "Kombucha Scaling", desc: "Expanding Saffron Kombucha variants for the European and US markets." },
    { year: "2027", title: "Zero Waste Certification", desc: "Achieving 100% waste-to-resource conversion across all divisions." },
    { year: "2030", title: "Carbon Neutrality", desc: "Targeted net-zero carbon operations via solar and forestation." }
  ],
  products: [
    {
      id: "prod-1",
      name: "Reishi Gano (RG)",
      category: "Nutraceuticals",
      description: "Derived from the fruit body of Ganoderma lucidum, RG is harvested from a 90-day cultivation cycle to ensure maximum Polysaccharide content.",
      image: "https://images.unsplash.com/photo-1615485925763-867c49f632a9?q=80&w=2070&auto=format&fit=crop",
      features: ["100% Ganoderma", "Detoxification Support", "Immune Modulation"],
      status: "Available"
    },
    {
      id: "prod-2",
      name: "Lingzhi Coffee 3-in-1",
      category: "Coffee",
      description: "The world's first healthy coffee blend, combining premium Brazilian coffee beans with 100% organic Ganoderma extract.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop",
      features: ["Low Acidity", "No Artificial Colors", "Organic Extract"],
      status: "Available"
    },
    {
      id: "prod-3",
      name: "Ganozhi Soap",
      category: "Cosmetics",
      description: "A specialized formula enriched with Ganoderma extract and palm oil to gently cleanse and moisturize the skin while preserving natural oils.",
      image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop",
      features: ["pH Balanced", "Vitamin E Enriched", "Suitable for all Skin Types"],
      status: "Available"
    },
    {
      id: "prod-4",
      name: "Spirulina Cereal",
      category: "Nutraceuticals",
      description: "A balanced alkaline food source combining high-grade Spirulina with cereal fiber for optimal digestive health.",
      image: "https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?q=80&w=1974&auto=format&fit=crop",
      features: ["Complete Protein", "Rich in GLA", "Superfood Blend"],
      status: "Available"
    },
    {
      id: "prod-5",
      name: "Saffron Kombucha",
      category: "Kombucha",
      description: "A premium fermented tea infused with Grade A Kashmiri Saffron cultivated right here in our Siddipet indoor facility.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop",
      features: ["Probiotic Rich", "Antioxidant Boost", "Indigenous Saffron"],
      status: "Coming Soon"
    },
    {
      id: "prod-6",
      name: "DXN Cocozhi",
      category: "Coffee",
      description: "This unique blend combines premium ingredients. DXN Cocozhi is a unique blend of Non-Dairy Creamer and cocoa, combining the rich flavors of these ingredients. Packaged in a convenient 500g powder form containing 20 sachets.",
      image: "/coffee/cocozhi.png",
      features: ["Premium Cocoa Blend", "Ganoderma Extract", "20 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-7",
      name: "DXN Cordyceps Coffee 3 in 1",
      category: "Coffee",
      description: "500 gm powder form of coffee with Cordyceps powder (Each sachet contains 20 gm). Premium coffee premix that is smooth, aromatic, and revitalizing.",
      image: "/coffee/cordyceps.png",
      features: ["Organic Cordyceps", "Premium Instant Coffee", "25 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-9",
      name: "DXN Veg Mayonnaise",
      category: "Agro",
      description: "A creamy, eggless spread crafted for sandwiches, salads, and dips. Packaged in a convenient 500g format. 100% vegetarian.",
      image: "/agro/veg_minus.png",
      features: ["Eggless & Cholesterol Free", "Smooth Consistency", "25 Servings Per Pack"],
      status: "Available"
    }
  ] as Product[],
  imageCategories: ['Campus', 'R&D', 'Manufacturing', 'Quality', 'Agronomy', 'Sustainability', 'Ecosystem'],
  videoCategories: ['Corporate', 'Technical', 'Global Impact', 'Agronomy'],
  galleryImages: [
    { url: DEFAULT_ASSETS.HERO_BG, category: "Campus", title: "Global Flagship Facility" },
    { url: DEFAULT_ASSETS.LAB_FACILITY, category: "R&D", title: "Microbiology Laboratory" },
    { url: DEFAULT_ASSETS.DIV_NUTRA, category: "Manufacturing", title: "Nutraceutical Production" },
    { url: DEFAULT_ASSETS.DIV_COFFEE, category: "Manufacturing", title: "High-Speed Coffee Sachet Lines" },
    { url: DEFAULT_ASSETS.QUALITY_PPE, category: "Quality", title: "In-process Quality Monitoring" },
    { url: DEFAULT_ASSETS.AGRO_INDOOR, category: "Agronomy", title: "Indoor Saffron Cultivation" },
    { url: DEFAULT_ASSETS.SUSTAIN_NATURE, category: "Sustainability", title: "Integrated Organic Farm" },
    { url: DEFAULT_ASSETS.WORKERS_GROUP, category: "Ecosystem", title: "Local Talent Development" },
  ],
  galleryVideos: [
    { 
      title: "The Siddipet Vision: Corporate Documentary", 
      thumbnail: DEFAULT_ASSETS.HERO_BG, 
      duration: "4:32",
      category: "Corporate",
      id: "vid-1"
    },
    { 
      title: "Advanced Manufacturing Excellence", 
      thumbnail: DEFAULT_ASSETS.DIV_NUTRA, 
      duration: "3:15",
      category: "Technical",
      id: "vid-2"
    },
    { 
      title: "One World One Market: Global Reach", 
      thumbnail: DEFAULT_ASSETS.MAP_OVERLAY, 
      duration: "2:45",
      category: "Global Impact",
      id: "vid-3"
    }
  ],
  team: [
    { 
      name: "Datuk Lim Siow Jin", 
      role: "Founder & Chairman", 
      image: DEFAULT_ASSETS.FOUNDER_PHOTO,
      linkedin: "#",
      email: "" 
    },
    { 
      name: "Dr. Rajesh savera", 
      role: "Director of Manufacturing", 
      image: "https://res.cloudinary.com/dmslyftme/image/upload/v1766475024/1737196861500_oaac8m.jpg?q=80&w=1000&auto=format&fit=crop",
      linkedin: "#",
      email: "rajesh@dxn2u.com" 
    },
    { 
      name: "Mr. Giri K Vijayan", 
      role: "Regional Head of Factories", 
      image: "https://res.cloudinary.com/dmslyftme/image/upload/v1766476971/23b46cc3-6e7e-4a9e-8457-966e9968b551_tgyjee.jpg?q=80&w=1000&auto=format&fit=crop",
      linkedin: "#",
      email: "giri@dxn2u.com" 
    }
  ],
  jobs: [
    { role: "Quality Control Executive", dept: "Nutraceuticals", loc: "Siddipet", exp: "3-5 Years" },
    { role: "Production Manager", dept: "Coffee Division", loc: "Siddipet", exp: "8+ Years" },
    { role: "Agronomy Specialist", dept: "Cultivation", loc: "Siddipet", exp: "2-4 Years" },
    { role: "Logistics Coordinator", dept: "Distribution", loc: "Siddipet", exp: "5+ Years" }
  ],
  mediaKit: {
    brandGuidelines: "#",
    facilityAssets: "#"
  },
  publications: [
    { title: "Annual Manufacturing Report 2024", size: "PDF • 12.4 MB", url: "#" },
    { title: "Sustainability & CSR Report", size: "PDF • 8.1 MB", url: "#" }
  ],
  timeline: TIMELINE,
  stats: KEY_STATS,
  divisions: DIVISIONS,
  events: CORPORATE_EVENTS,
  news: MEDIA_NEWS,
  assets: DEFAULT_ASSETS
};

const mergeProducts = (fetchedProducts: any) => {
  const merged = [...INITIAL_CONTENT.products];
  if (Array.isArray(fetchedProducts)) {
    fetchedProducts.forEach((cp: any) => {
      const idx = merged.findIndex(ip => ip.id === cp.id);
      if (idx > -1) {
        merged[idx] = cp;
      } else {
        merged.push(cp);
      }
    });
  }
  return merged;
};

export const ContentService = {
  async fetchAll() {
    try {
      // 1. Try fetching from Firebase first (Cloud Persistence)
      const cloudData = await getSiteConfig();
      if (cloudData) {
        // Deep merge to ensure stability
        return {
          ...INITIAL_CONTENT,
          ...cloudData,
          hero: { ...INITIAL_CONTENT.hero, ...(cloudData.hero || {}) },
          contactInfo: { ...INITIAL_CONTENT.contactInfo, ...(cloudData.contactInfo || {}) },
          quality: { ...INITIAL_CONTENT.quality, ...(cloudData.quality || {}) },
          csr: { ...INITIAL_CONTENT.csr, ...(cloudData.csr || {}) },
          mediaKit: { ...INITIAL_CONTENT.mediaKit, ...(cloudData.mediaKit || {}) },
          
          // Arrays: Replace entirely if they exist in cloud, else default
          roadmap: Array.isArray(cloudData.roadmap) ? cloudData.roadmap : INITIAL_CONTENT.roadmap,
          timeline: Array.isArray(cloudData.timeline) ? cloudData.timeline : INITIAL_CONTENT.timeline,
          products: mergeProducts(cloudData.products),
          imageCategories: Array.isArray(cloudData.imageCategories) ? cloudData.imageCategories : INITIAL_CONTENT.imageCategories,
          videoCategories: Array.isArray(cloudData.videoCategories) ? cloudData.videoCategories : INITIAL_CONTENT.videoCategories,
          galleryImages: Array.isArray(cloudData.galleryImages) ? cloudData.galleryImages : INITIAL_CONTENT.galleryImages,
          galleryVideos: Array.isArray(cloudData.galleryVideos) ? cloudData.galleryVideos : INITIAL_CONTENT.galleryVideos,
          team: Array.isArray(cloudData.team) ? cloudData.team : INITIAL_CONTENT.team,
          jobs: Array.isArray(cloudData.jobs) ? cloudData.jobs : INITIAL_CONTENT.jobs,
          publications: Array.isArray(cloudData.publications) ? cloudData.publications : INITIAL_CONTENT.publications,
          news: Array.isArray(cloudData.news) ? cloudData.news : INITIAL_CONTENT.news,
          divisions: Array.isArray(cloudData.divisions) ? cloudData.divisions : INITIAL_CONTENT.divisions,
          events: Array.isArray(cloudData.events) ? cloudData.events : INITIAL_CONTENT.events,
        };
      }
    } catch (e) {
      console.warn("Cloud content fetch failed, checking local storage...");
    }

    // 2. Fallback to LocalStorage (Offline / Backup)
    const saved = localStorage.getItem('dxn_managed_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONTENT,
          ...parsed,
          hero: { ...INITIAL_CONTENT.hero, ...(parsed.hero || {}) },
          contactInfo: { ...INITIAL_CONTENT.contactInfo, ...(parsed.contactInfo || {}) },
          quality: { ...INITIAL_CONTENT.quality, ...(parsed.quality || {}) },
          csr: { ...INITIAL_CONTENT.csr, ...(parsed.csr || {}) },
          mediaKit: { ...INITIAL_CONTENT.mediaKit, ...(parsed.mediaKit || {}) },
          roadmap: Array.isArray(parsed.roadmap) ? parsed.roadmap : INITIAL_CONTENT.roadmap,
          timeline: Array.isArray(parsed.timeline) ? parsed.timeline : INITIAL_CONTENT.timeline,
          products: mergeProducts(parsed.products),
          imageCategories: Array.isArray(parsed.imageCategories) ? parsed.imageCategories : INITIAL_CONTENT.imageCategories,
          videoCategories: Array.isArray(parsed.videoCategories) ? parsed.videoCategories : INITIAL_CONTENT.videoCategories,
          galleryImages: Array.isArray(parsed.galleryImages) ? parsed.galleryImages : INITIAL_CONTENT.galleryImages,
          galleryVideos: Array.isArray(parsed.galleryVideos) ? parsed.galleryVideos : INITIAL_CONTENT.galleryVideos,
          team: Array.isArray(parsed.team) ? parsed.team : INITIAL_CONTENT.team,
          jobs: Array.isArray(parsed.jobs) ? parsed.jobs : INITIAL_CONTENT.jobs,
          publications: Array.isArray(parsed.publications) ? parsed.publications : INITIAL_CONTENT.publications,
          news: Array.isArray(parsed.news) ? parsed.news : INITIAL_CONTENT.news,
          divisions: Array.isArray(parsed.divisions) ? parsed.divisions : INITIAL_CONTENT.divisions,
          events: Array.isArray(parsed.events) ? parsed.events : INITIAL_CONTENT.events,
        };
      } catch (e) {
        return INITIAL_CONTENT;
      }
    }
    return INITIAL_CONTENT;
  },

  async saveAll(content: any) {
    try {
      // 1. Save to Cloud (Primary)
      await saveSiteConfig(content);
      
      // 2. Save to Local (Backup/Cache)
      localStorage.setItem('dxn_managed_content', JSON.stringify(content));
      
      console.log("Content successfully deployed to global database.");
      return { success: true };
    } catch (e) {
      console.error("Failed to save content", e);
      throw e;
    }
  }
};
