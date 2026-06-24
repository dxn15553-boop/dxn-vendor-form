import React, { useState, useEffect, useRef } from 'react';
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


const categorizeMissingItems = (itemsString: string) => {
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

const DOCUMENT_CATEGORIES: Record<string, string[]> = {
   'Entity Documentation': ['COMPANYREGISTRATION', 'PANCARD', 'GSTCERTIFICATE', 'COMPANYPROFILE', 'ORGCHART', 'CANCELLEDCHEQUE', 'BANKACCOUNTDETAILS'],
   'Statutory Compliance': ['MSMECERTIFICATE', 'PFREGISTRATION', 'ESIREGISTRATION', 'PROFTAXREGISTRATION', 'LABOURLICENSE'],
   'Financial Information': ['AUDITEDFINANCIALS', 'ITRACKNOWLEDGEMENT'],
   'Declarations': ['CONFLICTOFINTEREST', 'ANTIBRIBERY', 'COMPLIANCEDECL', 'BLACKLISTINGDECL', 'CONFIDENTIALITYDECL'],
   'Quality & Business Capability': ['MAJORCUSTOMERLIST', 'CUSTOMERREFERENCES', 'PRODUCTCATALOGUE', 'MANUFACTURINGFACILITY', 'SERVICEINFRASTRUCTURE'],
   'Certifications': ['ISO9001', 'ISO14001', 'ISO45001', 'GMP', 'CE', 'OTHERCERTIFICATIONS']
};

const categorizeDocuments = (docs: { name: string; url: string }[]) => {
   const categorized: Record<string, { name: string; url: string }[]> = {
      'Entity Documentation': [],
      'Statutory Compliance': [],
      'Financial Information': [],
      'Declarations': [],
      'Quality & Business Capability': [],
      'Certifications': [],
      'Other / Uncategorized': []
   };

   docs.forEach(doc => {
      const match = doc.name.match(/^\[(.*?)\]/);
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

const VENDOR_CATEGORIES: Record<string, string[]> = {
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

const renderCategorizedVendorCategory = (categoryString: string) => {
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
   const [isAuth, setIsAuth] = useState(false);
   const [password, setPassword] = useState('');
   const [activeTab, setActiveTab] = useState<'home' | 'divisions' | 'products' | 'gallery' | 'careers' | 'team' | 'media' | 'vendors' | 'events' | 'contact' | 'roadmap' | 'timeline'>('home');
   const [galleryMode, setGalleryMode] = useState<'images' | 'videos'>('images');
   const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
   const [isDirty, setIsDirty] = useState(false);
   const [vendors, setVendors] = useState<any[]>([]);
   const [vendorPage, setVendorPage] = useState(1);
   const VENDORS_PER_PAGE = 5;
   const [isLoadingVendors, setIsLoadingVendors] = useState(false);
   const [selectedVendor, setSelectedVendor] = useState<any | null>(null);
   const [vendorDocs, setVendorDocs] = useState<{ name: string; url: string }[]>([]);
   const [isLoadingDocs, setIsLoadingDocs] = useState(false);
   const [vendorEmailPreview, setVendorEmailPreview] = useState(false);
   const [newImageCategory, setNewImageCategory] = useState('');
   const [newVideoCategory, setNewVideoCategory] = useState('');
   const [vendorSearch, setVendorSearch] = useState('');

   // Sync ref
   const hasSyncedRef = useRef(false);

   useEffect(() => {
      const session = sessionStorage.getItem(AUTH_TOKEN_KEY);
      if (session === 'authenticated') {
         setIsAuth(true);
         fetchVendorData();
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

   const fetchVendorData = async () => {
      setIsLoadingVendors(true);
      try {
         const fbVendors = await getVendors();
         if (fbVendors) {
            setVendors(fbVendors);
         } else {
            const savedVendors = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            setVendors(savedVendors);
         }
      } catch (e) {
         console.warn("Firebase fetch failed, using local storage", e);
         const savedVendors = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
         setVendors(savedVendors);
      } finally {
         setIsLoadingVendors(false);
      }
   };

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) {
         setIsAuth(true);
         sessionStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
         fetchVendorData();
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

   const handleApproveVendor = async (id: any) => {
      const newStatus = 'approved';
      try {
         setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
         if (selectedVendor?.id === id) setSelectedVendor((prev: any) => ({ ...prev, status: newStatus }));
         if (typeof id === 'string') {
            await updateVendorStatus(id, newStatus);
         } else {
            const updated = vendors.map(v => v.id === id ? { ...v, status: newStatus } : v);
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(updated));
         }
      } catch (e) {
         console.error("Update failed", e);
         fetchVendorData();
      }
   };

   const handleRejectVendor = async (id: any) => {
      const newStatus = 'rejected';
      try {
         setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
         if (selectedVendor?.id === id) setSelectedVendor((prev: any) => ({ ...prev, status: newStatus }));
         if (typeof id === 'string') {
            await updateVendorStatus(id, newStatus);
         } else {
            const updated = vendors.map(v => v.id === id ? { ...v, status: newStatus } : v);
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(updated));
         }
      } catch (e) {
         console.error("Update failed", e);
         fetchVendorData();
      }
   };

   const handleViewVendor = async (vendor: any) => {
      setSelectedVendor(vendor);
      setVendorEmailPreview(false);
      setIsLoadingDocs(true);
      try {
         const docs = await getVendorDocuments(String(vendor.id));
         setVendorDocs(docs);
      } catch {
         setVendorDocs([]);
      } finally {
         setIsLoadingDocs(false);
      }
   };

   const filteredVendors = vendors.filter((v: any) => {
      if (!vendorSearch) return true;
      const term = vendorSearch.toLowerCase();
      return (
         (v.company_name || v.companyName || '').toLowerCase().includes(term) ||
         (v.email || '').toLowerCase().includes(term) ||
         (v.pan_number || v.panNumber || '').toLowerCase().includes(term) ||
         (v.phone || '').toLowerCase().includes(term) ||
         (v.gst_number || v.gstNumber || '').toLowerCase().includes(term) ||
         (v.status || '').toLowerCase().includes(term)
      );
   });
   const totalVendorPages = Math.max(1, Math.ceil(filteredVendors.length / VENDORS_PER_PAGE));

   const todayMs = new Date().setHours(0, 0, 0, 0);
   const registeredToday = vendors.filter(v => v.created_at && new Date(v.created_at).setHours(0,0,0,0) === todayMs).length;
   const updatedToday = vendors.filter(v => v.updated_at && new Date(v.updated_at).setHours(0,0,0,0) === todayMs && new Date(v.created_at).setHours(0,0,0,0) !== todayMs).length;
   const fullyCompleted = vendors.filter(v => v.status === 'approved' || (!v.missing_items || v.missing_items.trim().length === 0)).length;
   const underObservation = vendors.filter(v => v.status === 'Observation' || (v.missing_items && v.missing_items.length > 0 && v.status !== 'approved' && v.status !== 'rejected')).length;

   if (loading) return null;
   if (!isAuth) return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
         <div className="max-w-md w-full bg-neutral-900 border border-white/10 p-12 rounded-sm">
            <div className="text-center mb-10"><Lock className="w-12 h-12 text-red-600 mx-auto mb-6" /><h2 className="text-2xl font-black uppercase text-white">Management Suite</h2></div>
            <form onSubmit={handleLogin} className="space-y-6">
               <input type="password" placeholder="Key" className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-red-600" value={password} onChange={e => setPassword(e.target.value)} />
               <button className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-xs">Authenticate</button>
            </form>
         </div>
      </div>
   );

   return (
      <>
      <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <SectionTitle subtitle="Management" title="Content Controller" light />
               <div className="flex gap-4">
                  <button onClick={() => { setIsAuth(false); sessionStorage.removeItem(AUTH_TOKEN_KEY); }} className="bg-neutral-900 border border-white/10 text-white px-6 py-4 text-xs font-black uppercase tracking-widest">Logout</button>
                  <button onClick={handleSave} className="bg-red-600 text-white px-8 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                     {saveStatus === 'saving' ? <RefreshCw className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                     {saveStatus === 'saving' ? 'Syncing...' : saveStatus === 'success' ? 'Deployed' : 'Deploy Changes'}
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Sidebar */}
               <div className="lg:col-span-3 flex lg:flex-col gap-2 lg:gap-0 lg:space-y-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
                  {[
                     { id: 'home', label: 'Home Page', icon: Layout },
                     { id: 'divisions', label: 'Divisions', icon: Database },
                     { id: 'team', label: 'Leadership', icon: Users },
                     { id: 'products', label: 'Catalog', icon: Package },
                     { id: 'vendors', label: 'Vendors', icon: Truck, count: vendors.length },
                     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                     { id: 'events', label: 'Events', icon: Calendar },
                     { id: 'timeline', label: 'Timeline', icon: RefreshCw },
                     { id: 'roadmap', label: 'Roadmap', icon: BarChart3 },
                     { id: 'careers', label: 'Careers', icon: Briefcase },
                     { id: 'contact', label: 'Contact Info', icon: MapPin },
                  ].map((tab) => (
                     <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`shrink-0 snap-start whitespace-nowrap lg:w-full flex items-center justify-between p-4 lg:p-5 text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white'}`}>
                        <div className="flex items-center gap-3 lg:gap-4"><tab.icon className="w-4 h-4" /> {tab.label}</div>
                        {tab.count !== undefined && (
                           <span className={`ml-3 px-2 py-0.5 rounded text-[9px] ${activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-white/5 text-neutral-500'}`}>
                              {tab.count}
                           </span>
                        )}
                     </button>
                  ))}
               </div>

               {/* Main Content */}
               <div className="lg:col-span-9 bg-neutral-900 border border-white/5 p-12">

                  {/* HOME TAB */}
                  {activeTab === 'home' && (
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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

                  {/* VENDORS TAB */}
                  {activeTab === 'vendors' && (
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
                           <div>
                              <div className="flex items-center gap-3">
                                 <h3 className="text-xl font-black uppercase tracking-tighter text-white">Vendor Management System</h3>
                                 {!isLoadingVendors && (
                                    <span className="bg-red-600/20 text-red-500 border border-red-600/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                                       {vendors.length} Total
                                    </span>
                                 )}
                              </div>
                              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Review entity applications and compliance status</p>
                           </div>
                           <div className="flex items-center gap-4 w-full md:w-auto">
                              <div className="relative flex-grow md:flex-grow-0">
                                 <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                 <input
                                    type="text"
                                    placeholder="Search vendors..."
                                    value={vendorSearch}
                                    onChange={(e) => {
                                       setVendorSearch(e.target.value);
                                       setVendorPage(1);
                                    }}
                                    className="bg-black border border-white text-white pl-10 pr-4 py-2 text-xs outline-none focus:border-red-600 transition-colors w-full md:w-64"
                                 />
                                 {vendorSearch && (
                                    <button onClick={() => { setVendorSearch(''); setVendorPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                                       <X className="w-3 h-3" />
                                    </button>
                                 )}
                              </div>
                              <button onClick={fetchVendorData} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full shrink-0 transition-colors" title="Refresh List">
                                 <RefreshCw className={`w-4 h-4 ${isLoadingVendors ? 'animate-spin' : ''}`} />
                              </button>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                           <div className="bg-black border border-white/5 p-4 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                 <Plus className="w-4 h-4 text-neutral-500" />
                                 <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Registered Today</p>
                              </div>
                              <p className="text-3xl font-black text-white">{registeredToday}</p>
                           </div>
                           <div className="bg-black border border-white/5 p-4 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                 <RefreshCw className="w-4 h-4 text-blue-500" />
                                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Updated Today</p>
                              </div>
                              <p className="text-3xl font-black text-white">{updatedToday}</p>
                           </div>
                           <div className="bg-black border border-white/5 p-4 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                 <CheckCircle className="w-4 h-4 text-green-500" />
                                 <p className="text-[10px] font-black uppercase tracking-widest text-green-500">Fully Completed</p>
                              </div>
                              <p className="text-3xl font-black text-white">{fullyCompleted}</p>
                           </div>
                           <div className="bg-black border border-red-900/30 p-4 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                 <AlertCircle className="w-4 h-4 text-red-500" />
                                 <p className="text-[10px] font-black uppercase tracking-widest text-red-500">Under Observation</p>
                              </div>
                              <p className="text-3xl font-black text-red-500">{underObservation}</p>
                           </div>
                        </div>

                        <div className="grid gap-4">
                           {vendors.length === 0 && !isLoadingVendors && <div className="p-12 text-center border border-dashed border-white/10 text-neutral-600 uppercase text-xs">No pending applications</div>}
    {vendors.length > 0 && filteredVendors.length === 0 && <div className="p-12 text-center border border-dashed border-white/10 text-neutral-600 uppercase text-xs">No vendors match your search</div>}
                           {isLoadingVendors && <div className="p-12 text-center text-neutral-500 uppercase text-xs">Syncing with secure database...</div>}

                           {filteredVendors.slice((vendorPage - 1) * VENDORS_PER_PAGE, vendorPage * VENDORS_PER_PAGE).map((vendor) => (
                              <div key={vendor.id} className="bg-black p-6 border border-white/5 flex flex-col md:flex-row justify-between items-start gap-6 hover:border-white/10 transition-all">
                                 <div className="space-y-4 md:space-y-3 flex-grow w-full md:w-auto">
                                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                                       <span className={`shrink-0 px-3 py-1 text-[8px] font-black uppercase border ${vendor.status === 'approved' ? 'border-green-500 text-green-500' : vendor.status === 'rejected' ? 'border-red-900 text-red-900' : 'border-amber-500 text-amber-500'}`}>{vendor.status || 'pending'}</span>
                                       <h4 className="text-lg font-black uppercase text-white">{vendor.company_name || vendor.companyName}</h4>
                                    </div>
                                    <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-1 text-xs mt-2 md:mt-0">
                                       <p className="flex flex-col sm:block gap-0.5"><span className="text-neutral-400 uppercase font-black tracking-widest text-[9px] mr-1">Email: </span><span className="text-neutral-300 break-all sm:break-normal">{vendor.email}</span></p>
                                       <p className="flex flex-col sm:block gap-0.5"><span className="text-neutral-400 uppercase font-black tracking-widest text-[9px] mr-1">Phone: </span><span className="text-neutral-300">{vendor.phone}</span></p>
                                       <p className="flex flex-col sm:block gap-0.5"><span className="text-neutral-400 uppercase font-black tracking-widest text-[9px] mr-1">PAN: </span><span className="text-neutral-300">{vendor.pan_number || vendor.panNumber || '—'}</span></p>
                                       <p className="flex flex-col sm:block gap-0.5"><span className="text-neutral-400 uppercase font-black tracking-widest text-[9px] mr-1">GST: </span><span className="text-neutral-300">{vendor.gst_number || vendor.gstNumber || '—'}</span></p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                    <button
                                       onClick={() => handleViewVendor(vendor)}
                                       className="w-full md:w-auto justify-center bg-white/5 border border-white/10 text-white px-5 py-3 md:py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2"
                                    >
                                       <FileText className="w-3.5 h-3.5" /> View Details
                                    </button>
                                    {vendor.status === 'pending' && (
                                       <>
                                          <button onClick={() => handleApproveVendor(vendor.id)} className="bg-green-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors">Approve</button>
                                          <button onClick={() => handleRejectVendor(vendor.id)} className="bg-red-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors">Reject</button>
                                       </>
                                    )}
                                    {(vendor.status === 'approved' || vendor.status === 'rejected') && (
                                       <button disabled className="bg-neutral-800 text-neutral-500 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">Processed</button>
                                    )}
                                 </div>
                              </div>
                           ))}

                           {filteredVendors.length > VENDORS_PER_PAGE && (
                              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                                 <button
                                    onClick={() => setVendorPage(prev => Math.max(prev - 1, 1))}
                                    disabled={vendorPage === 1}
                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${vendorPage === 1 ? 'text-neutral-600 bg-white/5 cursor-not-allowed' : 'text-white bg-white/10 hover:bg-white/20'}`}
                                 >
                                    Previous
                                 </button>
                                 <span className="text-neutral-400 text-xs font-bold">
                                    Page {vendorPage} of {totalVendorPages}
                                 </span>
                                 <button
                                    onClick={() => setVendorPage(prev => Math.min(prev + 1, totalVendorPages))}
                                    disabled={vendorPage === totalVendorPages}
                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${vendorPage === totalVendorPages ? 'text-neutral-600 bg-white/5 cursor-not-allowed' : 'text-white bg-white/10 hover:bg-white/20'}`}
                                 >
                                    Next
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                  )}

                  {/* GALLERY TAB */}
                  {activeTab === 'gallery' && (
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
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
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
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

      {/* ======= VENDOR DETAIL MODAL ======= */}
      {selectedVendor && (
         <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-5 bg-neutral-900 border-b border-white/10 shrink-0">
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => setSelectedVendor(null)}
                     className="text-neutral-500 hover:text-white p-2 hover:bg-white/5 rounded transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>
                  <div>
                     <h2 className="text-white font-black uppercase tracking-tight text-lg">{selectedVendor.company_name || selectedVendor.companyName}</h2>
                     <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Application ID: #{selectedVendor.id}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 text-[8px] font-black uppercase border ${
                     selectedVendor.status === 'approved' ? 'border-green-500 text-green-500 bg-green-500/5' :
                     selectedVendor.status === 'rejected' ? 'border-red-700 text-red-700 bg-red-700/5' :
                     'border-amber-500 text-amber-500 bg-amber-500/5'
                  }`}>{selectedVendor.status || 'pending'}</span>
               </div>
               <div className="flex items-center gap-3">
                  <button
                     onClick={() => setVendorEmailPreview(p => !p)}
                     className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all ${vendorEmailPreview ? 'bg-red-600 border-red-600 text-white' : 'border-white/20 text-neutral-400 hover:text-white hover:bg-white/5'}`}
                  >
                     <Mail className="w-3.5 h-3.5" /> {vendorEmailPreview ? 'Hide Email Preview' : 'Email Preview'}
                  </button>
                  <button
                     onClick={() => window.print()}
                     className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-white/20 text-neutral-400 hover:text-white hover:bg-white/5 transition-all print:hidden"
                  >
                     <Download className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  {selectedVendor.status === 'pending' && (
                     <>
                        <button onClick={() => handleApproveVendor(selectedVendor.id)} className="bg-green-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors">Approve</button>
                        <button onClick={() => handleRejectVendor(selectedVendor.id)} className="bg-red-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors">Reject</button>
                     </>
                  )}
               </div>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto">
               <div className="max-w-5xl mx-auto px-8 py-10 space-y-6">

                  {/* Email Preview Panel */}
                  {vendorEmailPreview && (
                     <div className="bg-white shadow-sm border border-neutral-200 rounded-sm overflow-hidden">
                        <div className="px-6 py-4 bg-white border-b border-neutral-200 flex items-center gap-3">
                           <Mail className="w-4 h-4 text-red-500" />
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs">Gmail Notification Preview — Exact Content Sent to Vendor</h3>
                        </div>
                        <div className="p-8 font-mono text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-neutral-50">
{`Dear ${selectedVendor.contact_person || selectedVendor.authorizedPerson || 'Vendor'},

Thank you for submitting your vendor registration with DXN India Manufacturing.

Your application has been received and is currently under review by our procurement team.

──────────────────────────────────
APPLICATION SUMMARY
──────────────────────────────────
Application ID   : #${selectedVendor.id}
Company Name     : ${selectedVendor.company_name || selectedVendor.companyName || '—'}
Contact Person   : ${selectedVendor.contact_person || selectedVendor.authorizedPerson || '—'}
Email            : ${selectedVendor.email || '—'}
Phone            : ${selectedVendor.phone || '—'}
Escalation Ctct  : ${selectedVendor.escalation_contact || selectedVendor.escContact || '—'}
PAN Number       : ${selectedVendor.pan_number || selectedVendor.panNumber || '—'}
GST Number       : ${selectedVendor.gst_number || selectedVendor.gstNumber || '—'}

Vendor Category  : ${selectedVendor.vendor_category || selectedVendor.categories?.join(', ') || '—'}
Service Caps     : ${selectedVendor.service_capabilities || selectedVendor.serviceCapabilities?.join(', ') || '—'}
OEM Brands       : ${selectedVendor.oem_brands || selectedVendor.oemBrands?.join(', ') || '—'}
Specialities     : ${selectedVendor.specialities || '—'}
Tech Team Str.   : ${selectedVendor.tech_team_strength || selectedVendor.techTeamStrength || '—'}
Installed Base   : ${selectedVendor.installed_base || selectedVendor.installedBase || '—'}

Facility Overview:
${selectedVendor.facility_description || selectedVendor.description || '—'}

Submission Status: ${selectedVendor.status?.toUpperCase() || 'PENDING'}
${selectedVendor.missing_items ? `Missing Items    : ${selectedVendor.missing_items}` : ''}
──────────────────────────────────

Our team will review your application and contact you within 7-10 business days.

For any queries, please contact: procurement@dxnindia.com

Warm Regards,
DXN India Manufacturing — Procurement Team
Global Flagship Hub, Siddipet, Telangana`}
                        </div>
                     </div>
                  )}

                  {/* Main Unified Table Container */}
                  <div className="bg-white shadow-xl rounded-sm border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                  {/* Submission Status */}
                  <div className="bg-white p-8 flex flex-row items-center justify-center gap-6 border-b border-neutral-200">
                     <h3 className="text-neutral-900 font-black uppercase tracking-widest text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-500" /> Application Status:</h3>
                     <span className={`inline-block px-5 py-2 text-sm font-black uppercase border-2 ${
                        selectedVendor.status === 'approved' ? 'border-green-500 text-green-600 bg-green-50' :
                        selectedVendor.status === 'rejected' ? 'border-red-700 text-red-700 bg-red-50' :
                        'border-amber-500 text-amber-600 bg-amber-50'
                     }`}>{selectedVendor.status || 'Pending Review'}</span>
                  </div>

                  {/* Registration Info Grid */}
                  

                     {/* Company & Contact Info */}
                     <details open className="group bg-white">
                        <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Building className="w-3.5 h-3.5 text-red-500" /> Company & Contact Info</h3>
                           <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                        </summary>
                        <div className="p-5 pt-4">
                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse text-sm text-neutral-700">
                              <tbody>
                                 {[
                                    { label: 'Company Legal Name', value: selectedVendor.company_name || selectedVendor.companyName },
                                    { label: 'Authorized Contact Person', value: selectedVendor.contact_person || selectedVendor.authorizedPerson },
                                    { label: 'Email Address', value: selectedVendor.email },
                                    { label: 'Mobile Number', value: selectedVendor.phone },
                                    { label: 'Escalation Contact', value: selectedVendor.escalation_contact || selectedVendor.escContact },
                                    { label: 'PAN Number', value: selectedVendor.pan_number || selectedVendor.panNumber },
                                    { label: 'GST Number', value: selectedVendor.gst_number || selectedVendor.gstNumber },
                                    { label: 'Applied On', value: selectedVendor.created_at ? new Date(selectedVendor.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }) : '—' },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                                       <th className="py-3 px-4 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-4 font-medium text-neutral-900">{value || <span className="text-neutral-500 italic">Not provided</span>}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                        </div>
                     </details>

                     {/* Business Details */}
                     <details open className="group bg-white">
                        <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-red-500" /> Business Details</h3>
                           <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                        </summary>
                        <div className="p-5 pt-4">
                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse text-sm text-neutral-700">
                              <tbody>
                                 {renderCategorizedVendorCategory(selectedVendor.vendor_category || selectedVendor.categories?.join(', ') || '')}
                                 {/* Other Business Details */}
                                 {[
                                    { label: 'Service Capabilities', value: selectedVendor.service_capabilities || selectedVendor.serviceCapabilities?.join(', ') },
                                    { label: 'OEM Brands', value: selectedVendor.oem_brands || selectedVendor.oemBrands?.filter(Boolean).join(', ') },
                                    { label: 'Specialities', value: selectedVendor.specialities },
                                    { label: 'Technical Team Strength', value: selectedVendor.tech_team_strength || selectedVendor.techTeamStrength },
                                    { label: 'Installed Base Details', value: selectedVendor.installed_base || selectedVendor.installedBase },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                                       <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-2 font-medium text-neutral-900">
                                          {label === 'Service Capabilities' ? (
                                             <div className="flex flex-wrap gap-1.5">
                                                {(value || '').split(',').filter(Boolean).map((item, i) => (
                                                   <span key={i} className="bg-white/5 border border-neutral-200 text-neutral-700 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item.trim()}</span>
                                                ))}
                                             </div>
                                          ) : (
                                             value || <span className="text-neutral-500 italic">Not provided</span>
                                          )}
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                        </div>
                     </details>

                  {/* Facility Overview */}
                  <details open className="group bg-white">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-red-500" /> Facility Capabilities Overview</h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-5 pt-4">
                     <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-wrap">{selectedVendor.facility_description || selectedVendor.description || <span className="text-neutral-500 italic">No description provided.</span>}</p>
                  </div>
                  </details>

                  {/* Observations / Missing Items */}
                  {selectedVendor.missing_items && (
                     <div className="bg-amber-50 border-l-4 border-l-amber-500 p-6">
                        <h3 className="text-black font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Action Required: Missing / Observation Items</h3>
                        <div className="mt-4 border border-amber-200 shadow-sm rounded-sm divide-y divide-amber-200">
                           {Object.entries(categorizeMissingItems(selectedVendor.missing_items)).map(([cat, items]) => {
                              if (items.length === 0) return null;
                              return (
                                 <details key={cat} open className="group bg-white/50">
                                    <summary className="bg-amber-100/80 py-3 px-4 font-black uppercase text-[10px] tracking-widest text-amber-900 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-amber-100 [&::-webkit-details-marker]:hidden">
                                       {cat}
                                       <ChevronDown className="w-4 h-4 text-amber-700 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="p-0 border-t border-amber-200">
                                       <table className="w-full text-left border-collapse text-sm">
                                          <tbody>
                                             {items.map((item, i) => (
                                                <tr key={i} className="border-b border-amber-100 last:border-0 hover:bg-amber-50 transition-colors">
                                                   <td className="py-3 px-4 font-bold text-amber-900 flex items-start gap-3">
                                                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                                      <span>{item}</span>
                                                   </td>
                                                </tr>
                                             ))}
                                          </tbody>
                                       </table>
                                    </div>
                                 </details>
                              );
                           })}
                        </div>
                     </div>
                  )}
                  {!selectedVendor.missing_items && (
                     <div className="bg-green-50 border-l-4 border-l-green-500 p-6">
                        <h3 className="text-black font-black uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Status Complete</h3>
                        <p className="text-green-800 text-sm font-bold">All required forms and documents have been successfully submitted.</p>
                     </div>
                  )}

                  {/* Categorized Uploaded Documents */}
                  {isLoadingDocs ? (
                     <div className="p-8 text-center text-neutral-500 text-xs uppercase tracking-widest flex flex-col items-center gap-3 bg-white"><RefreshCw className="w-5 h-5 animate-spin text-red-500" /> Fetching documents...</div>
                  ) : vendorDocs.length === 0 ? (
                     <div className="p-8 text-center text-neutral-500 text-xs italic bg-white">No documents found in storage. Documents from new registrations are automatically uploaded.</div>
                  ) : (
                     Object.entries(categorizeDocuments(vendorDocs)).map(([catName, docs]) => {
                        if (docs.length === 0) return null;
                        return (
                           <details key={catName} open className="group bg-white">
                              <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                                 <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Upload className="w-3.5 h-3.5 text-red-500" /> {catName}</h3>
                                 <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                              </summary>
                              <div className="p-5 pt-4">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {docs.map((doc) => (
                                       <a
                                          key={doc.name}
                                          href={doc.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-3 bg-white border border-neutral-200 px-4 py-3 hover:border-red-600 hover:bg-red-600/5 transition-all group shadow-sm rounded-sm"
                                       >
                                          <FileText className="w-4 h-4 text-red-500 shrink-0" />
                                          <span className="text-neutral-700 text-[10px] font-bold uppercase truncate group-hover:text-neutral-900 transition-colors" title={doc.name.replace(/^\[.*?\]\s*(.*\s*-\s*)?/, '')}>{doc.name.replace(/^\[.*?\]\s*(.*\s*-\s*)?/, '')}</span>
                                          <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-neutral-900 ml-auto shrink-0" />
                                       </a>
                                    ))}
                                 </div>
                              </div>
                           </details>
                        );
                     })
                  )}
                  </div>
               </div>
            </div>
          </div>
      )}
      </>
   );
};

export default Admin;
