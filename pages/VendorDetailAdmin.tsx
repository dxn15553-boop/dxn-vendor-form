import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
   X, Download, Mail, ChevronDown, CheckCircle, AlertTriangle, FileText, Upload,
   ExternalLink, RefreshCw, AlertCircle, Building, Briefcase, ArrowLeft, Lock
} from 'lucide-react';
import { getVendorById, updateVendorStatus, getVendorDocuments } from '../services/SupabaseService';
import {
   categorizeMissingItems,
   categorizeDocuments,
   VENDOR_CATEGORIES
} from './Admin';

const ADMIN_PASSWORD = 'dxn2025';
const AUTH_TOKEN_KEY = 'dxn_admin_auth_session';

const VendorDetailAdmin: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [isAuth, setIsAuth] = useState(false);
   const [password, setPassword] = useState('');
   const [vendor, setVendor] = useState<any | null>(null);
   const [vendorDocs, setVendorDocs] = useState<{ name: string; url: string; created_at?: string }[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingDocs, setIsLoadingDocs] = useState(false);
   const [vendorEmailPreview, setVendorEmailPreview] = useState(false);

   useEffect(() => {
      const session = sessionStorage.getItem(AUTH_TOKEN_KEY);
      if (session === 'authenticated') {
         setIsAuth(true);
      } else {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      if (isAuth && id) {
         fetchVendorDetail();
      }
   }, [isAuth, id]);

   const fetchVendorDetail = async () => {
      setIsLoading(true);
      try {
         const data = await getVendorById(id!);
         if (data) {
            setVendor(data);
            await fetchDocuments(data.id);
         } else {
            // Local fallback
            const savedVendors = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            const localVendor = savedVendors.find((v: any) => String(v.id) === String(id));
            if (localVendor) {
               setVendor(localVendor);
            }
         }
      } catch (err) {
         console.error("Failed to load vendor details:", err);
      } finally {
         setIsLoading(false);
      }
   };

   const fetchDocuments = async (vendorId: any) => {
      setIsLoadingDocs(true);
      try {
         const docs = await getVendorDocuments(String(vendorId));
         setVendorDocs(docs);
      } catch (err) {
         console.error("Failed to load vendor documents:", err);
         setVendorDocs([]);
      } finally {
         setIsLoadingDocs(false);
      }
   };

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) {
         setIsAuth(true);
         sessionStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
      } else {
         alert('Unauthorized');
      }
   };

   const handleApproveVendor = async (vendorId: any) => {
      const newStatus = 'approved';
      try {
         setVendor((prev: any) => prev ? { ...prev, status: newStatus } : null);
         if (typeof vendorId === 'string' || isNaN(Number(vendorId))) {
            await updateVendorStatus(String(vendorId), newStatus);
         } else {
            const savedVendors = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            const updated = savedVendors.map((v: any) => v.id === vendorId ? { ...v, status: newStatus } : v);
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(updated));
         }
      } catch (e) {
         console.error("Update failed", e);
         fetchVendorDetail();
      }
   };

   const handleRejectVendor = async (vendorId: any) => {
      const newStatus = 'rejected';
      try {
         setVendor((prev: any) => prev ? { ...prev, status: newStatus } : null);
         if (typeof vendorId === 'string' || isNaN(Number(vendorId))) {
            await updateVendorStatus(String(vendorId), newStatus);
         } else {
            const savedVendors = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            const updated = savedVendors.map((v: any) => v.id === vendorId ? { ...v, status: newStatus } : v);
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(updated));
         }
      } catch (e) {
         console.error("Update failed", e);
         fetchVendorDetail();
      }
   };

   const renderLocalCategories = (categoryString: string) => {
      const emptyFallback = (
         <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
            <th className="py-6 px-6 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">Vendor Category</th>
            <td className="py-6 px-6 font-medium text-neutral-900"><span className="text-neutral-500 italic">Not provided</span></td>
         </tr>
      );
      if (!categoryString) return emptyFallback;
      const selectedItems = categoryString.split(',').map(item => item.trim()).filter(Boolean);
      if (selectedItems.length === 0) return emptyFallback;

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
               <tr key={parentCat} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                  <th className="py-6 px-6 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">{parentCat}</th>
                  <td className="py-6 px-6 font-medium">
                     <div className="flex flex-wrap gap-2">
                        {items.map((item, i) => (
                           <span key={i} className="bg-red-50 border border-red-200 text-red-600 px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm">{item}</span>
                        ))}
                     </div>
                  </td>
               </tr>
            ))}
            {uncategorized.length > 0 && (
               <tr className="hover:bg-neutral-50/50 transition-colors">
                  <th className="py-6 px-6 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">Other Categories</th>
                  <td className="py-6 px-6 font-medium">
                     <div className="flex flex-wrap gap-2">
                        {uncategorized.map((item, i) => (
                           <span key={i} className="bg-red-50 border border-red-200 text-red-600 px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm">{item}</span>
                        ))}
                     </div>
                  </td>
               </tr>
            )}
         </>
      );
   };

   if (!isAuth) return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
         <div className="max-w-md w-full bg-neutral-900 border border-white/10 p-12 rounded-sm shadow-2xl">
            <div className="text-center mb-10">
               <Lock className="w-12 h-12 text-red-600 mx-auto mb-6 animate-pulse" />
               <h2 className="text-2xl font-black uppercase text-white tracking-widest">Management Suite</h2>
               <p className="text-neutral-500 text-xs mt-2 uppercase tracking-wide">Security Validation</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
               <input
                  type="password"
                  placeholder="Enter Security Key"
                  className="w-full bg-black border border-white/10 p-4 text-white text-center tracking-widest outline-none focus:border-red-600 transition-colors"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
               />
               <button className="w-full bg-red-600 hover:bg-red-500 text-white py-4 font-black uppercase tracking-widest text-xs transition-colors">
                  Authenticate
               </button>
            </form>
         </div>
      </div>
   );

   if (isLoading) return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center p-6">
         <RefreshCw className="w-10 h-10 text-red-600 animate-spin mb-4" />
         <p className="text-neutral-550 text-xs font-black uppercase tracking-widest">Loading application details...</p>
      </div>
   );

   if (!vendor) return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center p-6 pt-32">
         <AlertTriangle className="w-16 h-16 text-red-600 mb-6" />
         <h2 className="text-2xl font-black text-white uppercase tracking-widest">Vendor Profile Not Found</h2>
         <p className="text-neutral-500 text-sm mt-2 max-w-sm">The vendor application ID matches no records in our database.</p>
         <Link to="/admin/vendors" className="mt-8 bg-red-600 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-colors">
            Back to Dashboard
         </Link>
      </div>
   );

   const statusLower = (vendor.status || '').toLowerCase();
   const isApproved = ['approved', 'complete'].includes(statusLower);
   const isRejected = statusLower === 'rejected';

   return (
      <div className="pt-32 pb-24 bg-neutral-950 min-h-screen">
         <div className="max-w-5xl mx-auto px-4 md:px-6">

            {/* Navigation back */}
            <div className="mb-8 print:hidden">
               <Link to="/admin/vendors" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4 text-red-600" /> Back to Vendor Dashboard
               </Link>
            </div>

            {/* Main Details Panel matching the screenshot exact format */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">

               {/* Modal Header actions */}
               <div className="flex flex-col md:flex-row md:items-center justify-end px-6 py-4 bg-white border-b border-neutral-100 gap-4 print:hidden">
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                     <button
                        onClick={() => setVendorEmailPreview(p => !p)}
                        className={`flex-grow md:flex-grow-0 justify-center flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all ${vendorEmailPreview ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
                     >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span>{vendorEmailPreview ? 'Hide Preview' : 'Email Preview'}</span>
                     </button>
                     <button
                        onClick={() => window.print()}
                        className="flex-grow md:flex-grow-0 justify-center flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all"
                     >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>Save PDF</span>
                     </button>
                     {statusLower === 'pending' && (
                        <>
                           <button
                              onClick={() => handleApproveVendor(vendor.id)}
                              className="flex-grow md:flex-grow-0 justify-center bg-green-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors"
                           >
                              Approve
                           </button>
                           <button
                              onClick={() => handleRejectVendor(vendor.id)}
                              className="flex-grow md:flex-grow-0 justify-center bg-red-700 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
                           >
                              Reject
                           </button>
                        </>
                     )}
                  </div>
               </div>

               {/* Email Preview Panel */}
               {vendorEmailPreview && (
                  <div className="bg-white border-b border-neutral-200">
                     <div className="px-6 py-4 bg-neutral-50 flex items-center gap-3">
                        <Mail className="w-4 h-4 text-red-600" />
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs">Notification Preview — Email Sent to Vendor</h3>
                     </div>
                     <div className="p-8 font-mono text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-white select-all">
                        {`Dear ${vendor.contact_person || vendor.authorizedPerson || 'Vendor'},\n\nThank you for submitting your vendor registration with DXN India Manufacturing...`}
                     </div>
                  </div>
               )}

               {/* Application Status Banner exactly as screenshot */}
               <div className="p-8 flex flex-row items-center justify-center gap-4 border-b border-neutral-200 bg-white">
                  <h3 className="text-neutral-900 font-black uppercase tracking-widest text-sm flex items-center gap-2">
                     <AlertCircle className="w-5 h-5 text-red-500" /> APPLICATION STATUS:
                  </h3>
                  <span className={`inline-block px-6 py-2.5 text-xs font-black uppercase border-2 rounded-sm ${isApproved ? 'border-green-500 text-green-600' :
                        isRejected ? 'border-red-600 text-red-600' :
                           'border-amber-500 text-amber-500'
                     }`}>
                     {vendor.status === 'pending' ? 'OBSERVATION' : (vendor.status || 'OBSERVATION')}
                  </span>
               </div>

               <div className="divide-y divide-neutral-200">
                  {/* Company & Contact Info matching screenshot */}
                  <details open className="group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                           <Building className="w-4 h-4 text-red-500" /> COMPANY &amp; CONTACT INFO
                        </h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-0 border-b border-neutral-200">
                        <table className="w-full text-left border-collapse">
                           <tbody>
                              {[
                                 { label: 'COMPANY LEGAL NAME', value: vendor.company_name || vendor.companyName },
                                 { label: 'AUTHORIZED CONTACT PERSON', value: vendor.contact_person || vendor.authorizedPerson },
                                 { label: 'EMAIL ADDRESS', value: vendor.email },
                                 { label: 'MOBILE NUMBER', value: vendor.phone },
                                 { label: 'ESCALATION CONTACT', value: vendor.escalation_contact || vendor.escContact },
                                 { label: 'PAN NUMBER', value: vendor.pan_number || vendor.panNumber },
                                 { label: 'GST NUMBER', value: vendor.gst_number || vendor.gstNumber },
                                 { label: 'APPLIED ON', value: vendor.created_at ? new Date(vendor.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }) : '—' },
                              ].map(({ label, value }) => (
                                 <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                                    <th className="py-6 px-6 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">{label}</th>
                                    <td className="py-6 px-6 font-medium text-neutral-900">{value || <span className="text-neutral-400 italic">Not provided</span>}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </details>

                  {/* Business Details matching screenshot */}
                  <details open className="group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                           <Briefcase className="w-4 h-4 text-red-500" /> BUSINESS DETAILS
                        </h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-0 border-b border-neutral-200">
                        <table className="w-full text-left border-collapse">
                           <tbody>
                              {renderLocalCategories(vendor.vendor_category || vendor.categories?.join(', ') || '')}
                              {[
                                 { label: 'SERVICE CAPABILITIES', value: vendor.service_capabilities || vendor.serviceCapabilities?.join(', ') },
                                 { label: 'OEM BRANDS', value: vendor.oem_brands || vendor.oemBrands?.filter(Boolean).join(', ') },
                                 { label: 'SPECIALITIES', value: vendor.specialities },
                                 { label: 'TECHNICAL TEAM STRENGTH', value: vendor.tech_team_strength || vendor.techTeamStrength },
                                 { label: 'INSTALLED BASE DETAILS', value: vendor.installed_base || vendor.installedBase },
                              ].map(({ label, value }) => (
                                 <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                                    <th className="py-6 px-6 bg-neutral-50 border-r border-neutral-100 font-black uppercase text-[10px] tracking-widest text-neutral-600 w-1/3 align-top">{label}</th>
                                    <td className="py-6 px-6 font-medium text-neutral-900">
                                       {label === 'SERVICE CAPABILITIES' && value ? (
                                          <div className="flex flex-wrap gap-2">
                                             {value.split(',').filter(Boolean).map((item: string, i: number) => (
                                                <span key={i} className="border border-neutral-200 text-neutral-700 px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm">{item.trim()}</span>
                                             ))}
                                          </div>
                                       ) : (
                                          value || <span className="text-neutral-400 italic">Not provided</span>
                                       )}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </details>

                  {/* Facility Overview */}
                  <details open className="group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                           <FileText className="w-4 h-4 text-red-500" /> FACILITY CAPABILITIES OVERVIEW
                        </h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-6 bg-white border-b border-neutral-200">
                        <p className="text-neutral-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                           {vendor.facility_description || vendor.description || <span className="text-neutral-400 italic">No facility overview description provided by vendor.</span>}
                        </p>
                     </div>
                  </details>

                  {/* Observations / Missing Items */}
                  <div className="p-0">
                     {vendor.missing_items ? (
                        <div className="bg-white p-0 border-l-4 border-amber-500">
                           <div className="p-6 bg-amber-50 border-b border-amber-100">
                              <h3 className="text-amber-700 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                 <AlertTriangle className="w-4 h-4 text-amber-500" /> ACTION REQUIRED: MISSING / OBSERVATION ITEMS
                              </h3>
                           </div>
                           <div className="divide-y divide-amber-100 bg-white">
                              {Object.entries(categorizeMissingItems(vendor.missing_items)).map(([cat, items]) => {
                                 if (items.length === 0) return null;
                                 return (
                                    <details key={cat} open className="group">
                                       <summary className="bg-amber-50/50 py-4 px-6 font-black uppercase text-[10px] tracking-widest text-amber-900 cursor-pointer list-none flex justify-between items-center hover:bg-amber-50 transition-colors">
                                          <span>{cat}</span>
                                          <ChevronDown className="w-3.5 h-3.5 text-amber-500 transition-transform group-open:rotate-180" />
                                       </summary>
                                       <div className="p-0 border-t border-amber-100">
                                          <table className="w-full text-left border-collapse text-sm">
                                             <tbody>
                                                {items.map((item, i) => (
                                                   <tr key={i} className="border-b border-amber-50 last:border-0 hover:bg-amber-50/30 transition-colors">
                                                      <td className="py-4 px-6 font-bold text-neutral-700 flex items-start gap-3">
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
                     ) : (
                        <div className="bg-green-50 border-l-4 border-green-500 p-6">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" /> COMPLIANCE DETAILS COMPLETE
                           </h3>
                           <p className="text-green-800 text-sm font-bold">No missing credentials or document deficiencies flagged for this registration.</p>
                        </div>
                     )}
                  </div>

                  {/* Uploaded Documents */}
                  <details open className="group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                           <Upload className="w-4 h-4 text-red-500" /> DOCUMENT REPOSITORY
                        </h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-6 bg-neutral-50">
                        {isLoadingDocs ? (
                           <div className="p-8 text-center text-neutral-500 text-xs uppercase tracking-widest flex flex-col items-center gap-3">
                              <RefreshCw className="w-5 h-5 animate-spin text-red-500" /> Syncing credentials...
                           </div>
                        ) : vendorDocs.length === 0 ? (
                           <div className="p-8 text-center text-neutral-500 text-xs italic bg-white rounded-lg border border-neutral-200">
                              No uploaded compliance documents found in secure storage.
                           </div>
                        ) : (
                           <div className="space-y-4">
                              {Object.entries(categorizeDocuments(vendorDocs)).map(([catName, docs]) => {
                                 if (docs.length === 0) return null;
                                 return (
                                    <div key={catName} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                                       <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                                          {catName}
                                       </div>
                                       <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                          {docs.map((doc) => (
                                             <a
                                                key={doc.name}
                                                href={doc.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex flex-col gap-1.5 bg-white border border-neutral-200 px-4 py-3 hover:border-red-600 hover:shadow-md transition-all group rounded-md shadow-sm"
                                             >
                                                <div className="flex items-center gap-2.5 w-full">
                                                   <FileText className="w-4 h-4 text-red-500 shrink-0 animate-in fade-in" />
                                                   <span className="text-neutral-700 text-[10px] font-bold uppercase truncate group-hover:text-neutral-900 transition-colors" title={doc.name.replace(/^__.*?__\s*(.*\s*-\s*)?/, '')}>
                                                      {doc.name.replace(/^__.*?__\s*(.*\s*-\s*)?/, '')}
                                                   </span>
                                                   <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 ml-auto shrink-0 transition-colors" />
                                                </div>
                                                {doc.created_at && (
                                                   <div className="pl-6.5">
                                                      {new Date(doc.created_at).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) ? (
                                                         <div className="flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                                            <span className="text-green-600 text-[8px] font-black uppercase tracking-widest">Added Today</span>
                                                         </div>
                                                      ) : new Date(doc.created_at).setHours(0, 0, 0, 0) === new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0) ? (
                                                         <div className="flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3 text-amber-500" />
                                                            <span className="text-amber-600 text-[8px] font-black uppercase tracking-widest">Added Yesterday</span>
                                                         </div>
                                                      ) : (
                                                         <span className="text-neutral-500 text-[8px] font-bold uppercase tracking-widest">Uploaded: {new Date(doc.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                      )}
                                                   </div>
                                                )}
                                             </a>
                                          ))}
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                  </details>
               </div>
            </div>
         </div>
      </div>
   );
};

export default VendorDetailAdmin;
