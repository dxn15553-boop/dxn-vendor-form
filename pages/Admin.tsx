import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
   Save, Layout, Database, Image as ImageIcon, CheckCircle, Lock, Plus, Trash2,
   Video, Film, Briefcase, LogOut, Settings, ChevronRight, ChevronDown, Tag, RotateCcw, X,
   Users, FileText, Package, Download, Upload, AlertCircle, AlertTriangle, Truck, RefreshCw, ExternalLink,
   Calendar, Phone, MapPin, BarChart3, PlayCircle, Mail, Building, ShieldCheck, Search
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { ICON_MAP } from '../constants';
import { getVendors, updateVendorStatus, getVendorDocuments } from '../services/SupabaseService';
import { Product } from '../types';

const ADMIN_PASSWORD = 'dxn2025';
const AUTH_TOKEN_KEY = 'dxn_admin_auth_session';

// Helper for inputs
const InputGroup = ({ label, value, onChange, type = "text", rows = 1 }: any) => (
   <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{label}</label>
      {rows > 1 ? (
         <textarea
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            rows={rows}
            className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-red-600 transition-colors resize-none"
         />
      ) : (
         <input
            type={type}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-red-600 transition-colors"
         />
      )}
   </div>
);


export const categorizeMissingItems = (itemsString: string) => {
   const items = itemsString.split(',').map((i: string) => i.trim()).filter(Boolean);
   const categories: Record<string, string[]> = {
      'Mandatory Registrations & Tax': [],
      'Financial & Bank Details': [],
      'Compliance & Declarations': [],
      'Certifications & Quality': [],
      'Other Observations': []
   };

   items.forEach((item: string) => {
      const lower = item.toLowerCase();
      if (lower.includes('pan') || lower.includes('gst') || lower.includes('company registration') || lower.includes('profile')) {
         categories['Mandatory Registrations & Tax'].push(item);
      } else if (lower.includes('bank') || lower.includes('cheque') || lower.includes('financial') || lower.includes('itr')) {
         categories['Financial & Bank Details'].push(item);
      } else if (lower.includes('decl') || lower.includes('conflict') || lower.includes('bribery') || lower.includes('confidentiality') || lower.includes('code of conduct') || lower.includes('nda')) {
         categories['Compliance & Declarations'].push(item);
      } else if (lower.includes('iso') || lower.includes('gmp') || lower.includes('ce') || lower.includes('certificate') || lower.includes('license') || lower.includes('registration')) {
         categories['Certifications & Quality'].push(item);
      } else {
         categories['Other Observations'].push(item);
      }
   });

   return categories;
};

export const DOCUMENT_CATEGORIES: Record<string, string[]> = {
   'Entity Documentation': ['COMPANYREGISTRATION', 'PANCARD', 'GSTCERTIFICATE', 'COMPANYPROFILE', 'ORGCHART', 'CANCELLEDCHEQUE', 'BANKACCOUNTDETAILS'],
   'Statutory Compliance': ['MSMECERTIFICATE', 'PFREGISTRATION', 'ESIREGISTRATION', 'PROFTAXREGISTRATION', 'LABOURLICENSE'],
   'Financial Information': ['AUDITEDFINANCIALS', 'ITRACKNOWLEDGEMENT'],
   'Declarations': ['CONFLICTOFINTEREST', 'ANTIBRIBERY', 'COMPLIANCEDECL', 'BLACKLISTINGDECL', 'CONFIDENTIALITYDECL'],
   'Quality & Business Capability': ['MAJORCUSTOMERLIST', 'CUSTOMERREFERENCES', 'PRODUCTCATALOGUE', 'MANUFACTURINGFACILITY', 'SERVICEINFRASTRUCTURE'],
   'Certifications': ['ISO9001', 'ISO14001', 'ISO45001', 'GMP', 'CE', 'OTHERCERTIFICATIONS']
};

export const categorizeDocuments = (docs: { name: string; url: string; created_at?: string }[]) => {
   const categorized: Record<string, { name: string; url: string; created_at?: string }[]> = {
      'Entity Documentation': [],
      'Statutory Compliance': [],
      'Financial Information': [],
      'Declarations': [],
      'Quality & Business Capability': [],
      'Certifications': [],
      'Other / Uncategorized': []
   };

   docs.forEach(doc => {
      const match = doc.name.match(/^__(.*?)__/);
      let foundCategory = false;

      if (match) {
         const key = match[1].toUpperCase();
         for (const [catName, keys] of Object.entries(DOCUMENT_CATEGORIES)) {
            if (keys.includes(key)) {
               categorized[catName].push(doc);
               foundCategory = true;
               break;
            }
         }
      } else {
         // Heuristic fallback for older files
         const lower = doc.name.toLowerCase();
         if (lower.includes('pan') || lower.includes('gst') || lower.includes('profile') || lower.includes('cheque') || lower.includes('bank') || lower.includes('company')) {
            categorized['Entity Documentation'].push(doc);
            foundCategory = true;
         } else if (lower.includes('msme') || lower.includes('pf') || lower.includes('esi') || lower.includes('labour') || lower.includes('tax')) {
            categorized['Statutory Compliance'].push(doc);
            foundCategory = true;
         } else if (lower.includes('audit') || lower.includes('itr') || lower.includes('financial')) {
            categorized['Financial Information'].push(doc);
            foundCategory = true;
         } else if (lower.includes('decl') || lower.includes('conflict') || lower.includes('bribery') || lower.includes('nda') || lower.includes('conduct')) {
            categorized['Declarations'].push(doc);
            foundCategory = true;
         } else if (lower.includes('iso') || lower.includes('gmp') || lower.includes('ce') || lower.includes('cert')) {
            categorized['Certifications'].push(doc);
            foundCategory = true;
         } else if (lower.includes('customer') || lower.includes('catalogue') || lower.includes('facility') || lower.includes('infrastructure') || lower.includes('brochure')) {
            categorized['Quality & Business Capability'].push(doc);
            foundCategory = true;
         }
      }

      if (!foundCategory) {
         categorized['Other / Uncategorized'].push(doc);
      }
   });

   return categorized;
};

export const VENDOR_CATEGORIES: Record<string, string[]> = {
   "Nature of Business": [
      "OEM / Manufacturer",
      "Authorized Distributor",
      "Authorized Dealer",
      "Channel Partner",
      "Service Provider",
      "Contractor",
      "Consultant",
      "Trader / Reseller",
      "Importer",
      "Other"
   ],
   "Packaging Machines & Automation": [
      "Tube Filling Machine",
      "Liquid Filling Machine",
      "Carbonated Filling Machine",
      "Capping Machine",
      "Labeling Machine",
      "Shrink Sleeve Machine",
      "Case Erector",
      "Carton Sealer",
      "Band Sealer",
      "Check Weigher",
      "Online Weighing System",
      "Conveyor System"
   ],
   "Process & Production Equipment": [
      "Storage Tank",
      "Homogenizer",
      "Liquid Processing Equipment",
      "Material Transfer System",
      "Mixing Tank",
      "Powder Handling Equipment"
   ],
   "Utility Equipment": [
      "Air Compressor",
      "Chiller",
      "Cooling Tower",
      "Boiler",
      "RO Plant",
      "Generator",
      "Pumps",
      "Motors",
      "Valves",
      "Piping & Fittings",
      "Heat Exchanger"
   ],
   "Electrical, Automation & Instrumentation": [
      "Load Cell",
      "Weighing Scale",
      "Transformer",
      "Panel / Switchgear",
      "Cables & Wires",
      "PLC / SCADA System",
      "VFD",
      "Sensors / Transmitters",
      "UPS / Battery",
      "Lighting System"
   ],
   "Mechanical Fabrication & Engineering Services": [
      "Fabrication (SS/MS)",
      "Machining Parts",
      "Structural Steel Work",
      "Sheet Metal Work",
      "Die / Mold Making",
      "Engineering Design (CAD/CAM)"
   ],
   "MRO & Industrial Consumables": [
      "Bearings",
      "Fasteners",
      "Pneumatics",
      "Hydraulics",
      "Belts",
      "Filters",
      "Lubricants",
      "Gaskets / Seals",
      "Tools & Tackles",
      "Industrial Consumables",
      "Packaging Material (Primary/Secondary)",
      "Chemicals / Solvents"
   ],
   "Laboratory & Quality Equipment": [
      "Lab Equipment",
      "Testing Instruments",
      "Calibration Services",
      "Glassware",
      "Lab Consumables"
   ],
   "Civil & Infrastructure": [
      "Civil Construction",
      "Painting",
      "Flooring",
      "Waterproofing",
      "Interior Works"
   ],
   "HVAC & Clean Room": [
      "HVAC System",
      "Clean Room Equipment",
      "AHU",
      "Ducting",
      "Clean Room Consumables"
   ],
   "Safety & Fire Protection": [
      "PPE",
      "Fire Hydrant System",
      "Fire Extinguisher",
      "Safety Equipment",
      "CCTV / Access Control"
   ],
   "Facility Management Services": [
      "Housekeeping",
      "Security Services",
      "Pest Control",
      "Scrap Dealer",
      "Canteen / Catering",
      "Transport / Cab Services"
   ],
   "Logistics & Transportation": [
      "Freight Forwarder",
      "Custom House Agent",
      "Transporter",
      "Courier Services",
      "Warehousing"
   ],
   "Professional Services": [
      "IT Services",
      "Manpower Supply",
      "Legal / Statutory Consulting",
      "Event Management",
      "Marketing / Advertising",
      "Travel Agency"
   ]
};

export const renderCategorizedVendorCategory = (categoryString: string) => {
   const emptyFallback = (
      <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
         <th className="py-3 px-4 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">Vendor Category</th>
         <td className="py-3 px-4 font-medium text-neutral-900"><span className="text-neutral-500 italic">Not provided</span></td>
      </tr>
   );
   if (!categoryString) return emptyFallback;
   const selectedItems = categoryString.split(',').map(item => item.trim()).filter(Boolean);
   if (selectedItems.length === 0) return emptyFallback;

   // Group items by category
   const grouped: Record<string, string[]> = {};
   const uncategorized: string[] = [];

   selectedItems.forEach(item => {
      let found = false;
      for (const [parentCategory, options] of Object.entries(VENDOR_CATEGORIES)) {
         if (options.includes(item)) {
            if (!grouped[parentCategory]) grouped[parentCategory] = [];
            grouped[parentCategory].push(item);
            found = true;
            break;
         }
      }
      if (!found) uncategorized.push(item);
   });

   return (
      <>
         {Object.entries(grouped).map(([parentCat, items]) => (
            <tr key={parentCat} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
               <th className="py-3 px-4 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">{parentCat}</th>
               <td className="py-3 px-4 font-medium text-neutral-900">
                  <div className="flex flex-wrap gap-1.5">
                     {items.map((item, i) => (
                        <span key={i} className="bg-red-600/10 border border-red-600/30 text-red-600 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item}</span>
                     ))}
                  </div>
               </td>
            </tr>
         ))}
         {uncategorized.length > 0 && (
            <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
               <th className="py-3 px-4 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">Other Categories</th>
               <td className="py-3 px-4 font-medium text-neutral-900">
                  <div className="flex flex-wrap gap-1.5">
                     {uncategorized.map((item, i) => (
                        <span key={i} className="bg-red-600/10 border border-red-600/30 text-red-600 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item}</span>
                     ))}
                  </div>
               </td>
            </tr>
         )}
      </>
   );
};

const Admin: React.FC = () => {
   const { content, updateContent, loading } = useContent();
   const [localContent, setLocalContent] = useState(content);
   const [isAuth, setIsAuth] = useState(() => typeof window !== 'undefined' && sessionStorage.getItem(AUTH_TOKEN_KEY) === 'authenticated');
   const [password, setPassword] = useState('');
   const [vendorPassword, setVendorPassword] = useState('');
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState<'home' | 'divisions' | 'products' | 'gallery' | 'careers' | 'team' | 'media' | 'events' | 'contact' | 'roadmap' | 'timeline'>('home');
   const [galleryMode, setGalleryMode] = useState<'images' | 'videos'>('images');
   const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
   const [isDirty, setIsDirty] = useState(false);
   const [newImageCategory, setNewImageCategory] = useState('');
   const [newVideoCategory, setNewVideoCategory] = useState('');

   // Sync ref
   const hasSyncedRef = useRef(false);

   useEffect(() => {
      const session = sessionStorage.getItem(AUTH_TOKEN_KEY);
      if (session === 'authenticated') {
         setIsAuth(true);
      }
   }, []);

   useEffect(() => {
      if (!loading && content && !hasSyncedRef.current) {
         setLocalContent(content);
         hasSyncedRef.current = true;
         setIsDirty(false);
      }
   }, [loading, content]);

   useEffect(() => {
      if (hasSyncedRef.current) setIsDirty(true);
   }, [localContent]);

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) {
         setIsAuth(true);
         sessionStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
      } else {
         alert('Unauthorized');
      }
   };

   const handleVendorLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (vendorPassword === 'dxnvendor2025') {
         sessionStorage.setItem('dxn_vendor_admin_session', 'authenticated');
         navigate('/admin/vendors');
      } else {
         alert('Unauthorized');
      }
   };

   const handleSave = async () => {
      setSaveStatus('saving');
      const cleanContent = {
         ...localContent,
         products: localContent.products.map(p => ({
            ...p,
            features: Array.isArray(p.features) ? p.features.map(f => f.trim()).filter(f => f !== '') : []
         }))
      };
      await updateContent(cleanContent);
      setIsDirty(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
   };

   if (loading) return null;
   if (!isAuth) return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32" style={{ background: 'radial-gradient(ellipse at top, #171717 0%, #000000 60%)' }}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            
            {/* Main Admin Card */}
            <div className="bg-neutral-900 border border-white/10 p-12 rounded-sm shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative z-10">
                  <div className="text-center mb-10">
                     <Lock className="w-12 h-12 text-red-600 mx-auto mb-6" />
                     <h2 className="text-xl font-black uppercase text-white">Main Admin Suite</h2>
                     <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2">Content & Site Management</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-6">
                     <input type="password" placeholder="CMS Key" className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-red-600 transition-colors" value={password} onChange={e => setPassword(e.target.value)} />
                     <button className="w-full bg-red-600 hover:bg-red-500 text-white py-4 font-black uppercase tracking-widest text-xs transition-colors">Authenticate</button>
                  </form>
               </div>
            </div>

            {/* Vendor Admin Card */}
            <div className="bg-neutral-900 border border-white/10 p-12 rounded-sm shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative z-10">
                  <div className="text-center mb-10">
                     <ShieldCheck className="w-12 h-12 text-indigo-500 mx-auto mb-6" />
                     <h2 className="text-xl font-black uppercase text-white">Vendor Portal</h2>
                     <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2">Procurement Management</p>
                  </div>
                  <form onSubmit={handleVendorLogin} className="space-y-6">
                     <input type="password" placeholder="Procurement Key" className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-indigo-500 transition-colors" value={vendorPassword} onChange={e => setVendorPassword(e.target.value)} />
                     <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 font-black uppercase tracking-widest text-xs transition-colors">Authenticate</button>
                  </form>
               </div>
            </div>

         </div>
      </div>
   );

   return (
      <>
         <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12">
               <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                  <SectionTitle subtitle="Management" title="Content Controller" light />
                  <div className="flex flex-wrap gap-4">

                     <button onClick={() => { setIsAuth(false); sessionStorage.removeItem(AUTH_TOKEN_KEY); }} className="bg-neutral-900 border border-white/10 text-white px-6 py-4 text-xs font-black uppercase tracking-widest">Logout</button>
                     <button onClick={handleSave} className="bg-red-600 text-white px-8 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        {saveStatus === 'saving' ? <RefreshCw className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {saveStatus === 'saving' ? 'Syncing...' : saveStatus === 'success' ? 'Deployed' : 'Deploy Changes'}
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Sidebar */}
                  <div className="lg:col-span-3 flex lg:flex-col gap-6 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">

                     <div className="flex lg:flex-col gap-2 lg:gap-0 lg:space-y-2">
                        <div className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-neutral-600 mb-2 px-2">Content Management</div>
                        {[
                           { id: 'home', label: 'Home Page', icon: Layout },
                           { id: 'divisions', label: 'Divisions', icon: Database },
                           { id: 'team', label: 'Leadership', icon: Users },
                           { id: 'products', label: 'Catalog', icon: Package },
                           { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                           { id: 'events', label: 'Events', icon: Calendar },
                           { id: 'timeline', label: 'Timeline', icon: RefreshCw },
                           { id: 'roadmap', label: 'Roadmap', icon: BarChart3 },
                           { id: 'careers', label: 'Careers', icon: Briefcase },
                           { id: 'contact', label: 'Contact Info', icon: MapPin },
                        ].map((tab) => (
                           <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`shrink-0 snap-start whitespace-nowrap lg:w-full flex items-center justify-between p-4 lg:p-5 text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white'}`}>
                              <div className="flex items-center gap-3 lg:gap-4"><tab.icon className="w-4 h-4" /> {tab.label}</div>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-9 bg-neutral-900 border border-white/5 p-4 md:p-8 lg:p-12">

                     {/* HOME TAB */}
                     {activeTab === 'home' && (
                        <div className="space-y-12">
                           <div>
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Hero Section</h3>
                              <div className="grid gap-6">
                                 <InputGroup label="Main Headline" value={localContent.hero.headline} onChange={(v: string) => setLocalContent({ ...localContent, hero: { ...localContent.hero, headline: v } })} />
                                 <InputGroup label="Subheadline" value={localContent.hero.subheadline} onChange={(v: string) => setLocalContent({ ...localContent, hero: { ...localContent.hero, subheadline: v } })} rows={3} />
                                 <div className="grid grid-cols-2 gap-6">
                                    <InputGroup label="Primary CTA Label" value={localContent.hero.primaryCta} onChange={(v: string) => setLocalContent({ ...localContent, hero: { ...localContent.hero, primaryCta: v } })} />
                                    <InputGroup label="Secondary CTA Label" value={localContent.hero.secondaryCta} onChange={(v: string) => setLocalContent({ ...localContent, hero: { ...localContent.hero, secondaryCta: v } })} />
                                 </div>
                              </div>
                           </div>
                           <div>
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Key Statistics</h3>
                              <div className="grid grid-cols-2 gap-6">
                                 {localContent.stats.map((stat, idx) => (
                                    <div key={stat.id} className="p-4 bg-black border border-white/5">
                                       <InputGroup label={`Stat ${idx + 1} Value`} value={stat.value} onChange={(v: string) => {
                                          const newStats = [...localContent.stats];
                                          newStats[idx] = { ...stat, value: v };
                                          setLocalContent({ ...localContent, stats: newStats });
                                       }} />
                                       <div className="mt-4">
                                          <InputGroup label={`Stat ${idx + 1} Label`} value={stat.label} onChange={(v: string) => {
                                             const newStats = [...localContent.stats];
                                             newStats[idx] = { ...stat, label: v };
                                             setLocalContent({ ...localContent, stats: newStats });
                                          }} />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* DIVISIONS TAB */}
                     {activeTab === 'divisions' && (
                        <div className="space-y-12">
                           <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Manufacturing Divisions</h3>
                           {localContent.divisions.map((div, idx) => (
                              <div key={div.id} className="p-6 bg-black border border-white/5 flex gap-6 items-start">
                                 <div className="shrink-0 w-12 h-12 bg-red-600/10 flex items-center justify-center text-red-600 font-bold border border-red-600/20">{idx + 1}</div>
                                 <div className="flex-grow grid gap-4">
                                    <InputGroup label="Division Name" value={div.name} onChange={(v: string) => {
                                       const newDivs = [...localContent.divisions];
                                       newDivs[idx] = { ...div, name: v };
                                       setLocalContent({ ...localContent, divisions: newDivs });
                                    }} />

                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Division Icon</label>
                                       <select
                                          value={div.icon}
                                          onChange={(e) => {
                                             const newDivs = [...localContent.divisions];
                                             newDivs[idx] = { ...div, icon: e.target.value };
                                             setLocalContent({ ...localContent, divisions: newDivs });
                                          }}
                                          className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-red-600 transition-colors"
                                       >
                                          {Object.keys(ICON_MAP).map(key => (
                                             <option key={key} value={key}>{key}</option>
                                          ))}
                                       </select>
                                    </div>

                                    <InputGroup label="Description" value={div.description} onChange={(v: string) => {
                                       const newDivs = [...localContent.divisions];
                                       newDivs[idx] = { ...div, description: v };
                                       setLocalContent({ ...localContent, divisions: newDivs });
                                    }} rows={2} />
                                    <InputGroup label="Capacity Statement" value={div.capacity} onChange={(v: string) => {
                                       const newDivs = [...localContent.divisions];
                                       newDivs[idx] = { ...div, capacity: v };
                                       setLocalContent({ ...localContent, divisions: newDivs });
                                    }} />
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}

                     {/* TEAM TAB */}
                     {activeTab === 'team' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Leadership Team</h3>
                              <button
                                 onClick={() => {
                                    setLocalContent({ ...localContent, team: [...(localContent.team || []), { name: 'New Member', role: 'Executive Role', image: '', email: '', linkedin: '' }] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {(localContent.team || []).map((member: any, idx: number) => (
                                 <div key={idx} className="p-6 bg-black border border-white/5 flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-neutral-900 shrink-0 overflow-hidden rounded-sm">
                                       {member.image ? <img src={member.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-700"><Users /></div>}
                                    </div>
                                    <div className="flex-grow grid grid-cols-2 gap-4">
                                       <InputGroup label="Full Name" value={member.name} onChange={(v: string) => {
                                          const newTeam = [...(localContent.team || [])];
                                          newTeam[idx] = { ...newTeam[idx], name: v };
                                          setLocalContent({ ...localContent, team: newTeam });
                                       }} />
                                       <InputGroup label="Corporate Role" value={member.role} onChange={(v: string) => {
                                          const newTeam = [...(localContent.team || [])];
                                          newTeam[idx] = { ...newTeam[idx], role: v };
                                          setLocalContent({ ...localContent, team: newTeam });
                                       }} />
                                       <InputGroup label="Email (Optional)" value={member.email} onChange={(v: string) => {
                                          const newTeam = [...(localContent.team || [])];
                                          newTeam[idx] = { ...newTeam[idx], email: v };
                                          setLocalContent({ ...localContent, team: newTeam });
                                       }} />
                                       <InputGroup label="LinkedIn URL (Optional)" value={member.linkedin} onChange={(v: string) => {
                                          const newTeam = [...(localContent.team || [])];
                                          newTeam[idx] = { ...newTeam[idx], linkedin: v };
                                          setLocalContent({ ...localContent, team: newTeam });
                                       }} />
                                       <div className="col-span-2">
                                          <InputGroup label="Profile Image URL" value={member.image} onChange={(v: string) => {
                                             const newTeam = [...(localContent.team || [])];
                                             newTeam[idx] = { ...newTeam[idx], image: v };
                                             setLocalContent({ ...localContent, team: newTeam });
                                          }} />
                                       </div>
                                    </div>
                                    <button onClick={() => {
                                       const newTeam = (localContent.team || []).filter((_, i) => i !== idx);
                                       setLocalContent({ ...localContent, team: newTeam });
                                    }} className="text-neutral-600 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* CATALOG TAB */}
                     {activeTab === 'products' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Product Catalog</h3>
                              <button
                                 onClick={() => {
                                    const newProd: Product = { id: `prod-${Date.now()}`, name: 'New Product', category: 'Nutraceuticals', description: 'Description...', features: [], status: 'Available', image: '' };
                                    setLocalContent({ ...localContent, products: [newProd, ...localContent.products] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {localContent.products.map((prod, idx) => (
                                 <div key={prod.id} className="p-6 bg-black border border-white/5 flex gap-6 items-start group">
                                    <div className="w-24 h-24 bg-neutral-900 shrink-0 overflow-hidden">
                                       {prod.image ? <img src={prod.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-neutral-700"><Package /></div>}
                                    </div>
                                    <div className="flex-grow grid grid-cols-2 gap-4">
                                       <InputGroup label="Product Name" value={prod.name} onChange={(v: string) => {
                                          const newProds = [...localContent.products];
                                          newProds[idx] = { ...prod, name: v };
                                          setLocalContent({ ...localContent, products: newProds });
                                       }} />
                                       <InputGroup label="Category" value={prod.category} onChange={(v: string) => {
                                          const newProds = [...localContent.products];
                                          newProds[idx] = { ...prod, category: v };
                                          setLocalContent({ ...localContent, products: newProds });
                                       }} />
                                       <div className="col-span-2">
                                          <InputGroup label="Description" value={prod.description} onChange={(v: string) => {
                                             const newProds = [...localContent.products];
                                             newProds[idx] = { ...prod, description: v };
                                             setLocalContent({ ...localContent, products: newProds });
                                          }} rows={2} />
                                       </div>
                                       <div className="col-span-2">
                                          <InputGroup
                                             label="Technical Highlights (Comma Separated)"
                                             value={prod.features ? prod.features.join(',') : ''}
                                             onChange={(v: string) => {
                                                const newProds = [...localContent.products];
                                                newProds[idx] = { ...prod, features: v.split(',') };
                                                setLocalContent({ ...localContent, products: newProds });
                                             }}
                                             rows={2}
                                          />
                                       </div>
                                       <InputGroup label="Image URL" value={prod.image} onChange={(v: string) => {
                                          const newProds = [...localContent.products];
                                          newProds[idx] = { ...prod, image: v };
                                          setLocalContent({ ...localContent, products: newProds });
                                       }} />
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Status</label>
                                          <select
                                             value={prod.status}
                                             onChange={(e) => {
                                                const newProds = [...localContent.products];
                                                newProds[idx] = { ...prod, status: e.target.value as any };
                                                setLocalContent({ ...localContent, products: newProds });
                                             }}
                                             className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-red-600"
                                          >
                                             <option value="Available">Available</option>
                                             <option value="Coming Soon">Coming Soon</option>
                                             <option value="Export Only">Export Only</option>
                                          </select>
                                       </div>
                                    </div>
                                    <button
                                       onClick={() => {
                                          const newProds = localContent.products.filter(p => p.id !== prod.id);
                                          setLocalContent({ ...localContent, products: newProds });
                                       }}
                                       className="text-neutral-600 hover:text-red-600 transition-colors"
                                    >
                                       <Trash2 className="w-5 h-5" />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* GALLERY TAB */}
                     {activeTab === 'gallery' && (
                        <div className="space-y-12">
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 mb-6 gap-6">
                              <div className="flex items-center gap-6">
                                 <h3 className="text-xl font-black uppercase tracking-tighter text-white">Media Assets</h3>
                                 <div className="flex bg-neutral-900 border border-white/10 p-1">
                                    <button
                                       onClick={() => setGalleryMode('images')}
                                       className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${galleryMode === 'images' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                                    >
                                       Images
                                    </button>
                                    <button
                                       onClick={() => setGalleryMode('videos')}
                                       className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${galleryMode === 'videos' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                                    >
                                       Videos
                                    </button>
                                 </div>
                              </div>
                              <button
                                 onClick={() => {
                                    if (galleryMode === 'images') {
                                       setLocalContent({ ...localContent, galleryImages: [{ url: '', category: 'Campus', title: 'New Image' }, ...localContent.galleryImages] });
                                    } else {
                                       setLocalContent({ ...localContent, galleryVideos: [{ id: `vid-${Date.now()}`, title: 'New Video', thumbnail: '', duration: '0:00', category: 'Corporate' }, ...(localContent.galleryVideos || [])] });
                                    }
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>

                           {/* Category Management Section */}
                           <div className="bg-neutral-900 border border-white/5 p-6 mb-8">
                              <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
                                 <Tag className="w-4 h-4" /> Category Management
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 {/* Image Categories */}
                                 <div>
                                    <label className="text-[10px] font-bold uppercase text-neutral-400 mb-2 block">Image Categories</label>
                                    <div className="flex gap-2 mb-4">
                                       <input
                                          type="text"
                                          value={newImageCategory}
                                          onChange={(e) => setNewImageCategory(e.target.value)}
                                          placeholder="New Category..."
                                          className="flex-grow bg-black border border-white/10 p-2 text-white text-xs outline-none focus:border-red-600"
                                       />
                                       <button
                                          onClick={() => {
                                             if (newImageCategory.trim()) {
                                                setLocalContent({
                                                   ...localContent,
                                                   imageCategories: [...(localContent.imageCategories || []), newImageCategory.trim()]
                                                });
                                                setNewImageCategory('');
                                             }
                                          }}
                                          className="bg-white/10 hover:bg-white/20 text-white p-2"
                                       >
                                          <Plus className="w-4 h-4" />
                                       </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                       {(localContent.imageCategories || []).map((cat: string) => (
                                          <div key={cat} className="bg-black border border-white/10 px-3 py-1 text-[10px] uppercase font-bold text-neutral-300 flex items-center gap-2 group">
                                             {cat}
                                             <button onClick={() => {
                                                setLocalContent({
                                                   ...localContent,
                                                   imageCategories: localContent.imageCategories.filter((c: string) => c !== cat)
                                                });
                                             }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                          </div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Video Categories */}
                                 <div>
                                    <label className="text-[10px] font-bold uppercase text-neutral-400 mb-2 block">Video Categories</label>
                                    <div className="flex gap-2 mb-4">
                                       <input
                                          type="text"
                                          value={newVideoCategory}
                                          onChange={(e) => setNewVideoCategory(e.target.value)}
                                          placeholder="New Category..."
                                          className="flex-grow bg-black border border-white/10 p-2 text-white text-xs outline-none focus:border-red-600"
                                       />
                                       <button
                                          onClick={() => {
                                             if (newVideoCategory.trim()) {
                                                setLocalContent({
                                                   ...localContent,
                                                   videoCategories: [...(localContent.videoCategories || []), newVideoCategory.trim()]
                                                });
                                                setNewVideoCategory('');
                                             }
                                          }}
                                          className="bg-white/10 hover:bg-white/20 text-white p-2"
                                       >
                                          <Plus className="w-4 h-4" />
                                       </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                       {(localContent.videoCategories || []).map((cat: string) => (
                                          <div key={cat} className="bg-black border border-white/10 px-3 py-1 text-[10px] uppercase font-bold text-neutral-300 flex items-center gap-2 group">
                                             {cat}
                                             <button onClick={() => {
                                                setLocalContent({
                                                   ...localContent,
                                                   videoCategories: (localContent.videoCategories || []).filter((c: string) => c !== cat)
                                                });
                                             }} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Image Gallery Mode */}
                           {galleryMode === 'images' && (
                              <div className="grid grid-cols-2 gap-4">
                                 {localContent.galleryImages.map((img, idx) => (
                                    <div key={idx} className="p-4 bg-black border border-white/5 flex gap-4">
                                       <div className="w-20 h-20 bg-neutral-900 shrink-0">
                                          {img.url ? <img src={img.url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-neutral-700" /></div>}
                                       </div>
                                       <div className="flex-grow space-y-2">
                                          <input
                                             value={img.title}
                                             onChange={(e) => {
                                                const newImgs = [...localContent.galleryImages];
                                                newImgs[idx].title = e.target.value;
                                                setLocalContent({ ...localContent, galleryImages: newImgs });
                                             }}
                                             className="w-full bg-transparent border-b border-white/10 text-white text-xs py-1 outline-none"
                                             placeholder="Title"
                                          />
                                          <input
                                             value={img.url}
                                             onChange={(e) => {
                                                const newImgs = [...localContent.galleryImages];
                                                newImgs[idx].url = e.target.value;
                                                setLocalContent({ ...localContent, galleryImages: newImgs });
                                             }}
                                             className="w-full bg-transparent border-b border-white/10 text-neutral-500 text-[10px] py-1 outline-none"
                                             placeholder="Image URL"
                                          />
                                          <select
                                             value={img.category}
                                             onChange={(e) => {
                                                const newImgs = [...localContent.galleryImages];
                                                newImgs[idx].category = e.target.value;
                                                setLocalContent({ ...localContent, galleryImages: newImgs });
                                             }}
                                             className="bg-black text-[10px] text-red-500 uppercase font-bold outline-none"
                                          >
                                             {(localContent.imageCategories || []).map((c: string) => <option key={c} value={c}>{c}</option>)}
                                          </select>
                                       </div>
                                       <button onClick={() => {
                                          const newImgs = localContent.galleryImages.filter((_, i) => i !== idx);
                                          setLocalContent({ ...localContent, galleryImages: newImgs });
                                       }} className="text-neutral-600 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                 ))}
                              </div>
                           )}

                           {/* Video Gallery Mode */}
                           {galleryMode === 'videos' && (
                              <div className="grid gap-4">
                                 {(localContent.galleryVideos || []).map((vid, idx) => (
                                    <div key={vid.id || idx} className="p-6 bg-black border border-white/5 flex flex-col md:flex-row gap-6 items-start">
                                       <div className="w-32 h-24 bg-neutral-900 shrink-0 relative">
                                          {vid.thumbnail ? <img src={vid.thumbnail} className="w-full h-full object-cover opacity-60" /> : <div className="w-full h-full flex items-center justify-center"><PlayCircle className="text-neutral-700 w-8 h-8" /></div>}
                                       </div>
                                       <div className="flex-grow grid grid-cols-2 gap-4 w-full">
                                          <div className="col-span-2">
                                             <InputGroup label="Video Title" value={vid.title} onChange={(v: string) => {
                                                const newVids = [...(localContent.galleryVideos || [])];
                                                newVids[idx].title = v;
                                                setLocalContent({ ...localContent, galleryVideos: newVids });
                                             }} />
                                          </div>
                                          <InputGroup label="Thumbnail URL" value={vid.thumbnail} onChange={(v: string) => {
                                             const newVids = [...(localContent.galleryVideos || [])];
                                             newVids[idx].thumbnail = v;
                                             setLocalContent({ ...localContent, galleryVideos: newVids });
                                          }} />
                                          <div className="flex gap-4">
                                             <div className="flex-1">
                                                <InputGroup label="Duration (Min)" value={vid.duration} onChange={(v: string) => {
                                                   const newVids = [...(localContent.galleryVideos || [])];
                                                   newVids[idx].duration = v;
                                                   setLocalContent({ ...localContent, galleryVideos: newVids });
                                                }} />
                                             </div>
                                             <div className="flex-1 space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Category</label>
                                                <select
                                                   value={vid.category}
                                                   onChange={(e) => {
                                                      const newVids = [...(localContent.galleryVideos || [])];
                                                      newVids[idx].category = e.target.value;
                                                      setLocalContent({ ...localContent, galleryVideos: newVids });
                                                   }}
                                                   className="w-full bg-black border border-white/10 p-3 text-white text-sm outline-none focus:border-red-600"
                                                >
                                                   {(localContent.videoCategories || []).map((c: string) => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                             </div>
                                          </div>
                                       </div>
                                       <button onClick={() => {
                                          const newVids = (localContent.galleryVideos || []).filter((_, i) => i !== idx);
                                          setLocalContent({ ...localContent, galleryVideos: newVids });
                                       }} className="text-neutral-600 hover:text-red-600 self-center"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     )}

                     {/* EVENTS TAB */}
                     {activeTab === 'events' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Corporate Events</h3>
                              <button
                                 onClick={() => {
                                    setLocalContent({ ...localContent, events: [...(localContent.events || []), { date: 'New Date', title: 'New Event', description: '', category: 'Corporate', image: '' }] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {(localContent.events || []).map((event, idx) => (
                                 <div key={idx} className="p-6 bg-black border border-white/5 flex flex-col gap-4">
                                    <InputGroup label="Event Title" value={event.title} onChange={(v: string) => {
                                       const newEvents = [...(localContent.events || [])];
                                       newEvents[idx].title = v;
                                       setLocalContent({ ...localContent, events: newEvents });
                                    }} />
                                    <div className="grid grid-cols-2 gap-4">
                                       <InputGroup label="Date" value={event.date} onChange={(v: string) => {
                                          const newEvents = [...(localContent.events || [])];
                                          newEvents[idx].date = v;
                                          setLocalContent({ ...localContent, events: newEvents });
                                       }} />
                                       <InputGroup label="Category" value={event.category} onChange={(v: string) => {
                                          const newEvents = [...(localContent.events || [])];
                                          newEvents[idx].category = v;
                                          setLocalContent({ ...localContent, events: newEvents });
                                       }} />
                                    </div>
                                    <InputGroup label="Description" value={event.description} rows={2} onChange={(v: string) => {
                                       const newEvents = [...(localContent.events || [])];
                                       newEvents[idx].description = v;
                                       setLocalContent({ ...localContent, events: newEvents });
                                    }} />
                                    <InputGroup label="Image URL" value={event.image} onChange={(v: string) => {
                                       const newEvents = [...(localContent.events || [])];
                                       newEvents[idx].image = v;
                                       setLocalContent({ ...localContent, events: newEvents });
                                    }} />
                                    <button onClick={() => {
                                       const newEvents = (localContent.events || []).filter((_, i) => i !== idx);
                                       setLocalContent({ ...localContent, events: newEvents });
                                    }} className="self-end text-neutral-600 hover:text-red-600 flex items-center gap-2 text-xs font-bold uppercase"><Trash2 className="w-4 h-4" /> Remove Event</button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* TIMELINE TAB */}
                     {activeTab === 'timeline' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Company Timeline</h3>
                              <button
                                 onClick={() => {
                                    setLocalContent({ ...localContent, timeline: [...(localContent.timeline || []), { year: '2025', title: 'Milestone', description: '' }] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {(localContent.timeline || []).map((item, idx) => (
                                 <div key={idx} className="p-4 bg-black border border-white/5 flex gap-4 items-start">
                                    <div className="w-24">
                                       <InputGroup label="Year" value={item.year} onChange={(v: string) => {
                                          const newTimeline = [...(localContent.timeline || [])];
                                          newTimeline[idx].year = v;
                                          setLocalContent({ ...localContent, timeline: newTimeline });
                                       }} />
                                    </div>
                                    <div className="flex-grow grid gap-4">
                                       <InputGroup label="Milestone Title" value={item.title} onChange={(v: string) => {
                                          const newTimeline = [...(localContent.timeline || [])];
                                          newTimeline[idx].title = v;
                                          setLocalContent({ ...localContent, timeline: newTimeline });
                                       }} />
                                       <InputGroup label="Description" value={item.description} rows={2} onChange={(v: string) => {
                                          const newTimeline = [...(localContent.timeline || [])];
                                          newTimeline[idx].description = v;
                                          setLocalContent({ ...localContent, timeline: newTimeline });
                                       }} />
                                    </div>
                                    <button onClick={() => {
                                       const newTimeline = (localContent.timeline || []).filter((_, i) => i !== idx);
                                       setLocalContent({ ...localContent, timeline: newTimeline });
                                    }} className="text-neutral-600 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'roadmap' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Future Roadmap</h3>
                              <button
                                 onClick={() => {
                                    setLocalContent({ ...localContent, roadmap: [...(localContent.roadmap || []), { year: '2025', title: 'Goal', desc: '' }] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {(localContent.roadmap || []).map((item: any, idx: number) => (
                                 <div key={idx} className="p-4 bg-black border border-white/5 flex gap-4 items-start">
                                    <div className="w-24">
                                       <InputGroup label="Year" value={item.year} onChange={(v: string) => {
                                          const newRoadmap = [...(localContent.roadmap || [])];
                                          newRoadmap[idx].year = v;
                                          setLocalContent({ ...localContent, roadmap: newRoadmap });
                                       }} />
                                    </div>
                                    <div className="flex-grow grid gap-4">
                                       <InputGroup label="Strategic Goal" value={item.title} onChange={(v: string) => {
                                          const newRoadmap = [...(localContent.roadmap || [])];
                                          newRoadmap[idx].title = v;
                                          setLocalContent({ ...localContent, roadmap: newRoadmap });
                                       }} />
                                       <InputGroup label="Details" value={item.desc} rows={2} onChange={(v: string) => {
                                          const newRoadmap = [...(localContent.roadmap || [])];
                                          newRoadmap[idx].desc = v;
                                          setLocalContent({ ...localContent, roadmap: newRoadmap });
                                       }} />
                                    </div>
                                    <button onClick={() => {
                                       const newRoadmap = (localContent.roadmap || []).filter((_, i) => i !== idx);
                                       setLocalContent({ ...localContent, roadmap: newRoadmap });
                                    }} className="text-neutral-600 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'careers' && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center border-b border-white/5 pb-4">
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Job Openings</h3>
                              <button
                                 onClick={() => {
                                    setLocalContent({ ...localContent, jobs: [...(localContent.jobs || []), { role: 'Position', dept: 'Department', loc: 'Siddipet', exp: '0-2 Years' }] });
                                 }}
                                 className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
                              >
                                 <Plus className="w-5 h-5" />
                              </button>
                           </div>
                           <div className="grid gap-4">
                              {(localContent.jobs || []).map((job: any, idx: number) => (
                                 <div key={idx} className="p-6 bg-black border border-white/5 flex flex-col gap-4">
                                    <InputGroup label="Job Role" value={job.role} onChange={(v: string) => {
                                       const newJobs = [...(localContent.jobs || [])];
                                       newJobs[idx].role = v;
                                       setLocalContent({ ...localContent, jobs: newJobs });
                                    }} />
                                    <div className="grid grid-cols-3 gap-4">
                                       <InputGroup label="Department" value={job.dept} onChange={(v: string) => {
                                          const newJobs = [...(localContent.jobs || [])];
                                          newJobs[idx].dept = v;
                                          setLocalContent({ ...localContent, jobs: newJobs });
                                       }} />
                                       <InputGroup label="Location" value={job.loc} onChange={(v: string) => {
                                          const newJobs = [...(localContent.jobs || [])];
                                          newJobs[idx].loc = v;
                                          setLocalContent({ ...localContent, jobs: newJobs });
                                       }} />
                                       <InputGroup label="Experience" value={job.exp} onChange={(v: string) => {
                                          const newJobs = [...(localContent.jobs || [])];
                                          newJobs[idx].exp = v;
                                          setLocalContent({ ...localContent, jobs: newJobs });
                                       }} />
                                    </div>
                                    <button onClick={() => {
                                       const newJobs = (localContent.jobs || []).filter((_, i) => i !== idx);
                                       setLocalContent({ ...localContent, jobs: newJobs });
                                    }} className="self-end text-neutral-600 hover:text-red-600 flex items-center gap-2 text-xs font-bold uppercase"><Trash2 className="w-4 h-4" /> Remove Listing</button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'contact' && (
                        <div className="space-y-12">
                           <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Contact Information</h3>
                           <div className="grid gap-6">
                              <InputGroup label="Official Address" value={localContent.contactInfo.address} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, address: v } })} rows={2} />
                              <div className="grid grid-cols-2 gap-6">
                                 <InputGroup label="Phone Number" value={localContent.contactInfo.phone} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, phone: v } })} />
                                 <InputGroup label="Email Address" value={localContent.contactInfo.email} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, email: v } })} />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <InputGroup label="Work Days" value={localContent.contactInfo.workDays} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, workDays: v } })} />
                                 <InputGroup label="Hours" value={localContent.contactInfo.hours} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, hours: v } })} />
                              </div>
                              <InputGroup label="Map Location Name" value={localContent.contactInfo.mapLocation} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, mapLocation: v } })} />
                              <div className="p-6 bg-black border border-white/5">
                                 <h4 className="text-xs font-bold uppercase text-neutral-500 mb-4">Logistics Section</h4>
                                 <div className="space-y-4">
                                    <InputGroup label="Logistics Title" value={localContent.contactInfo.logisticsTitle} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, logisticsTitle: v } })} />
                                    <InputGroup label="Logistics Text" value={localContent.contactInfo.logisticsText} rows={3} onChange={(v: string) => setLocalContent({ ...localContent, contactInfo: { ...localContent.contactInfo, logisticsText: v } })} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                  </div>
               </div>
            </div>
         </div>


      </>
   );
};

export default Admin;
