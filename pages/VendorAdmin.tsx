import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
   RefreshCw, Lock, AlertTriangle, Search, ChevronDown,
   Eye, CheckCircle, XCircle, Home, Users, BarChart2,
   Settings, User, Tag, X, MoreHorizontal, Pencil,
   ShieldCheck, TrendingUp, ArrowUp, ArrowDown, ArrowUpDown,
   Download, Clock, CalendarDays, Mail, Send, AlertCircle
} from 'lucide-react';
import { getVendors, updateVendorStatus, saveAdminView } from '../services/SupabaseService';
import BulkActionBar from '../components/BulkActionBar';
import { VENDOR_CATEGORIES } from './Admin';

const ADMIN_PASSWORD = 'dxn2025';
const AUTH_TOKEN_KEY = 'dxn_admin_auth_session';
const VENDORS_PER_PAGE = 10;

// ── Status pill ─────────────────────────────────────────────────────────────
const StatusPill = ({ status }: { status: string }) => {
   const s = (status || 'pending').toLowerCase();
   const cfg: Record<string, { bg: string; text: string; dot: string; label: string; glow: string }> = {
      approved: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'COMPLETED', glow: '0 0 10px rgba(16,185,129,0.25)' },
      complete: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'COMPLETED', glow: '0 0 10px rgba(16,185,129,0.25)' },
      pending: { bg: 'bg-orange-500/15', text: 'text-orange-400', dot: 'bg-orange-400', label: 'OBSERVATION', glow: '0 0 10px rgba(249,115,22,0.25)' },
      observation: { bg: 'bg-orange-500/15', text: 'text-orange-400', dot: 'bg-orange-400', label: 'OBSERVATION', glow: '0 0 10px rgba(249,115,22,0.25)' },
      rejected: { bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400', label: 'REJECTED', glow: '0 0 10px rgba(239,68,68,0.25)' },
   };
   const c = cfg[s] || cfg['pending'];
   return (
      <span
         className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${c.bg} ${c.text}`}
         style={{ boxShadow: c.glow }}
      >
         <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
         {c.label}
      </span>
   );
};

// ── CSS keyframes injected once ───────────────────────────────────────────────
const rowAnim = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.vendor-row { animation: fadeSlideIn 0.25s ease both; }
`;
if (typeof document !== 'undefined' && !document.getElementById('vendor-anim-style')) {
   const s = document.createElement('style');
   s.id = 'vendor-anim-style'; s.textContent = rowAnim;
   document.head.appendChild(s);
}

// ── Toggle Switch ─────────────────────────────────────────────────────────
const Toggle = ({ isOn, onToggle, colorClass }: { isOn: boolean; onToggle: () => void; colorClass: string }) => (
   <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 shrink-0 ${isOn ? colorClass : 'bg-slate-700'}`}
   >
      <div
         className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${isOn ? 'left-[22px]' : 'left-0.5'}`}
      />
   </button>
);

const VendorAdmin: React.FC = () => {
   const [isAuth, setIsAuth] = useState(false);
   const [password, setPassword] = useState('');
   const [vendors, setVendors] = useState<any[]>([]);
   const [vendorPage, setVendorPage] = useState(1);
   const [isLoadingVendors, setIsLoadingVendors] = useState(false);
   const [search, setSearch] = useState('');
   const [activityFilter, setActivityFilter] = useState<string>('all'); // 'all' | 'registered_today' | 'updated_today' | 'completed' | 'observation'
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [statusToggles, setStatusToggles] = useState({ approved: false, pending: false, rejected: false });
   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
   const [selectedVendorIds, setSelectedVendorIds] = useState<number[]>([]);
   const [dateFilter, setDateFilter] = useState('');
   const [dateFilterType, setDateFilterType] = useState<'registration' | 'update'>('registration');
   const [isDateFocused, setIsDateFocused] = useState(false);
   const [sortField, setSortField] = useState<'id' | 'name' | 'date' | 'status'>('date');
   const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
   const [openStatusMenuId, setOpenStatusMenuId] = useState<any>(null);
   const categoryRef = useRef<HTMLDivElement>(null);
   const statusMenuRef = useRef<HTMLDivElement>(null);

   // ── Bulk Reminder Email State ───────────────────────────────────────────────
   const [reminderModal, setReminderModal] = useState<'closed' | 'preview' | 'sending' | 'done'>('closed');
   const [reminderEmailSubject, setReminderEmailSubject] = useState('Action Required: Complete Your DXN Vendor Registration');
   const [reminderEmailBody, setReminderEmailBody] = useState(
      `Dear {contactPerson},\n\nYour vendor registration for {companyName} is currently under observation. The following documents are still pending:\n\n{missingItems}\n\nPlease visit our vendor portal and upload the missing documents to complete your registration.\n\nRegards,\nDXN Manufacturing India — Procurement Team`
   );
   const [reminderProgress, setReminderProgress] = useState({ sent: 0, failed: 0, total: 0, currentVendor: '' });
   const [reminderResults, setReminderResults] = useState<{ name: string; email: string; success: boolean }[]>([]);

   const todayMs = new Date().setHours(0, 0, 0, 0);
   const allCategories = Object.values(VENDOR_CATEGORIES).flat();

   useEffect(() => {
      const session = sessionStorage.getItem(AUTH_TOKEN_KEY);
      if (session === 'authenticated') { setIsAuth(true); fetchVendorData(); }
   }, []);

   useEffect(() => {
      if (isAuth) { setVendorPage(1); fetchVendorData(); }
   }, [isAuth]);

   // Close category dropdown on outside click
   useEffect(() => {
      const handler = (e: MouseEvent) => {
         if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setIsCategoryOpen(false);
         if (statusMenuRef.current && !statusMenuRef.current.contains(e.target as Node)) setOpenStatusMenuId(null);
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
   }, []);

   const fetchVendorData = async () => {
      setIsLoadingVendors(true);
      try {
         const data = await getVendors();
         if (data && data.length > 0) setVendors(data);
         else {
            const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            setVendors(saved);
         }
      } catch {
         const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
         setVendors(saved);
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
      } else alert('Unauthorized');
   };

   const handleApproveVendor = async (id: any) => {
      try {
         setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
         if (typeof id === 'string') await updateVendorStatus(id, 'approved');
         else {
            const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(saved.map((v: any) => v.id === id ? { ...v, status: 'approved' } : v)));
         }
      } catch { fetchVendorData(); }
   };

   const handleRejectVendor = async (id: any) => {
      try {
         setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
         if (typeof id === 'string') await updateVendorStatus(id, 'rejected');
         else {
            const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(saved.map((v: any) => v.id === id ? { ...v, status: 'rejected' } : v)));
         }
      } catch { fetchVendorData(); }
   };

   const handleStatusChange = async (id: any, newStatus: string) => {
      setOpenStatusMenuId(null);
      try {
         setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
         if (typeof id === 'string') await updateVendorStatus(id, newStatus);
         else {
            const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
            localStorage.setItem('dxn_pending_vendors', JSON.stringify(saved.map((v: any) => v.id === id ? { ...v, status: newStatus } : v)));
         }
      } catch { fetchVendorData(); }
   };

   const exportCSV = () => {
      const headers = ['ID', 'Company Name', 'Contact Person', 'Email', 'Phone', 'Category', 'Status', 'Registration Date'];
      const rows = filteredVendors.map(v => [
         String(v.id || ''),
         v.company_name || v.companyName || '',
         v.contact_person || v.authorizedPerson || '',
         v.email || '',
         v.phone || '',
         v.vendor_category || (v.categories || []).join('; ') || '',
         v.status || 'pending',
         v.created_at ? new Date(v.created_at).toLocaleDateString('en-IN') : ''
      ].map(cell => `"${String(cell).replace(/"/g, '""')}"`));
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `vendors_${new Date().toISOString().slice(0,10)}.csv`;
      a.click(); URL.revokeObjectURL(url);
   };

   // ── Bulk Reminder Email Handler ────────────────────────────────────────────
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfPwcfwqcJl1RFwRb8Lsf1Djn6k-JyzRFA4g7kN8x2NO3mCn1aoyp-MR0-3E57lU5X/exec';

   const getSelectedObservationVendors = () => {
      return vendors.filter(v => {
         const isSelected = selectedVendorIds.includes(v.id);
         const isObservation = v.missing_items && v.missing_items.length > 0 &&
            !['approved', 'complete', 'rejected'].includes((v.status || '').toLowerCase());
         return isSelected && isObservation;
      });
   };

   const handleSendBulkReminders = async () => {
      const targets = getSelectedObservationVendors();
      if (targets.length === 0) return;

      setReminderModal('sending');
      setReminderProgress({ sent: 0, failed: 0, total: targets.length, currentVendor: '' });
      const results: { name: string; email: string; success: boolean }[] = [];

      for (let i = 0; i < targets.length; i++) {
         const vendor = targets[i];
         const companyName = vendor.company_name || vendor.companyName || 'Vendor';
         const contactPerson = vendor.contact_person || vendor.authorizedPerson || 'Sir/Madam';
         const email = vendor.email || '';
         const missingItems = typeof vendor.missing_items === 'string'
            ? vendor.missing_items.split(',').map((s: string) => `• ${s.trim()}`).join('\n')
            : Array.isArray(vendor.missing_items)
               ? vendor.missing_items.map((s: string) => `• ${s}`).join('\n')
               : 'Please check the vendor portal for details.';

         const personalizedBody = reminderEmailBody
            .replace(/{contactPerson}/g, contactPerson)
            .replace(/{companyName}/g, companyName)
            .replace(/{missingItems}/g, missingItems);

         setReminderProgress(p => ({ ...p, currentVendor: companyName }));

         try {
            const payload = {
               action: 'reminder',
               vendorEmail: email,
               vendorName: companyName,
               contactPerson,
               subject: reminderEmailSubject,
               body: personalizedBody,
               missingItems,
               applicationId: vendor.id
            };

            const response = await fetch(GOOGLE_SCRIPT_URL, {
               redirect: 'follow',
               method: 'POST',
               headers: { 'Content-Type': 'text/plain;charset=utf-8' },
               body: JSON.stringify(payload)
            });

            const success = response.ok;
            results.push({ name: companyName, email, success });
            setReminderProgress(p => ({
               ...p,
               sent: p.sent + (success ? 1 : 0),
               failed: p.failed + (success ? 0 : 1)
            }));
         } catch {
            results.push({ name: companyName, email, success: false });
            setReminderProgress(p => ({ ...p, failed: p.failed + 1 }));
         }

         // Small delay to avoid rate limiting
         if (i < targets.length - 1) await new Promise(r => setTimeout(r, 500));
      }

      setReminderResults(results);
      setReminderModal('done');
   };

   // ── Counts ─────────────────────────────────────────────────────────────────
   const registeredToday = vendors.filter(v => v.created_at && new Date(v.created_at).setHours(0, 0, 0, 0) === todayMs).length;
   const updatedToday = vendors.filter(v => v.updated_at && new Date(v.updated_at).setHours(0, 0, 0, 0) === todayMs).length;
   const completedCount = vendors.filter(v => ['approved', 'complete'].includes((v.status || '').toLowerCase())).length;
   const observationCount = vendors.filter(v => v.missing_items && v.missing_items.length > 0 && !['approved', 'complete', 'rejected'].includes((v.status || '').toLowerCase())).length;

   // ── Filter ─────────────────────────────────────────────────────────────────
   const filteredVendors = vendors.filter((v: any) => {
      if (activityFilter === 'registered_today') {
         if (!(v.created_at && new Date(v.created_at).setHours(0, 0, 0, 0) === todayMs)) return false;
      }
      if (activityFilter === 'updated_today') {
         if (!(v.updated_at && new Date(v.updated_at).setHours(0, 0, 0, 0) === todayMs)) return false;
      }
      if (activityFilter === 'completed') {
         if (!['approved', 'complete'].includes((v.status || '').toLowerCase())) return false;
      }
      if (activityFilter === 'observation') {
         if (!(v.missing_items && v.missing_items.length > 0 && !['approved', 'complete', 'rejected'].includes((v.status || '').toLowerCase()))) return false;
      }
      // Status toggles — if any on, apply
      const anyToggle = statusToggles.approved || statusToggles.pending || statusToggles.rejected;
      if (anyToggle) {
         const s = (v.status || 'pending').toLowerCase();
         let matchesStatus = false;
         if (statusToggles.approved && ['approved', 'complete'].includes(s)) matchesStatus = true;
         if (statusToggles.pending && ['pending', 'observation'].includes(s)) matchesStatus = true;
         if (statusToggles.rejected && s === 'rejected') matchesStatus = true;
         if (!matchesStatus) return false;
      }
      // Category
      if (selectedCategories.length > 0) {
         const catStr = (v.vendor_category || v.categories?.join(', ') || '').toLowerCase();
         if (!selectedCategories.every(c => catStr.includes(c.toLowerCase()))) return false;
      }
      // Date
      if (dateFilter) {
         if (dateFilterType === 'registration') {
            if (!v.created_at) return false;
            const d = new Date(v.created_at);
            const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (dStr !== dateFilter) return false;
         } else if (dateFilterType === 'update') {
            if (!v.updated_at) return false;
            const d = new Date(v.updated_at);
            const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (dStr !== dateFilter) return false;
         }
      }
      // Search — applied with all other filters (AND logic)
      if (search) {
         const t = search.toLowerCase();
         if (!(
            (v.company_name || v.companyName || '').toLowerCase().includes(t) ||
            (v.email || '').toLowerCase().includes(t) ||
            (v.pan_number || v.panNumber || '').toLowerCase().includes(t) ||
            (v.phone || '').toLowerCase().includes(t) ||
            (v.gst_number || v.gstNumber || '').toLowerCase().includes(t) ||
            (v.contact_person || v.authorizedPerson || '').toLowerCase().includes(t)
         )) return false;
      }
      return true;
   });

   // ── Sort ────────────────────────────────────────────────────────────────────
   const statusOrder: Record<string, number> = { approved: 0, complete: 0, pending: 1, observation: 1, rejected: 2 };
   const sortedVendors = [...filteredVendors].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'id') cmp = (a.id > b.id ? 1 : -1);
      else if (sortField === 'name') cmp = (a.company_name || a.companyName || '').localeCompare(b.company_name || b.companyName || '');
      else if (sortField === 'date') cmp = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
      else if (sortField === 'status') cmp = (statusOrder[(a.status || 'pending').toLowerCase()] || 0) - (statusOrder[(b.status || 'pending').toLowerCase()] || 0);
      return sortDir === 'asc' ? cmp : -cmp;
   });

   const handleSort = (field: typeof sortField) => {
      if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else { setSortField(field); setSortDir('asc'); }
      setVendorPage(1);
   };

   const SortIcon = ({ field }: { field: typeof sortField }) => {
      if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
      return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-indigo-300" /> : <ArrowDown className="w-3 h-3 text-indigo-300" />;
   };

   const totalPages = Math.max(1, Math.ceil(sortedVendors.length / VENDORS_PER_PAGE));
   const pageVendors = sortedVendors.slice((vendorPage - 1) * VENDORS_PER_PAGE, vendorPage * VENDORS_PER_PAGE);
   const rejectedCount = vendors.filter(v => (v.status || '').toLowerCase() === 'rejected').length;
   const thisWeekCount = vendors.filter(v => { if (!v.created_at) return false; const d = new Date(v.created_at); const now = new Date(); const weekAgo = new Date(now.getTime() - 7 * 86400000); return d >= weekAgo; }).length;

   // ── Activity pill ──────────────────────────────────────────────────────────
   const ActivityPill = ({ id, label, count, dot }: { id: string; label: string; count?: number; dot?: string }) => {
      const isActive = activityFilter === id;
      return (
         <button
            onClick={() => { setActivityFilter(isActive ? 'all' : id); setVendorPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${isActive
               ? 'bg-red-500 border-red-400 text-white shadow-md shadow-red-500/30'
               : 'border-white text-slate-300 hover:border-white hover:text-white'
               }`}
            style={{ background: isActive ? undefined : 'rgba(255,255,255,0.04)' }}
         >
            {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />}
            {label}
            {count !== undefined && (
               <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-indigo-300'}`}>{count}</span>
            )}
         </button>
      );
   };

   // ── LOGIN ─────────────────────────────────────────────────────────────────
   if (!isAuth) return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'radial-gradient(ellipse at top, #171717 0%, #000000 60%)' }}>
         <div className="relative w-full max-w-md">
            <div className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full" style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }} />
            <div className="border border-white rounded-2xl p-12 shadow-2xl backdrop-blur-xl" style={{ background: 'rgba(23,23,23,0.8)' }}>
               <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-6">
                     <Lock className="w-7 h-7 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-black uppercase text-white tracking-widest">Admin Suite</h2>
                  <p className="text-slate-500 text-xs mt-2 tracking-widest">DXN Vendor Management Portal</p>
               </div>
               <form onSubmit={handleLogin} className="space-y-4">
                  <input
                     type="password"
                     placeholder="Enter Security Key"
                     className="w-full border border-white/10 rounded-xl px-5 py-4 text-white text-center tracking-widest outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-slate-600"
                     style={{ background: 'rgba(0,0,0,0.3)' }}
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     autoFocus
                  />
                  <button className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:shadow-lg hover:shadow-red-600/30 active:scale-[0.98]">
                     Authenticate
                  </button>
               </form>
            </div>
         </div>
      </div>
   );

   // ── MAIN ──────────────────────────────────────────────────────────────────
   const selectedObservationVendors = getSelectedObservationVendors();

   return (
      <>
      {/* ── Bulk Reminder Modals ─────────────────────────────────────────── */}
      {reminderModal !== 'closed' && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
            <div className="w-full max-w-xl rounded-2xl border border-orange-500/30 shadow-2xl overflow-hidden" style={{ background: '#0f1a2e' }}>

               {/* Preview / Edit Modal */}
               {reminderModal === 'preview' && (
                  <div>
                     <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                           <Mail className="w-4 h-4 text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h2 className="text-sm font-black text-white uppercase tracking-widest">Send Reminder Emails</h2>
                           <p className="text-[11px] text-slate-400 mt-0.5">
                              {selectedObservationVendors.length} observation vendor{selectedObservationVendors.length !== 1 ? 's' : ''} selected
                           </p>
                        </div>
                        <button onClick={() => setReminderModal('closed')} className="text-slate-500 hover:text-white transition-colors">
                           <X className="w-5 h-5" />
                        </button>
                     </div>

                     <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        {/* Recipients list */}
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Recipients</p>
                           <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                              {selectedObservationVendors.map(v => (
                                 <div key={v.id} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                    <span className="text-xs text-slate-300 font-semibold truncate">{v.company_name || v.companyName}</span>
                                    <span className="text-[10px] text-slate-500 truncate ml-auto">{v.email}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Subject */}
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1.5 block">Email Subject</label>
                           <input
                              type="text"
                              value={reminderEmailSubject}
                              onChange={e => setReminderEmailSubject(e.target.value)}
                              className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500/50 transition-colors"
                              style={{ background: 'rgba(0,0,0,0.3)' }}
                           />
                        </div>

                        {/* Body */}
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1.5 block">
                              Email Body
                              <span className="text-slate-500 normal-case font-normal ml-2">(use {'{contactPerson}'}, {'{companyName}'}, {'{missingItems}'} as placeholders)</span>
                           </label>
                           <textarea
                              rows={8}
                              value={reminderEmailBody}
                              onChange={e => setReminderEmailBody(e.target.value)}
                              className="w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/50 transition-colors resize-none font-mono"
                              style={{ background: 'rgba(0,0,0,0.3)' }}
                           />
                        </div>
                     </div>

                     <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10">
                        <button onClick={() => setReminderModal('closed')} className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-xs font-bold transition-colors">
                           Cancel
                        </button>
                        <button
                           onClick={handleSendBulkReminders}
                           disabled={selectedObservationVendors.length === 0}
                           className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider transition-all"
                        >
                           <Send className="w-3.5 h-3.5" />
                           Confirm & Send {selectedObservationVendors.length} Email{selectedObservationVendors.length !== 1 ? 's' : ''}
                        </button>
                     </div>
                  </div>
               )}

               {/* Sending Progress Modal */}
               {reminderModal === 'sending' && (
                  <div className="p-8 text-center">
                     <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mx-auto mb-5">
                        <Send className="w-6 h-6 text-orange-400 animate-pulse" />
                     </div>
                     <h2 className="text-lg font-black text-white uppercase tracking-widest mb-1">Sending Emails...</h2>
                     <p className="text-slate-400 text-sm mb-6">
                        {reminderProgress.currentVendor && `Sending to ${reminderProgress.currentVendor}...`}
                     </p>
                     {/* Progress bar */}
                     <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                        <div
                           className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                           style={{ width: `${reminderProgress.total > 0 ? ((reminderProgress.sent + reminderProgress.failed) / reminderProgress.total) * 100 : 0}%` }}
                        />
                     </div>
                     <p className="text-xs text-slate-400">
                        {reminderProgress.sent + reminderProgress.failed} of {reminderProgress.total} processed
                        {reminderProgress.failed > 0 && <span className="text-red-400 ml-2">({reminderProgress.failed} failed)</span>}
                     </p>
                  </div>
               )}

               {/* Done Modal */}
               {reminderModal === 'done' && (
                  <div>
                     <div className="p-8 text-center border-b border-white/10">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                           <CheckCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-lg font-black text-white uppercase tracking-widest mb-1">Emails Sent</h2>
                        <div className="flex items-center justify-center gap-6 mt-3">
                           <div className="text-center">
                              <p className="text-2xl font-black text-emerald-400">{reminderProgress.sent}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Sent</p>
                           </div>
                           {reminderProgress.failed > 0 && (
                              <div className="text-center">
                                 <p className="text-2xl font-black text-red-400">{reminderProgress.failed}</p>
                                 <p className="text-[10px] text-slate-500 uppercase tracking-widest">Failed</p>
                              </div>
                           )}
                        </div>
                     </div>
                     {/* Results list */}
                     <div className="max-h-48 overflow-y-auto p-4 space-y-1">
                        {reminderResults.map((r, i) => (
                           <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                              {r.success
                                 ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                 : <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              }
                              <span className="text-xs text-slate-300 font-semibold truncate">{r.name}</span>
                              <span className="text-[10px] text-slate-500 truncate ml-auto">{r.email}</span>
                           </div>
                        ))}
                     </div>
                     <div className="px-6 py-4 border-t border-white/10 text-right">
                        <button
                           onClick={() => { setReminderModal('closed'); setReminderResults([]); }}
                           className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-black uppercase tracking-wider transition-colors"
                        >
                           Close
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      )}

      <div className="min-h-screen pt-28 pb-16" style={{ background: 'linear-gradient(160deg, #0d1526 0%, #0f1a2e 50%, #0b1220 100%)' }}>
         <div className="max-w-[1400px] mx-auto px-4 md:px-8">

            {/* ── Top bar: search + header ─── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
               {/* Title */}
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300 mb-1">DXN Manufacturing · Admin</p>
                  <h1 className="text-2xl font-black text-white">
                     Vendor Registration Hub
                     <span className="text-indigo-300 font-semibold text-base ml-2">({sortedVendors.length} Registrations)</span>
                  </h1>
               </div>
                {/* Search + Refresh + Reminder */}
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <Search className="w-4 h-4 text-indigo-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                     <input
                        type="text"
                        placeholder="Search vendors, ID, or contact..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setVendorPage(1); }}
                        className="w-64 md:w-80 border border-white rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-indigo-300/60 outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                     />
                     {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white transition-colors">
                           <X className="w-3.5 h-3.5" />
                        </button>
                     )}
                  </div>
                  {selectedObservationVendors.length > 0 && (
                     <button
                        onClick={() => setReminderModal('preview')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-orange-500/50 text-orange-300 hover:text-orange-200 hover:border-orange-400 text-xs font-bold transition-all whitespace-nowrap"
                        style={{ background: 'rgba(249,115,22,0.08)' }}
                        title={`Send reminder to ${selectedObservationVendors.length} selected observation vendor(s)`}
                     >
                        <Mail className="w-3.5 h-3.5" />
                        Send Reminder ({selectedObservationVendors.length})
                     </button>
                  )}
                  <button
                     onClick={fetchVendorData}
                     className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white text-slate-300 hover:text-white text-xs font-bold transition-all hover:border-white whitespace-nowrap"
                     style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                     <RefreshCw className={`w-3.5 h-3.5 ${isLoadingVendors ? 'animate-spin' : ''}`} />
                     Refresh
                  </button>
               </div>
            </div>

            {/* ── Stats Bar ───────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
               {[
                  { label: 'Total', value: vendors.length, color: 'text-white', borderCol: 'border-white/15', glowColor: 'rgba(255,255,255,0.06)', hoverGlow: '0 0 24px rgba(255,255,255,0.08)', onClick: () => { setActivityFilter('all'); setStatusToggles({ approved: false, pending: false, rejected: false }); setVendorPage(1); } },
                  { label: 'Completed', value: completedCount, color: 'text-emerald-400', borderCol: 'border-emerald-500/30', glowColor: 'rgba(16,185,129,0.06)', hoverGlow: '0 0 24px rgba(16,185,129,0.18)', onClick: () => { setActivityFilter('completed'); setVendorPage(1); } },
                  { label: 'Observation', value: observationCount, color: 'text-orange-400', borderCol: 'border-orange-500/30', glowColor: 'rgba(249,115,22,0.06)', hoverGlow: '0 0 24px rgba(249,115,22,0.18)', onClick: () => { setActivityFilter('observation'); setVendorPage(1); } },
                  { label: 'Rejected', value: rejectedCount, color: 'text-red-400', borderCol: 'border-red-500/30', glowColor: 'rgba(239,68,68,0.06)', hoverGlow: '0 0 24px rgba(239,68,68,0.18)', onClick: () => { setStatusToggles(p => ({ ...p, rejected: true, approved: false, pending: false })); setVendorPage(1); } },
                  { label: 'This Week', value: thisWeekCount, color: 'text-indigo-300', borderCol: 'border-indigo-500/30', glowColor: 'rgba(99,102,241,0.06)', hoverGlow: '0 0 24px rgba(99,102,241,0.18)', onClick: () => { setActivityFilter('registered_today'); setVendorPage(1); } },
               ].map(({ label, value, color, borderCol, glowColor, hoverGlow, onClick }) => (
                  <button key={label} onClick={onClick}
                     className={`rounded-xl border ${borderCol} px-4 py-3 text-left transition-all duration-300 hover:scale-[1.03] group`}
                     style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${glowColor})` }}
                     onMouseEnter={e => (e.currentTarget.style.boxShadow = hoverGlow)}
                     onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                  >
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover:text-slate-400 transition-colors">{label}</p>
                     <p className={`text-2xl font-black ${color}`}>{value}</p>
                  </button>
               ))}
            </div>

            {/* ── Unified Filter Panel ─────── */}
            <div className="relative z-50 rounded-2xl border border-white/20 p-5 mb-5 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.035)', boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
               <div className="flex flex-col lg:flex-row gap-5">

                  {/* Activity */}
                  <div className="flex-1 min-w-0">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Activity</p>
                     <div className="flex flex-wrap gap-2">
                        <ActivityPill id="all" label="All" />
                        <ActivityPill id="registered_today" label="Registered Today" count={registeredToday} />
                        <ActivityPill id="updated_today" label="Updated Today" count={updatedToday} />
                        <ActivityPill id="completed" label="Completed" count={completedCount} dot="bg-emerald-400" />
                        <ActivityPill id="observation" label="Observation" count={observationCount} dot="bg-orange-400" />
                     </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px bg-white self-stretch" />

                  {/* Category */}
                  <div className="w-full lg:w-52 shrink-0">
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-3">Category</p>
                     <div className="relative" ref={categoryRef}>
                        <button
                           onClick={() => setIsCategoryOpen(p => !p)}
                           className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-white text-sm hover:border-white transition-all"
                           style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                           <div className="flex items-center gap-2">
                              <Tag className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                              <span className="text-xs font-semibold text-slate-300 truncate">
                                 {selectedCategories.length === 0 ? 'All Categories' : `${selectedCategories.length} selected`}
                              </span>
                           </div>
                           <ChevronDown className={`w-3.5 h-3.5 text-indigo-300 shrink-0 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCategoryOpen && (
                           <div className="absolute top-full mt-2 left-0 right-0 max-h-56 overflow-y-auto border border-white shadow-2xl z-50 rounded-xl p-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full"
                              style={{ background: '#141e30', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
                              {selectedCategories.length > 0 && (
                                 <button onClick={() => setSelectedCategories([])} className="w-full text-left text-[10px] font-black uppercase tracking-widest text-red-400 px-2 pb-2 border-b border-white mb-1 hover:text-red-300">
                                    Clear all
                                 </button>
                              )}
                              {Object.entries(VENDOR_CATEGORIES).map(([groupName, categories]) => (
                                 <div key={groupName} className="mb-2 last:mb-0">
                                    <div className="px-2 py-1.5 text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 rounded-md mb-1">
                                       {groupName}
                                    </div>
                                    {categories.map(cat => (
                                       <label key={cat} className="flex items-center gap-3 px-2 py-1.5 hover:bg-white/5 cursor-pointer rounded-lg transition-colors">
                                          <input
                                             type="checkbox"
                                             checked={selectedCategories.includes(cat)}
                                             onChange={() => setSelectedCategories(prev =>
                                                prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                                             )}
                                             className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                                          />
                                          <span className="text-xs text-slate-300 select-none">{cat}</span>
                                       </label>
                                    ))}
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px bg-white self-stretch" />

                  {/* Status toggles */}
                  <div className="w-full lg:w-44 shrink-0">
                     <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-3">Status</p>
                     <div className="flex flex-col gap-2.5">
                        {([
                           { key: 'approved' as const, label: 'COMPLETED', colorClass: 'bg-emerald-500', textOn: 'text-emerald-400' },
                           { key: 'pending' as const, label: 'OBSERVATION', colorClass: 'bg-orange-500', textOn: 'text-orange-400' },
                           { key: 'rejected' as const, label: 'REJECTED', colorClass: 'bg-red-500', textOn: 'text-red-400' },
                        ]).map(({ key, label, colorClass, textOn }) => (
                           <div key={key} className="flex items-center justify-between gap-3">
                              <span className={`text-[11px] font-black uppercase tracking-wider transition-colors ${statusToggles[key] ? textOn : 'text-slate-300'}`}>
                                 {label}
                              </span>
                              <Toggle
                                 isOn={statusToggles[key]}
                                 onToggle={() => { setStatusToggles(p => ({ ...p, [key]: !p[key] })); setVendorPage(1); }}
                                 colorClass={colorClass}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* ── Table ────────────────────────────────────────── */}
            <div className="rounded-2xl border border-emerald-500/50 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>

               {/* Table header */}
               <div className="px-5 py-4 border-b border-emerald-500/50">
                  <div className="flex items-center justify-between gap-3">
                     <h2 className="text-sm font-black text-green-100 uppercase tracking-widest">Vendor Registrations</h2>
                     <div className="flex items-center gap-2 ml-auto">
                        {dateFilter && (
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-red-400 font-bold">Showing: {dateFilter}</span>
                              <button onClick={() => setDateFilter('')} className="text-slate-500 hover:text-white transition-colors"><X className="w-3.5 h-3.5" /></button>
                           </div>
                        )}
                        <div className="flex items-center bg-[rgba(255,255,255,0.05)] border border-emerald-500/50 rounded-lg overflow-hidden focus-within:border-red-500/50 transition-colors">
                           <select
                              value={dateFilterType}
                              onChange={e => { setDateFilterType(e.target.value as any); setVendorPage(1); }}
                              className="text-xs bg-transparent text-slate-400 outline-none px-2 py-1.5 border-r border-emerald-500/30 cursor-pointer"
                           >
                              <option value="registration" className="bg-[#0f1a2e]">Registration Date</option>
                              <option value="update" className="bg-[#0f1a2e]">Update Date</option>
                           </select>
                           <input
                              type={(dateFilter || isDateFocused) ? "date" : "text"}
                              placeholder="Select Date"
                              onFocus={() => setIsDateFocused(true)}
                              onBlur={() => setIsDateFocused(false)}
                              value={dateFilter}
                              onChange={e => { setDateFilter(e.target.value); setVendorPage(1); }}
                              className="text-xs bg-transparent px-2.5 py-1.5 text-slate-400 outline-none cursor-pointer"
                              title="Filter by date"
                           />
                        </div>
                        <button
                           onClick={exportCSV}
                           title="Export to CSV"
                           className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-500/10 transition-all"
                        >
                           <Download className="w-3.5 h-3.5" />
                           Export CSV
                        </button>
                     </div>
                  </div>
               </div>

               <div className="overflow-x-auto w-full [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
                  <div className="min-w-[960px]">
                     {/* Column headers — sticky */}
                     <div className="sticky top-0 z-10 grid gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-indigo-300 border-b border-emerald-500/50"
                        style={{ gridTemplateColumns: '1.5rem 2.5rem 1fr 0.8fr 1fr 1fr 0.8fr 6rem', background: '#0f1a2e' }}>
                  <div>
                     <input
                        type="checkbox"
                        className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                        checked={pageVendors.length > 0 && pageVendors.every(v => selectedVendorIds.includes(v.id))}
                        onChange={e => {
                           if (e.target.checked) setSelectedVendorIds(p => [...new Set([...p, ...pageVendors.map(v => v.id)])]);
                           else setSelectedVendorIds(p => p.filter(id => !pageVendors.map(v => v.id).includes(id)));
                        }}
                     />
                  </div>
                  <button onClick={() => handleSort('id')} className="flex items-center gap-1 hover:text-white transition-colors text-left">ID <SortIcon field="id" /></button>
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-white transition-colors text-left">Vendor Name <SortIcon field="name" /></button>
                  <div>Contact Person</div>
                  <div>Category</div>
                  <button onClick={() => handleSort('date')} className="flex items-center gap-1 hover:text-white transition-colors text-left">Registration Date <SortIcon field="date" /></button>
                  <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-white transition-colors text-left">Status <SortIcon field="status" /></button>
                  <div className="text-right">Action</div>
               </div>

               {/* Loading — skeleton rows */}
               {isLoadingVendors && (
                  <div className="divide-y divide-emerald-500/20">
                     {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="grid gap-2 px-5 py-4 items-center" style={{ gridTemplateColumns: '1.5rem 2.5rem 1fr 0.8fr 1fr 1fr 0.8fr 6rem', animationDelay: `${i * 60}ms` }}>
                           <div className="w-3.5 h-3.5 rounded bg-white/5 animate-pulse" />
                           <div className="h-3 w-8 rounded bg-white/5 animate-pulse" />
                           <div className="space-y-1.5">
                              <div className="h-3 w-32 rounded bg-white/8 animate-pulse" />
                              <div className="h-2.5 w-24 rounded bg-white/5 animate-pulse" />
                           </div>
                           <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                           <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
                           <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
                           <div className="h-6 w-20 rounded-full bg-white/5 animate-pulse" />
                           <div className="flex justify-end gap-1">
                              <div className="w-7 h-7 rounded-lg bg-white/5 animate-pulse" />
                              <div className="w-7 h-7 rounded-lg bg-white/5 animate-pulse" />
                           </div>
                        </div>
                     ))}
                  </div>
               )}

               {/* Empty */}
               {!isLoadingVendors && filteredVendors.length === 0 && (
                  <div className="py-20 text-center">
                     <Users className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                     <p className="text-white font-bold uppercase tracking-widest text-sm">No vendor registrations found</p>
                     <p className="text-slate-300 text-xs mt-1">Adjust your filters or wait for new submissions.</p>
                  </div>
               )}

               {/* Rows */}
               {!isLoadingVendors && pageVendors.map((vendor, idx) => {
                  const statusL = (vendor.status || 'pending').toLowerCase();
                  const isSelected = selectedVendorIds.includes(vendor.id);
                  const catDisplay = (vendor.vendor_category || vendor.categories?.join(', ') || '').split(',')[0]?.trim() || '—';
                  const regDate = vendor.created_at ? new Date(vendor.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                  const isToday = vendor.created_at && new Date(vendor.created_at).setHours(0, 0, 0, 0) === todayMs;
                  const daysPending = vendor.created_at && !isToday && !['approved','complete','rejected'].includes(statusL)
                     ? Math.floor((Date.now() - new Date(vendor.created_at).getTime()) / 86400000) : 0;
                  const isUrgent = daysPending >= 7;
                  const isWarning = daysPending >= 3 && daysPending < 7;

                  // Left border strip color by status
                  const borderColors: Record<string, string> = {
                     approved: '#10b981', complete: '#10b981',
                     pending: '#f97316', observation: '#f97316',
                     rejected: '#ef4444'
                  };
                  const leftBorderColor = borderColors[statusL] || '#f97316';

                  return (
                     <div
                        key={vendor.id}
                        className={`vendor-row grid gap-2 px-5 py-4 items-center border-b border-emerald-500/50 last:border-0 transition-all duration-200 group ${
                           isSelected ? 'bg-red-600/10' :
                           isUrgent ? 'bg-red-500/[0.05] hover:bg-red-500/[0.08]' :
                           idx % 2 === 0 ? 'hover:bg-white/[0.025]' : 'bg-white/[0.015] hover:bg-white/[0.04]'
                        }`}
                        style={{
                           gridTemplateColumns: '1.5rem 2.5rem 1fr 0.8fr 1fr 1fr 0.8fr 6rem',
                           borderLeft: `3px solid ${leftBorderColor}40`,
                           animationDelay: `${idx * 35}ms`,
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = leftBorderColor; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = `${leftBorderColor}40`; }}
                     >
                        {/* Checkbox */}
                        <div>
                           <input
                              type="checkbox"
                              className="accent-red-500 w-3.5 h-3.5 cursor-pointer"
                              checked={isSelected}
                              onChange={e => {
                                 if (e.target.checked) setSelectedVendorIds(p => [...p, vendor.id]);
                                 else setSelectedVendorIds(p => p.filter(id => id !== vendor.id));
                              }}
                           />
                        </div>

                        {/* ID */}
                        <div className="text-[11px] font-bold text-slate-300">
                           #{String(vendor.id || '').slice(-4) || idx + 1}
                        </div>

                        {/* Vendor Name */}
                        <div className="min-w-0">
                           <p className="text-sm font-bold text-slate-200 leading-tight truncate">{vendor.company_name || vendor.companyName}</p>
                           <p className="text-[11px] text-slate-400 truncate">{vendor.email}</p>
                        </div>

                        {/* Contact Person */}
                        <div className="text-xs text-slate-300 truncate">
                           {vendor.contact_person || vendor.authorizedPerson || '—'}
                        </div>

                        {/* Category */}
                        <div className="text-xs text-slate-300 truncate" title={vendor.vendor_category}>
                           {catDisplay}
                        </div>

                        {/* Registration Date */}
                        <div>
                           <p className="text-xs text-slate-300">{regDate}</p>
                           {isToday && <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">● Today</p>}
                           {isUrgent && <p className="text-[9px] font-black text-red-400 uppercase tracking-widest flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{daysPending}d — URGENT</p>}
                           {isWarning && <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{daysPending}d pending</p>}
                        </div>

                        {/* Status — click to change inline */}
                        <div className="relative" ref={openStatusMenuId === vendor.id ? statusMenuRef : undefined}>
                           <button
                              onClick={() => setOpenStatusMenuId(openStatusMenuId === vendor.id ? null : vendor.id)}
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                              title="Click to change status"
                           >
                              <StatusPill status={vendor.status || 'pending'} />
                           </button>
                           {openStatusMenuId === vendor.id && (
                              <div className="absolute left-0 top-full mt-1 z-50 rounded-xl border border-white/10 shadow-2xl p-1 min-w-[140px]"
                                 style={{ background: '#141e30' }}>
                                 {[
                                    { value: 'approved', label: 'COMPLETED', color: 'text-emerald-400', hover: 'hover:bg-emerald-500/10' },
                                    { value: 'pending', label: 'OBSERVATION', color: 'text-orange-400', hover: 'hover:bg-orange-500/10' },
                                    { value: 'rejected', label: 'REJECTED', color: 'text-red-400', hover: 'hover:bg-red-500/10' },
                                 ].map(opt => (
                                    <button key={opt.value}
                                       onClick={() => handleStatusChange(vendor.id, opt.value)}
                                       className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-black ${opt.color} ${opt.hover} transition-colors`}
                                    >
                                       {opt.label}
                                    </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-1">
                           <Link
                              to={`/admin/vendors/${vendor.id}`}
                              title="View Details"
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                           >
                              <Eye className="w-3.5 h-3.5" />
                           </Link>
                           {statusL === 'pending' && (
                              <>
                                 <button
                                    onClick={() => handleApproveVendor(vendor.id)}
                                    title="Approve"
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                                 >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                 </button>
                                 <button
                                    onClick={() => handleRejectVendor(vendor.id)}
                                    title="Reject"
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                 >
                                    <XCircle className="w-3.5 h-3.5" />
                                 </button>
                              </>
                           )}
                        </div>
                     </div>
                  );
               })}
                  </div>
               </div>

               {/* Pagination */}
               {sortedVendors.length > VENDORS_PER_PAGE && (
                  <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
                     <p className="text-xs text-slate-500">
                        Showing <span className="text-white font-bold">{(vendorPage - 1) * VENDORS_PER_PAGE + 1}–{Math.min(vendorPage * VENDORS_PER_PAGE, sortedVendors.length)}</span> of <span className="text-white font-bold">{sortedVendors.length}</span>
                     </p>
                     <div className="flex items-center gap-1">
                        <button
                           onClick={() => setVendorPage(p => Math.max(1, p - 1))}
                           disabled={vendorPage === 1}
                           className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                           ← Prev
                        </button>
                        <div className="flex items-center gap-1 mx-1">
                           {(() => {
                              const pages: (number | '...')[] = [];
                              if (totalPages <= 7) {
                                 for (let i = 1; i <= totalPages; i++) pages.push(i);
                              } else {
                                 pages.push(1);
                                 if (vendorPage > 3) pages.push('...');
                                 for (let i = Math.max(2, vendorPage - 1); i <= Math.min(totalPages - 1, vendorPage + 1); i++) pages.push(i);
                                 if (vendorPage < totalPages - 2) pages.push('...');
                                 pages.push(totalPages);
                              }
                              return pages.map((p, i) => p === '...' ? (
                                 <span key={`e${i}`} className="w-8 text-center text-slate-600 text-xs">…</span>
                              ) : (
                                 <button key={p}
                                    onClick={() => setVendorPage(p as number)}
                                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                                       p === vendorPage
                                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                          : 'text-slate-500 hover:text-white hover:bg-white/8'
                                    }`}
                                 >{p}</button>
                              ));
                           })()}
                        </div>
                        <button
                           onClick={() => setVendorPage(p => Math.min(totalPages, p + 1))}
                           disabled={vendorPage === totalPages}
                           className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                           Next →
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Bulk action bar */}
         <BulkActionBar
            selectedIds={selectedVendorIds}
            onClearSelection={() => setSelectedVendorIds([])}
            onRefresh={fetchVendorData}
            onSendReminder={() => setReminderModal('preview')}
            reminderCount={selectedObservationVendors.length}
         />
       </div>
      </>
   );
};

export default VendorAdmin;
