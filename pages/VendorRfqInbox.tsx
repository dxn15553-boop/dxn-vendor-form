import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Loader2,
  Layers,
  DollarSign
} from 'lucide-react';

interface RfqInvitation {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  status: string; // 'INVITED' | 'VIEWED' | 'SUBMITTED' | 'DECLINED'
  accessKey: string;
  createdAt: string;
  rfq: {
    id: string;
    rfqNumber: string;
    sourceNo: string;
    title: string;
    description: string;
    specifications?: string;
    quantity?: number;
    unit?: string;
    submissionDeadline: string;
    deliveryLocation?: string;
    status: string;
  };
  quotations: {
    id: string;
    quotationNo: string;
    totalAmount: number;
    baseAmount: number;
    taxAmount: number;
    status: string;
    submittedAt: string;
    documentUrl?: string;
  }[];
}

const PROCUREMENT_API_URL = import.meta.env.VITE_PROCUREMENT_API_URL || 'http://localhost:3001';

const VendorRfqInbox: React.FC = () => {
  const [vendorEmail, setVendorEmail] = useState('');
  const [rememberEmail, setRememberEmail] = useState(true);
  const [invitations, setInvitations] = useState<RfqInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Check URL query param first: /vendor/rfqs?email=...
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setVendorEmail(emailParam);
      fetchVendorRfqs(emailParam);
      return;
    }

    // Fallback to localStorage
    const saved = localStorage.getItem('dxn_vendor_portal_email');
    if (saved) {
      setVendorEmail(saved);
      fetchVendorRfqs(saved);
    }
  }, []);

  const fetchVendorRfqs = async (emailToFetch: string) => {
    if (!emailToFetch.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      if (rememberEmail) {
        localStorage.setItem('dxn_vendor_portal_email', emailToFetch.trim());
      }
      const res = await fetch(`${PROCUREMENT_API_URL}/api/vendor-rfqs?email=${encodeURIComponent(emailToFetch.trim())}`);
      const data = await res.json();
      if (data.invitations) {
        setInvitations(data.invitations);
      } else {
        setInvitations([]);
      }
    } catch (err) {
      console.error('Error fetching vendor RFQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVendorRfqs(vendorEmail);
  };

  const handleClearSession = () => {
    localStorage.removeItem('dxn_vendor_portal_email');
    setVendorEmail('');
    setInvitations([]);
    setHasSearched(false);
  };

  const recognizedVendorName = invitations[0]?.vendorName;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>DXN India · Vendor Portal</span>
            </div>
            <h1 className="text-3xl font-black text-white">Requests for Quotation (RFQ) Inbox</h1>
            <p className="text-sm text-neutral-400 mt-1">
              Access assigned quotation requests, review material specifications, and submit your competitive pricing directly to DXN Procurement.
            </p>
          </div>

          {hasSearched && vendorEmail && (
            <div className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-xl flex items-center gap-3 shrink-0">
              <div className="text-xs">
                <div className="text-neutral-400 text-[10px] uppercase font-bold">Identified Vendor</div>
                <div className="font-bold text-white text-xs truncate max-w-[200px]">
                  {recognizedVendorName || vendorEmail}
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearSession}
                className="text-[11px] text-red-400 hover:text-red-300 font-semibold underline ml-1"
              >
                Switch
              </button>
            </div>
          )}
        </div>

        {/* Vendor Email Authentication Box - Only show when not yet recognized or on edit */}
        {(!hasSearched || invitations.length === 0) && (
          <div className="bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-6 backdrop-blur-sm shadow-xl">
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="Enter your registered vendor email (e.g., info@company.com)..."
                  value={vendorEmail}
                  onChange={(e) => setVendorEmail(e.target.value)}
                  className="w-full bg-neutral-900/90 border border-neutral-700 text-neutral-100 text-sm pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !vendorEmail.trim()}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Find My RFQs</span>
              </button>
            </form>
            <div className="flex items-center justify-between text-xs text-neutral-400 mt-3 pt-3 border-t border-neutral-700/50">
              <span>Use the official email registered during vendor onboarding.</span>
              <Link to="/vendor/register" className="text-red-400 hover:underline">
                Need to register as a new vendor?
              </Link>
            </div>
          </div>
        )}

        {/* Invitations List */}
        {loading ? (
          <div className="text-center py-16 bg-neutral-800/30 rounded-xl border border-neutral-800">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-red-500 mb-3" />
            <p className="text-sm text-neutral-400">Loading your RFQ assignments from Procurement...</p>
          </div>
        ) : hasSearched && invitations.length === 0 ? (
          <div className="text-center py-16 bg-neutral-800/30 rounded-xl border border-neutral-800 p-8 space-y-3">
            <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Active RFQs Found</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              There are currently no open Requests for Quotation assigned to <strong className="text-neutral-200">{vendorEmail}</strong>. When DXN Procurement selects your company for bidding, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((inv) => {
              const hasQuote = inv.quotations && inv.quotations.length > 0;
              const latestQuote = hasQuote ? inv.quotations[0] : null;
              const isDeadlinePassed = new Date() > new Date(inv.rfq.submissionDeadline);

              return (
                <div
                  key={inv.id}
                  className="bg-neutral-800/70 border border-neutral-700 rounded-xl p-6 transition-all hover:border-neutral-600 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-black text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded">
                        {inv.rfq.rfqNumber}
                      </span>
                      <span className="text-xs text-neutral-500">·</span>
                      <span className="font-mono text-xs text-neutral-400">
                        Ref: {inv.rfq.sourceNo}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          hasQuote
                            ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800'
                            : isDeadlinePassed
                            ? 'bg-neutral-800 text-neutral-400'
                            : 'bg-amber-950/70 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {hasQuote ? 'Quotation Submitted' : isDeadlinePassed ? 'Deadline Expired' : 'Pending Quotation'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white">{inv.rfq.title}</h2>

                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {inv.rfq.specifications || inv.rfq.description}
                    </p>

                    <div className="flex items-center gap-6 text-xs text-neutral-400 pt-1 flex-wrap">
                      {inv.rfq.quantity && (
                        <span>
                          <strong>Qty:</strong> {inv.rfq.quantity} {inv.rfq.unit || 'Units'}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Deadline: {new Date(inv.rfq.submissionDeadline).toLocaleDateString()}</span>
                      </span>
                      {inv.rfq.deliveryLocation && (
                        <span className="line-clamp-1">Loc: {inv.rfq.deliveryLocation}</span>
                      )}
                    </div>

                    {hasQuote && (
                      <div className="mt-2 text-xs text-emerald-400 flex items-center gap-2 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Submitted {latestQuote?.quotationNo}: <strong>₹{latestQuote?.totalAmount.toLocaleString()}</strong> on {new Date(latestQuote!.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3">
                    <Link
                      to={`/vendor/rfqs/${inv.accessKey}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-all ${
                        hasQuote
                          ? 'bg-neutral-700 hover:bg-neutral-600 text-white'
                          : isDeadlinePassed
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      <span>{hasQuote ? 'View Submitted Quote' : 'Submit Quotation'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRfqInbox;
