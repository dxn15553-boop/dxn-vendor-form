import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, ArrowRight, ShieldCheck, Mail, Building } from 'lucide-react';

const VendorRfqInbox: React.FC = () => {
  const [tokenInput, setTokenInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOpenToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = tokenInput.trim();
    if (!token) {
      setError('Please paste your RFQ access key.');
      return;
    }
    setError('');
    navigate(`/vendor/rfqs/${token}`);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-neutral-800/90 border border-neutral-700/80 rounded-2xl p-7 sm:p-9 shadow-2xl space-y-6 text-center backdrop-blur-md relative">
        {/* Top Icon */}
        <div className="w-14 h-14 bg-red-600/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-500 shadow-inner">
          <KeyRound className="w-7 h-7" />
        </div>

        {/* Title & Short Tagline */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-500 bg-red-950/40 px-2.5 py-0.5 rounded-full border border-red-900/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Confidential Procurement</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Vendor Quotation Portal
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
            Enter your invitation key or click the direct link sent to your company email to submit pricing.
          </p>
        </div>

        {/* Clean Single Form */}
        <form onSubmit={handleOpenToken} className="space-y-3 text-left">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              autoFocus
              placeholder="Paste RFQ access key (e.g. cm...)"
              value={tokenInput}
              onChange={(e) => {
                setTokenInput(e.target.value);
                if (error) setError('');
              }}
              className="w-full bg-neutral-900 border border-neutral-700 text-neutral-100 text-xs font-mono pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-500"
            />
          </div>

          {error && <p className="text-[11px] text-red-400 text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={!tokenInput.trim()}
            className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 cursor-pointer disabled:cursor-not-allowed active:scale-98"
          >
            <span>Open Quotation Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Minimal Footer Links */}
        <div className="pt-4 border-t border-neutral-700/60 flex items-center justify-between text-xs text-neutral-400">
          <Link
            to="/vendor/register"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-neutral-500" />
            <span>New Vendor Register</span>
          </Link>
          <span className="text-neutral-600">·</span>
          <a
            href="mailto:dxn15553@gmail.com"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            <span>Need Help?</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VendorRfqInbox;
