
import React from 'react';
import { Stat, Division, Certification, Milestone } from './types';
import {
  Dna,
  Coffee,
  Sparkles,
  FlaskConical,
  Soup,
  Utensils,
  Sprout,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';

export const COMPANY_NAME = "DXN Manufacturing (India) Pvt. Ltd.";
export const ADDRESS = "Siddipet Industrial Park, Mandapally, Siddipet, Telangana – 502 267, India";

/**
 * PRODUCTION TOGGLE: 
 * Set this to 'false' before your final deployment to hide the Gear icon 
 * and disable the Asset Manager UI for end-users.
 */
export const SHOW_ASSET_MANAGER = true;

// Centralized Asset Registry
export const DEFAULT_ASSETS = {
  HERO_BG: "https://res.cloudinary.com/dmslyftme/image/upload/v1766470808/1920x1050_haexxk.jpg",
  LAB_FACILITY: "https://res.cloudinary.com/dmslyftme/image/upload/v1766483410/0dcb2d69-9a35-4132-b479-529c72e3704d_hm8dof.jpg?q=80&w=2025&auto=format&fit=crop",
  FOUNDER_PHOTO: "https://res.cloudinary.com/dmslyftme/image/upload/v1766473599/285797857_567658841622771_7494164707927808850_n_11_mvqkfe.jpg",
  QUALITY_PPE: "https://res.cloudinary.com/dmslyftme/image/upload/v1766572623/36114_cfnzbx.jpg?q=80&w=2070&auto=format&fit=crop",
  SUSTAIN_NATURE: "https://images.unsplash.com/photo-1530836361253-efad5cb2fe22?q=80&w=2070&auto=format&fit=crop",
  WORKERS_GROUP: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop",
  MAP_OVERLAY: "https://res.cloudinary.com/dmslyftme/image/upload/v1766587481/Screenshot_2025-12-24_200707_ephdxd.png?q=80&w=1974&auto=format&fit=crop",
  AGRO_INDOOR: "https://res.cloudinary.com/dmslyftme/image/upload/v1766473763/DXN-Holding_BC22052023_thumb_tem_uldtzb.jpg",
  // Gallery Heros
  GALLERY_HERO: "/flagship_image/company.png",
  VIDEO_HERO: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop",
  EVENTS_HERO: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop",
  MEDIA_HERO: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
  PRODUCTS_HERO: "https://images.unsplash.com/photo-1563209259-797180eced1e?q=80&w=2070&auto=format&fit=crop",
  // CSR Assets
  CSR_HERO: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
  CSR_WATER: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=2070&auto=format&fit=crop",
  CSR_TRAINING: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  // Division-specific visuals
  DIV_NUTRA: "/nutra/nutraDivision.png",
  DIV_COFFEE: "/coffee/lingzhi_coffeeDivision.png",
  DIV_COSMETICS: "/cosmetics/cosmeticsDivision.jpeg",
  DIV_KOMBUCHA: "/kombucha/komuchaDivision.jpeg",
  DIV_WETFOOD: "/wetfood/wetFood.jpeg",
  DIV_AGRO: "/agro/agroDivision.png",
};

export const CORPORATE_EVENTS = [
  {
    date: "November 2024",
    title: "Saffron Indoor Cultivation Launch",
    description: "Successfully completed India's largest indoor saffron cultivation cycle, showcasing agronomy excellence.",
    category: "Milestone",
    image: "https://res.cloudinary.com/dmslyftme/image/upload/v1766491717/a11897fa-b45e-4eed-ac32-c9bdb45bf8a2_i0h5gl.jpg?q=80&w=2000&auto=format&fit=crop"
  },
  {
    date: "September 2024",
    title: "Telangana State Industrial Visit",
    description: "High-level delegation from Telangana Industrial Corporation visited the 47-acre campus to review expansion.",
    category: "Government Relations",
    image: "https://res.cloudinary.com/dmslyftme/image/upload/v1766470801/1920x1050.02jpg_vtsd1m.jpg?q=80&w=2070&auto=format&fit=crop"
  },
  {
    date: "July 2024",
    title: "Global Distributor Summit India",
    description: "Hosted over 500 global distributors at the Siddipet Training Centre to witness 'One World One Market' in action.",
    category: "Ecosystem",
    image: "https://res.cloudinary.com/dmslyftme/image/upload/v1766570512/44616_jlzg91.jpg?q=80&w=2070&auto=format&fit=crop"
  }
];

export const MEDIA_NEWS = [
  {
    title: "DXN India Announces ₹100Cr Expansion Plan",
    date: "Jan 12, 2025",
    summary: "Strategic investment focused on Ayurveda tablets and floral tea lines at the Siddipet Hub.",
    source: "Corporate News"
  },
  {
    title: "FSSC 22000 Version 6 Certification Achieved",
    date: "Dec 05, 2024",
    summary: "Reinforcing global safety standards across all six manufacturing divisions in India.",
    source: "Quality Updates"
  },
  {
    title: "Empowering Local Workforce in Telangana",
    date: "Oct 22, 2024",
    summary: "DXN Siddipet crosses the milestone of 1000 direct and indirect employment opportunities.",
    source: "CSR"
  }
];

export const KEY_STATS: Stat[] = [
  { id: '1', label: 'Integrated Campus', value: '47', suffix: 'Acres' },
  { id: '2', label: 'Built-up Area', value: '53,700', suffix: 'sq. m' },
  { id: '3', label: 'Manufacturing Ops', value: '6', suffix: 'Divisions' },
  { id: '4', label: 'Global Market Reach', value: '180+', suffix: 'Countries' },
];

export const DIVISIONS: Division[] = [
  {
    id: 'nutra',
    name: 'Nutraceutical Division',
    description: 'Advanced production facility for wellness supplements, leveraging the healing power of Ganoderma and Cordyceps.',
    icon: 'Dna',
    categories: ['Capsules (Hard Shell)', 'Tablets (Coated/Uncoated)', 'Granulated Powders', 'Ayurveda Formulations'],
    strengths: [
      'Class 100,000 Clean Room Environment',
      'High-Speed Rotary Tablet Press',
      'Automated Encapsulation Technology',
      'Precision Multi-Stage Granulation'
    ],
    capacity: 'Millions of dosages per day for global export',
    image: '/nutra/nutraDivision.png'
  },
  {
    id: 'coffee',
    name: 'Coffee Division',
    description: 'The global heartbeat of DXN coffee manufacturing, producing our signature Lingzhi and Cordyceps blends.',
    icon: 'Coffee',
    categories: ['Lingzhi Coffee 3-in-1', 'Cordyceps Coffee', 'Premix Coffee Sachets', 'Neo Series Variants'],
    strengths: [
      'Advanced Aroma Recovery Systems',
      'High-Speed Vertical Form-Fill-Seal (VFFS)',
      'Automated Multi-Lane Sachet Packing',
      'Integrated Roast-to-Pack Logistics'
    ],
    capacity: 'High-volume sachet production across 12 automated lines',
    image: '/coffee/coffeeDivision.jpeg'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Personal Care',
    description: 'Precision manufacturing of dermatologically safe personal wellness and skincare products.',
    icon: 'Sparkles',
    categories: ['Skin Creams & Lotions', 'Ganozhi Soap & Shampoo', 'Toothpaste Production', 'Personal Hygiene Range'],
    strengths: [
      'Vacuum Emulsifying Mixers',
      'Automated Tube Filling & Sealing',
      'Microbiological Purity Control',
      'Fragrance Stability Testing Labs'
    ],
    capacity: 'Fully integrated personal care manufacturing ecosystem',
    image: '/cosmetics/cosmeticsDivision.jpeg'
  },
  {
    id: 'kombucha',
    name: 'Kombucha & Beverages',
    description: 'Specialized fermentation facility for functional beverages and probiotic drinks.',
    icon: 'FlaskConical',
    categories: ['Saffron Kombucha', 'Gano Kombucha', 'Fermented Functional Drinks', 'Probiotic Wellness Shots'],
    strengths: [
      'Controlled Fermentation Vessels',
      'Cold-Press Extraction Systems',
      'Saffron Infusion Technology',
      'Real-time pH & Temperature Monitoring'
    ],
    capacity: 'Scaling production for Saffron variants globally',
    image: '/kombucha/komuchaDivision.jpeg'
  },
  {
    id: 'wetfood',
    name: 'Wet Food & Health Drinks',
    description: 'Production of nutrient-dense liquid wellness formulations and fruit-based health beverages.',
    icon: 'Soup',
    categories: ['Morinzhi (Noni Juice)', 'Cordypine', 'Liquid Health Supplements', 'Functional Fruit Drinks'],
    strengths: [
      'Aseptic Processing & Filling',
      'Cold Chain Integrated Supply',
      'High-Pressure Pasteurization',
      'Concentrate Recovery Systems'
    ],
    capacity: 'High-speed bottling and aseptic pouch filling',
    image: '/wetfood/wetFood.jpeg'
  },
  {
    id: 'agro',
    name: 'Agro & RTE Foods',
    description: 'Bridging high-tech agronomy with ready-to-eat food solutions for modern wellness consumers.',
    icon: 'Utensils',
    categories: ['Ready-To-Eat (RTE) Meals', 'Saffron-infused Rice', 'Essential Oils Extraction', 'Dried Mushroom Products'],
    strengths: [
      'Retort Sterilization Technology',
      'Largest Indoor Saffron Cultivation Hub',
      'Subcritical Extraction for Essential Oils',
      'Modified Atmosphere Packaging (MAP)'
    ],
    capacity: 'Integrated farm-to-fork manufacturing capacity',
    image: '/agro/agroDivision.png'
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'FSSAI', status: 'active', description: 'Food Safety and Standards Authority of India' },
  { name: 'GMP India', status: 'active', description: 'Good Manufacturing Practices' },
  { name: 'FSSC 22000 v6', status: 'active', description: 'GFSI Recognized Food Safety System' },
  { name: 'Halal India', status: 'active', description: 'Compliant with Global Halal Standards' },
  { name: 'AYUSH', status: 'active', description: 'Ayurveda Compliance Certification' },
  { name: 'OHSAS 45001', status: 'in-progress', description: 'Occupational Health & Safety' },
  { name: 'ISO 14001', status: 'in-progress', description: 'Environmental Management' }
];

export const TIMELINE: Milestone[] = [
  { year: '2018', title: 'Project Initiation', description: 'Vision for India’s largest DXN base established in Telangana.' },
  { year: '2021', title: 'Operations Commence', description: 'Production of flagship Nutraceuticals begins serving global markets.' },
  { year: '2023', title: 'Expansion Phase', description: 'Multi-division scaling including Coffee and Cosmetics lines.' },
  { year: '2025', title: 'Strategic Roadmap', description: 'Implementation of Saffron cultivation and advanced RTE foods.' }
];

export const ICON_MAP: Record<string, any> = {
  Dna,
  Coffee,
  Sparkles,
  FlaskConical,
  Soup,
  Utensils,
  Sprout,
  ShieldCheck,
  Globe,
  Award
};
