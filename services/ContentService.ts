
import { DEFAULT_ASSETS, KEY_STATS, DIVISIONS, CORPORATE_EVENTS, MEDIA_NEWS, CERTIFICATIONS, TIMELINE, ADDRESS } from '../constants';
import { Product } from '../types';
import { getSiteConfig, saveSiteConfig } from './SupabaseService';

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
      id: "prod-nutra-0",
      name: "DXN Arjuna Capsule",
      category: "Nutraceuticals",
      description: "DXN Arjuna Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ArjunaCapsule90.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-1",
      name: "DXN Amalaki Capsule",
      category: "Nutraceuticals",
      description: "DXN Amalaki Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AmalakiCapsule_90Capsule.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-2",
      name: "DXN Ashwagandha Capsule",
      category: "Nutraceuticals",
      description: "DXN Ashwagandha Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Ashwagandha90Capsule.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-3",
      name: "DXN Brahmi Capsule",
      category: "Nutraceuticals",
      description: "DXN Brahmi Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/BrahmiCapsule90.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-4",
      name: "DXN Ganocelium (GL) Capsule",
      category: "Nutraceuticals",
      description: "DXN Ganocelium (GL) Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GanoceliumCapsule.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-5",
      name: "DXN Lion's Mane Capsule",
      category: "Nutraceuticals",
      description: "DXN Lion's Mane Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/LionsManeCapsule450mgx90.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-6",
      name: "DXN Cordyceps Capsule",
      category: "Nutraceuticals",
      description: "DXN Cordyceps Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/cordycepsCapsule450mgx90.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-7",
      name: "DXN Poria-S Capsule",
      category: "Nutraceuticals",
      description: "DXN Poria-S Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Porias-sCapsule450mgx90Capsules.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-8",
      name: "DXN Reishi Gano (RG) Capsule",
      category: "Nutraceuticals",
      description: "DXN Reishi Gano (RG) Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/RG30.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-9",
      name: "DXN Neem Capsule",
      category: "Nutraceuticals",
      description: "DXN Neem Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/NeemTablet60.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-10",
      name: "DXN Spirulina Capsule",
      category: "Nutraceuticals",
      description: "DXN Spirulina Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Spirulina120Capsule.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-11",
      name: "DXN Shatavari Capsule",
      category: "Nutraceuticals",
      description: "DXN Shatavari Capsule - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ShatavariCapsule90.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-12",
      name: "DXN Lion's Mane Tablet",
      category: "Nutraceuticals",
      description: "DXN Lion's Mane Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/LionsManeTablet300mgx360.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-13",
      name: "DXN Cordyceps Tablet",
      category: "Nutraceuticals",
      description: "DXN Cordyceps Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/CordycepsTablet300mgx120Tablet.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-14",
      name: "DXN Poria-S Tablet",
      category: "Nutraceuticals",
      description: "DXN Poria-S Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Porias-sTablet300mgx120tablets.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-15",
      name: "DXN Zhi Mint",
      category: "Nutraceuticals",
      description: "DXN Zhi Mint - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ZhiMint.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-16",
      name: "DXN Reishi Gano (RG) Tablet",
      category: "Nutraceuticals",
      description: "DXN Reishi Gano (RG) Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/RG120Tablet.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-17",
      name: "DXN Ashwagandha Tablet",
      category: "Nutraceuticals",
      description: "DXN Ashwagandha Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AshwagandhaTabley_120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-18",
      name: "DXN Asthisamharaka Tablet",
      category: "Nutraceuticals",
      description: "DXN Asthisamharaka Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AsthisamharakaTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-19",
      name: "DXN Brahmi Tablet",
      category: "Nutraceuticals",
      description: "DXN Brahmi Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/BramhiTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-20",
      name: "DXN Gandira Tablet",
      category: "Nutraceuticals",
      description: "DXN Gandira Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GandiraTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-21",
      name: "DXN Giloy Tablet",
      category: "Nutraceuticals",
      description: "DXN Giloy Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GiloyTablet_60.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-22",
      name: "DXN Gokshura Tablet",
      category: "Nutraceuticals",
      description: "DXN Gokshura Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GokshuraTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-23",
      name: "DXN Spirulina Tablet",
      category: "Nutraceuticals",
      description: "DXN Spirulina Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/spirulina360Capsule.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-24",
      name: "DXN Amalaki Tablet",
      category: "Nutraceuticals",
      description: "DXN Amalaki Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AmalakiTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-25",
      name: "DXN Arjuna Tablet",
      category: "Nutraceuticals",
      description: "DXN Arjuna Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ArjunaTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-26",
      name: "DXN Meshashringi Tablet",
      category: "Nutraceuticals",
      description: "DXN Meshashringi Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/MeshaShringiTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-27",
      name: "DXN Harithaki Tablet",
      category: "Nutraceuticals",
      description: "DXN Harithaki Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/harithaki_tablet.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-28",
      name: "DXN Lasuna Tablet",
      category: "Nutraceuticals",
      description: "DXN Lasuna Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/LasunaTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-29",
      name: "DXN Manjista Tablet",
      category: "Nutraceuticals",
      description: "DXN Manjista Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ManjistaTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-30",
      name: "DXN Sh.Guggulu Tablet",
      category: "Nutraceuticals",
      description: "DXN Sh.Guggulu Tablet - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Sh.GugguluTablet120.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-31",
      name: "DXN Ganocelium Powder",
      category: "Nutraceuticals",
      description: "DXN Ganocelium Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ganoceliumPowder.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-32",
      name: "DXN Poria-S Powder",
      category: "Nutraceuticals",
      description: "DXN Poria-S Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/PoriasPowder30g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-33",
      name: "DXN Reishi Gano Powder",
      category: "Nutraceuticals",
      description: "DXN Reishi Gano Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/RG30gPowder.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-34",
      name: "Amalaki Churna",
      category: "Nutraceuticals",
      description: "Amalaki Churna - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/amalaki50powder.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-35",
      name: "DXN Arjuna Powder",
      category: "Nutraceuticals",
      description: "DXN Arjuna Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/ArjunaPowder50.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-36",
      name: "DXN Asana Powder",
      category: "Nutraceuticals",
      description: "DXN Asana Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/asanaPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-37",
      name: "DXN Asthisamharaka Powder",
      category: "Nutraceuticals",
      description: "DXN Asthisamharaka Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AsthisamharakaPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-38",
      name: "DXN Asvagandha Powder",
      category: "Nutraceuticals",
      description: "DXN Asvagandha Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/AshvagandhaPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-39",
      name: "DXN Atmagupta Powder",
      category: "Nutraceuticals",
      description: "DXN Atmagupta Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/atmagupta_50gPowder.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-40",
      name: "DXN Brahmi Powder",
      category: "Nutraceuticals",
      description: "DXN Brahmi Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/BramhiPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-41",
      name: "DXN Gandira Powder",
      category: "Nutraceuticals",
      description: "DXN Gandira Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/gandiraPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-42",
      name: "DXN Gokshura Powder",
      category: "Nutraceuticals",
      description: "DXN Gokshura Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GokshuraPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-43",
      name: "DXN Guduci Powder",
      category: "Nutraceuticals",
      description: "DXN Guduci Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/GudiciPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-44",
      name: "DXN Haridra Powder",
      category: "Nutraceuticals",
      description: "DXN Haridra Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/haridraPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-45",
      name: "DXN Harithaki Powder",
      category: "Nutraceuticals",
      description: "DXN Harithaki Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/HarithakiPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-46",
      name: "DXN Kalamegh Powder",
      category: "Nutraceuticals",
      description: "DXN Kalamegh Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/KalameghPower50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-47",
      name: "DXN Khadira Sara Powder",
      category: "Nutraceuticals",
      description: "DXN Khadira Sara Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/KhadiraSaraPowder50.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-48",
      name: "DXN Kunduru Powder",
      category: "Nutraceuticals",
      description: "DXN Kunduru Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/kunduruPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-49",
      name: "DXN Lasuna Powder",
      category: "Nutraceuticals",
      description: "DXN Lasuna Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/LasunaPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-50",
      name: "DXN Meshashringi Powder",
      category: "Nutraceuticals",
      description: "DXN Meshashringi Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/MeshashringiPowder50.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-51",
      name: "DXN Methika Powder",
      category: "Nutraceuticals",
      description: "DXN Methika Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Methika50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-52",
      name: "DXN Neem Powder",
      category: "Nutraceuticals",
      description: "DXN Neem Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/Neem50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-53",
      name: "DXN Sh.Guggulu Powder",
      category: "Nutraceuticals",
      description: "DXN Sh.Guggulu Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/sh.gugguluPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-54",
      name: "DXN Roselle Premix Powder",
      category: "Nutraceuticals",
      description: "DXN Roselle Premix Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/RosellePowder.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-55",
      name: "DXN Svarnapatri Powder",
      category: "Nutraceuticals",
      description: "DXN Svarnapatri Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/SvarnapatriPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-56",
      name: "DXN Tulasi Powder",
      category: "Nutraceuticals",
      description: "DXN Tulasi Powder - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/TulasiPowder50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },
    {
      id: "prod-nutra-57",
      name: "DXN Yastimadhu Churna",
      category: "Nutraceuticals",
      description: "DXN Yastimadhu Churna - Premium ayurvedic formulation for health and wellness.",
      image: "/nutra/yastimadhuChurna50g.png",
      features: ["Ayurvedic Formula", "100% Natural", "Health Supplement"],
      status: "Available"
    },

    {
      id: "prod-2",
      name: "Lingzhi Coffee 3-in-1",
      category: "Coffee",
      description: "The world's first healthy coffee blend, combining premium Brazilian coffee beans with 100% organic Ganoderma extract.",
      image: "/coffee/lingzhi.png",
      features: ["Low Acidity", "No Artificial Colors", "Organic Extract"],
      status: "Available"
    },
    {
      id: "prod-3",
      name: "Ganozhi Soap",
      category: "Cosmetics",
      description: "A specialized formula enriched with Ganoderma extract and palm oil to gently cleanse and moisturize the skin while preserving natural oils.",
      image: "/cosmetics/Ganozhisoap.png",
      features: ["pH Balanced", "Vitamin E Enriched", "Suitable for all Skin Types"],
      status: "Available"
    },
    {
      id: "prod-dish-cleen",
      name: "DXN Dish Cleen",
      category: "Cosmetics",
      description: "1 litre and 500 ml of viscous liquid form of dish cleen. A concentrated dishwashing liquid that effectively removes grease and food residues.",
      image: "/cosmetics/3d-dish-cleen.png",
      features: ["Grease Remover", "No Smell", "Aloe Vera Extract"],
      status: "Available"
    },
    {
      id: "prod-kombucha-saffron",
      name: "Saffron Kombucha",
      category: "Kombucha",
      description: "A premium fermented tea infused with Grade A Kashmiri Saffron cultivated right here in our Siddipet indoor facility.",
      image: "/kombucha/safronKombucha.png",
      features: ["Probiotic Rich", "Antioxidant Boost", "Indigenous Saffron"],
      status: "Available"
    },
    {
      id: "prod-kombucha-butterfly",
      name: "Butterfly Kombucha",
      category: "Kombucha",
      description: "A refreshing fermented tea infused with natural Butterfly Pea flower for a distinct flavor and antioxidant benefits.",
      image: "/kombucha/Butterfly pea copy.png",
      features: ["Probiotic Rich", "Antioxidant Boost", "Unique Flavor"],
      status: "Available"
    },
    {
      id: "prod-kombucha-classic",
      name: "Classic Kombucha",
      category: "Kombucha",
      description: "Our signature fermented tea, traditionally brewed to perfection for a balanced, refreshing taste.",
      image: "/kombucha/classicKomucha.png",
      features: ["Probiotic Rich", "Gut Health", "Naturally Carbonated"],
      status: "Available"
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
      id: "prod-8",
      name: "DXN Zhi Mocha",
      category: "Coffee",
      description: "500 gm Powder form of coffee DXN Zhi mocha powder (Each Sachet contains 20gm). A premium instant coffee blend that combines the rich flavors of fine cocoa powder and Ganoderma extract.",
      image: "/coffee/zhimocha.png",
      features: ["Coffee Blend", "Ganoderma Extract", "25 Servings Per Bag"],
      status: "Available"
    },
    {
      id: "prod-8b",
      name: "DXN Hibiscus Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Hibiscus flowers. This full-bodied flower produces a brilliant crimson-red tea featuring a tangy-sweet flavor.",
      image: "/coffee/hibiscus.png",
      features: ["Sun Dried Hibiscus", "Rich in Antioxidants", "35 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-8c",
      name: "DXN Wedelia Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Wedelia flowers. This naturally aromatic flower brews into a delicate, fragrant tea with a mild floral taste.",
      image: "/coffee/wedelia.png",
      features: ["Sun Dried Wedelia", "Rich in Antioxidants", "75 Servings Per Pack"],
      status: "Available"
    },
    {
      id: "prod-8d",
      name: "DXN Butterfly Pea Floral Tea",
      category: "Coffee",
      description: "Each paper canister box contains 30g of dried Butterfly Pea flowers. This unique, naturally coloured tea offers a mild, earthy floral flavour and promotes memory function.",
      image: "/coffee/butterflyPea.png",
      features: ["Sun Dried Butterfly Pea", "Promotes Brain Health", "75 Servings Per Pack"],
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
    },
    {
      id: "prod-10",
      name: "DXN Radish Salt",
      category: "Agro",
      description: "A premium seasoning known as 'radish salt' created by combining salt and finely crushed radish. Packaged in a 200 ml PET bottle.",
      image: "/agro/Radist Salt.png",
      features: ["Flavour Enhancer", "Salt Alternative", "100% Natural"],
      status: "Available"
    },
    {
      id: "prod-12",
      name: "DXN Pita Bhringaraja Hair Oil",
      category: "Cosmetics",
      description: "DXN Pita Bhringaraja Oil is a premium Ayurvedic hair oil crafted with traditional herbal ingredients. Gently massage into the scalp for conditioning and nourishment — leaving hair healthy, strong and revitalised.",
      image: "/R and D/bhringaraja.png",
      features: ["Ayurvedic Formula", "Nourishes Scalp", "Strengthens Hair"],
      status: "Available"
    },
    {
      id: "prod-13",
      name: "DXN Cut Chilli Vinegar",
      category: "Agro",
      description: "By adding vinegar to chopped or sliced chillies, a flavoured vinegar known as 'DXN Cut Chilli Vinegar' is produced. The flavour of Indo-Chinese cuisines was the inspiration for the creation of DXN Cut Chilli Vinegar, which was made from the best green chillies.",
      image: "/agro/Cut chilli.png",
      features: ["Flavoured Vinegar", "Premium Green Chillies", "Indo-Chinese Inspired"],
      status: "Available"
    },
    {
      id: "prod-14",
      name: "D'Burger Patty Dough",
      category: "Agro",
      description: "Vegetable Dough is made for cooked, boiled or reheated vegetables. Sandwich a veggie patty between two sandwich halves, then top with lettuce, mayonnaise, raw onion slices, and any additional topping you choose.",
      image: "/agro/Dburger.jpg copy.png",
      features: ["100% Vegetarian", "Easy to Cook", "Versatile Use"],
      status: "Available"
    },
    {
      id: "prod-15",
      name: "DXN Ganozhi Shampoo",
      category: "Cosmetics",
      description: "Specially designed using Ganoderma extract with vitamin B5 (Panthenol), this refreshing shampoo makes hair smooth, healthy, soft and shiny. Suitable for all types of hair.",
      image: "/cosmetics/shampoo.png",
      features: ["Ganoderma Extract", "Vitamin B5", "For All Hair Types"],
      status: "Available"
    },
    {
      id: "prod-16",
      name: "DXN Instant Upma",
      category: "Agro",
      description: "DXN Instant Upma is a tasty and healthy breakfast made with suji, lentils, and vegetables like onion, garlic, and green chilli. It's quick to make and packed with nutrients. No artificial preservatives, just a wholesome, vegetarian-friendly meal to start your day!",
      image: "/agro/Upma.png",
      features: ["Quick Breakfast", "Nutrient Packed", "No Artificial Preservatives"],
      status: "Available"
    },
    {
      id: "prod-17",
      name: "DXN Lingzhi Coffee 2 in 1",
      category: "Coffee",
      description: "Lingzhi Coffee 2 in 1 is a unique blend of premium instant coffee mix and Ganoderma extract, designed to offer both a rich coffee experience and health-enhancing benefits. It contains no added sugar, making it ideal for health-conscious individuals who enjoy their coffee with a smooth, slightly earthy flavor.",
      image: "/coffee/lingzhi2in1.png",
      features: ["No Added Sugar", "Ganoderma Extract", "Premium Coffee Mix"],
      status: "Available"
    },
    {
      id: "prod-18",
      name: "DXN Morinzhi",
      category: "Wetfood",
      description: "Morinzhi is a health drink made from Noni fruit. It is prepared using a natural process and is commonly consumed daily to support overall health and wellness.",
      image: "/kombucha/Morinzhi Bottle 600ml.png",
      features: ["Noni Fruit Extract", "Natural Processing", "Daily Wellness"],
      status: "Available"
    },
    {
      id: "prod-19",
      name: "DXN Tomato Ketchup",
      category: "Agro",
      description: "DXN Tomato Ketchup is made from red tomatoes, sugar, acetic acid, salt and a blend of spices. It has a smooth texture and tangy-savoy flavor — perfect as a base for pasta, pizzas, marinades and many more recipes.",
      image: "/agro/tomato-ketchup.png",
      features: ["Smooth Texture", "Tangy Flavor", "Versatile Base"],
      status: "Available"
    },
    {
      id: "prod-20",
      name: "DXN Tomato Sauce",
      category: "Agro",
      description: "DXN Tomato Sauce is made from ripe tomatoes, acetic acid, and a blend of spices. It has a smooth texture and a tangy-savory flavor. This versatile sauce is commonly used as a base for foods like pasta dishes, pizzas, marinades, and more.",
      image: "/agro/tomatoSauce.png",
      features: ["Rich Flavor", "Ripe Tomatoes", "Versatile Use"],
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
    { url: "/gallery/facility1.jpg", category: "Manufacturing", title: "Advanced Manufacturing Line" },
    { url: "/gallery/facility2.jpg", category: "Manufacturing", title: "Automated Production Facility" },
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
        // Hotfix: Enforce correct local images even if cached from older CMS state
        if (merged[idx].id === "prod-1") merged[idx].image = "/nutra/ReishiGanoProduct.png";
        if (merged[idx].id === "prod-2") merged[idx].image = "/coffee/lingzhi.png";
        if (merged[idx].id === "prod-3") merged[idx].image = "/cosmetics/Ganozhisoap.png";

        if (merged[idx].id === "prod-kombucha-saffron") merged[idx].image = "/kombucha/safronKombucha.png";
        if (merged[idx].id === "prod-kombucha-butterfly") merged[idx].image = "/kombucha/Butterfly pea copy.png";
        if (merged[idx].id === "prod-kombucha-classic") merged[idx].image = "/kombucha/classicKomucha.png";
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
    const saved = localStorage.getItem('dxn_india_managed_content_v3');
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
      localStorage.setItem('dxn_india_managed_content_v3', JSON.stringify(content));

      console.log("Content successfully deployed to global database.");
      return { success: true };
    } catch (e) {
      console.error("Failed to save content", e);
      throw e;
    }
  }
};
