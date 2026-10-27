import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ExternalLink,
  FileCheck2,
  AlertTriangle,
  Building,
  HelpCircle
} from 'lucide-react';

const VendorRfqInbox: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOpenToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = tokenInput.trim();
    if (!token) {
      setError('Please paste your unique RFQ access token.');
      return;
    }
    setError('');
    // Navigate directly to token-protected submission screen
    navigate(`/vendor/rfqs/${token}`);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 mb-2 bg-red-950/40 border border-red-900/60 px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span>Confidential & Secured Procurement Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Vendor Quotation Access
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              DXN Manufacturing India operates a closed, confidential RFQ system. Active quotation requests are restricted exclusively to invited, verified suppliers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Token-Encrypted Access</span>
          </div>
        </div>

        {/* Security Notice Card */}
        <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/90 border border-neutral-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">How do I access my assigned RFQs?</h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  For strict bid integrity and commercial secrecy, <strong>public email lookups are permanently disabled</strong>. Bidders cannot view or submit competitive quotations without their unique invitation key.
                </p>
              </div>
            </div>

            {/* 3 Step Workflow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span>1. Check Email</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  DXN Procurement sends an invitation to your verified representative's email address whenever your company is invited to bid.
                </p>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <KeyRound className="w-4 h-4 text-red-500" />
                  <span>2. Magic Link</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Click the <strong>"Submit Quotation Online"</strong> button inside your invitation email to open your dedicated, tamper-proof form.
                </p>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <FileCheck2 className="w-4 h-4 text-emerald-500" />
                  <span>3. Lock In Bid</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Enter your rates, GST %, and lead times. Your bid is cryptographically signed and immediately locked for evaluation.
                </p>
              </div>
            </div>

            {/* Direct Token Entry Box */}
            <div className="mt-8 pt-6 border-t border-neutral-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2 mb-3">
                <KeyRound className="w-4 h-4 text-red-500" />
                <span>Already have an RFQ Access Token?</span>
              </h4>
              <form onSubmit={handleOpenToken} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Paste your RFQ security token (e.g. cm...)"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="w-full bg-neutral-950/90 border border-neutral-700 text-neutral-100 text-xs font-mono pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!tokenInput.trim()}
                  className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-red-900/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Open Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            </div>
          </div>
        </div>

        {/* Bottom Help & Registration Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-800/40 border border-neutral-800 p-5 rounded-xl flex items-start gap-3">
            <Building className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">New Supplier Onboarding</div>
              <p className="text-xs text-neutral-400 mt-1">
                Not registered yet? Submit your company profile and certifications to become an approved DXN vendor.
              </p>
              <Link
                to="/vendor/register"
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold mt-2"
              >
                <span>Register as a New Vendor</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-neutral-800/40 border border-neutral-800 p-5 rounded-xl flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Procurement Helpdesk</div>
              <p className="text-xs text-neutral-400 mt-1">
                If your company was selected for an RFQ but you haven't received your invitation link, please contact:
              </p>
              <div className="text-xs font-mono text-neutral-300 font-semibold mt-2">
                dxn15553@gmail.com · DXN India Procurement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRfqInbox;
