
import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Save, Layout, Database, Image as ImageIcon, CheckCircle, Lock, Plus, Trash2, 
  Video, Film, Briefcase, LogOut, Settings, ChevronRight, Tag, RotateCcw, X, 
  Users, FileText, Package, Download, Upload, AlertCircle, AlertTriangle, Truck, RefreshCw, ExternalLink,
  Calendar, Phone, MapPin, BarChart3, PlayCircle
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { ICON_MAP } from '../constants';
import { getVendors, updateVendorStatus } from '../services/FirebaseService';
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
  const [isLoadingVendors, setIsLoadingVendors] = useState(false);
  const [newImageCategory, setNewImageCategory] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('');

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

  if (loading) return null;
  if (!isAuth) return (
     <div className="min-h-screen bg-black flex items-center justify-center p-6">
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
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'home', label: 'Home Page', icon: Layout }, 
              { id: 'divisions', label: 'Divisions', icon: Database }, 
              { id: 'team', label: 'Leadership', icon: Users },
              { id: 'products', label: 'Catalog', icon: Package },
              { id: 'vendors', label: 'Vendors', icon: Truck },
              { id: 'gallery', label: 'Gallery', icon: ImageIcon }, 
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'timeline', label: 'Timeline', icon: RefreshCw },
              { id: 'roadmap', label: 'Roadmap', icon: BarChart3 },
              { id: 'careers', label: 'Careers', icon: Briefcase },
              { id: 'contact', label: 'Contact Info', icon: MapPin },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center justify-between p-5 text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-neutral-900/50 border-white/5 text-neutral-500 hover:text-neutral-300'}`}>
                <div className="flex items-center gap-4"><tab.icon className="w-4 h-4" /> {tab.label}</div>
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
                      <InputGroup label="Main Headline" value={localContent.hero.headline} onChange={(v: string) => setLocalContent({...localContent, hero: {...localContent.hero, headline: v}})} />
                      <InputGroup label="Subheadline" value={localContent.hero.subheadline} onChange={(v: string) => setLocalContent({...localContent, hero: {...localContent.hero, subheadline: v}})} rows={3} />
                      <div className="grid grid-cols-2 gap-6">
                        <InputGroup label="Primary CTA Label" value={localContent.hero.primaryCta} onChange={(v: string) => setLocalContent({...localContent, hero: {...localContent.hero, primaryCta: v}})} />
                        <InputGroup label="Secondary CTA Label" value={localContent.hero.secondaryCta} onChange={(v: string) => setLocalContent({...localContent, hero: {...localContent.hero, secondaryCta: v}})} />
                      </div>
                   </div>
                </div>
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Key Statistics</h3>
                   <div className="grid grid-cols-2 gap-6">
                      {localContent.stats.map((stat, idx) => (
                        <div key={stat.id} className="p-4 bg-black border border-white/5">
                           <InputGroup label={`Stat ${idx+1} Value`} value={stat.value} onChange={(v: string) => {
                              const newStats = [...localContent.stats];
                              newStats[idx] = { ...stat, value: v };
                              setLocalContent({ ...localContent, stats: newStats });
                           }} />
                           <div className="mt-4">
                              <InputGroup label={`Stat ${idx+1} Label`} value={stat.label} onChange={(v: string) => {
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
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">Vendor Management System</h3>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Review entity applications and compliance status</p>
                  </div>
                  <button onClick={fetchVendorData} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors" title="Refresh List">
                    <RefreshCw className={`w-4 h-4 ${isLoadingVendors ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                
                <div className="grid gap-6">
                  {vendors.length === 0 && !isLoadingVendors && <div className="p-12 text-center border border-dashed border-white/10 text-neutral-600 uppercase text-xs">No pending applications</div>}
                  {isLoadingVendors && <div className="p-12 text-center text-neutral-500 uppercase text-xs">Syncing with secure database...</div>}
                  
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="bg-black p-8 border border-white/5 flex flex-col md:flex-row justify-between items-start gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <span className={`px-3 py-1 text-[8px] font-black uppercase border ${vendor.status === 'approved' ? 'border-green-500 text-green-500' : vendor.status === 'rejected' ? 'border-red-900 text-red-900' : 'border-amber-500 text-amber-500'}`}>{vendor.status}</span>
                             <h4 className="text-xl font-black uppercase text-white">{vendor.companyName}</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs">
                             <p><span className="text-neutral-600 uppercase font-black tracking-widest text-[9px]">Email:</span> <span className="text-neutral-300">{vendor.email}</span></p>
                             <p><span className="text-neutral-600 uppercase font-black tracking-widest text-[9px]">Phone:</span> <span className="text-neutral-300">{vendor.phone}</span></p>
                             <p><span className="text-neutral-600 uppercase font-black tracking-widest text-[9px]">Tax ID:</span> <span className="text-neutral-300">{vendor.taxId}</span></p>
                             <p className="col-span-2"><span className="text-neutral-600 uppercase font-black tracking-widest text-[9px]">Specialities:</span> <span className="text-red-500">{Array.isArray(vendor.specialities) ? vendor.specialities.join(', ') : vendor.specialities}</span></p>
                             {vendor.description && (
                               <p className="col-span-2 mt-2 pt-2 border-t border-white/10 text-neutral-500 italic">"{vendor.description}"</p>
                             )}
                             {vendor.documents && vendor.documents.length > 0 && (
                               <div className="col-span-2 mt-4">
                                  <a href={vendor.documents[0].url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 hover:bg-red-600 hover:text-white transition-all rounded-sm text-[9px] font-black uppercase tracking-widest text-neutral-400">
                                    <Download className="w-3 h-3" /> View Profile Doc
                                  </a>
                               </div>
                             )}
                          </div>
                       </div>
                       <div className="flex gap-4">
                          {vendor.status === 'pending' && (
                            <>
                              <button onClick={() => handleApproveVendor(vendor.id)} className="bg-green-600 text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors">Approve</button>
                              <button onClick={() => handleRejectVendor(vendor.id)} className="bg-red-600 text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors">Reject</button>
                            </>
                          )}
                          {(vendor.status === 'approved' || vendor.status === 'rejected') && (
                             <button disabled className="bg-neutral-800 text-neutral-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">Processed</button>
                          )}
                       </div>
                    </div>
                  ))}
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
                                    if(newImageCategory.trim()) {
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
                                    if(newVideoCategory.trim()) {
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
                                       setLocalContent({...localContent, galleryImages: newImgs});
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 text-white text-xs py-1 outline-none" 
                                    placeholder="Title"
                                 />
                                 <input 
                                    value={img.url} 
                                    onChange={(e) => {
                                       const newImgs = [...localContent.galleryImages];
                                       newImgs[idx].url = e.target.value;
                                       setLocalContent({...localContent, galleryImages: newImgs});
                                    }}
                                    className="w-full bg-transparent border-b border-white/10 text-neutral-500 text-[10px] py-1 outline-none" 
                                    placeholder="Image URL"
                                 />
                                 <select 
                                    value={img.category}
                                    onChange={(e) => {
                                       const newImgs = [...localContent.galleryImages];
                                       newImgs[idx].category = e.target.value;
                                       setLocalContent({...localContent, galleryImages: newImgs});
                                    }}
                                    className="bg-black text-[10px] text-red-500 uppercase font-bold outline-none"
                                 >
                                    {(localContent.imageCategories || []).map((c: string) => <option key={c} value={c}>{c}</option>)}
                                 </select>
                              </div>
                              <button onClick={() => {
                                 const newImgs = localContent.galleryImages.filter((_, i) => i !== idx);
                                 setLocalContent({...localContent, galleryImages: newImgs});
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
                                       setLocalContent({...localContent, galleryVideos: newVids});
                                    }} />
                                 </div>
                                 <InputGroup label="Thumbnail URL" value={vid.thumbnail} onChange={(v: string) => {
                                    const newVids = [...(localContent.galleryVideos || [])];
                                    newVids[idx].thumbnail = v;
                                    setLocalContent({...localContent, galleryVideos: newVids});
                                 }} />
                                 <div className="flex gap-4">
                                    <div className="flex-1">
                                       <InputGroup label="Duration (Min)" value={vid.duration} onChange={(v: string) => {
                                          const newVids = [...(localContent.galleryVideos || [])];
                                          newVids[idx].duration = v;
                                          setLocalContent({...localContent, galleryVideos: newVids});
                                       }} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                       <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Category</label>
                                       <select 
                                          value={vid.category} 
                                          onChange={(e) => {
                                             const newVids = [...(localContent.galleryVideos || [])];
                                             newVids[idx].category = e.target.value;
                                             setLocalContent({...localContent, galleryVideos: newVids});
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
                                 setLocalContent({...localContent, galleryVideos: newVids});
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
                        <InputGroup label="Official Address" value={localContent.contactInfo.address} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, address: v}})} rows={2} />
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Phone Number" value={localContent.contactInfo.phone} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, phone: v}})} />
                            <InputGroup label="Email Address" value={localContent.contactInfo.email} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, email: v}})} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Work Days" value={localContent.contactInfo.workDays} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, workDays: v}})} />
                            <InputGroup label="Hours" value={localContent.contactInfo.hours} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, hours: v}})} />
                        </div>
                        <InputGroup label="Map Location Name" value={localContent.contactInfo.mapLocation} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, mapLocation: v}})} />
                        <div className="p-6 bg-black border border-white/5">
                            <h4 className="text-xs font-bold uppercase text-neutral-500 mb-4">Logistics Section</h4>
                            <div className="space-y-4">
                                <InputGroup label="Logistics Title" value={localContent.contactInfo.logisticsTitle} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, logisticsTitle: v}})} />
                                <InputGroup label="Logistics Text" value={localContent.contactInfo.logisticsText} rows={3} onChange={(v: string) => setLocalContent({...localContent, contactInfo: {...localContent.contactInfo, logisticsText: v}})} />
                            </div>
                        </div>
                    </div>
                 </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
