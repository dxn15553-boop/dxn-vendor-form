import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Loader2,
  ArrowLeft,
  Upload,
  DollarSign,
  Truck,
  HelpCircle,
} from 'lucide-react';
import { uploadVendorDocument } from '../services/SupabaseService';

interface RfqInvitationData {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorEmail: string;
  status: string;
  accessKey: string;
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
    termsAndConditions?: string;
  };
  quotations: any[];
}

const PROCUREMENT_API_URL =
  import.meta.env.VITE_PROCUREMENT_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://procurement-web-app-dun.vercel.app');

const VendorQuotationSubmit: React.FC = () => {
  const { accessKey } = useParams<{ accessKey: string }>();
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState<RfqInvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [unitPrice, setUnitPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [gstRate, setGstRate] = useState<number>(18);
  const [freightCharges, setFreightCharges] = useState<number | ''>(0);
  const [otherCharges, setOtherCharges] = useState<number | ''>(0);

  const [leadTimeDays, setLeadTimeDays] = useState<number | ''>(15);
  const [paymentTerms, setPaymentTerms] = useState('30 Days Credit after delivery & inspection');
  const [deliveryTerms, setDeliveryTerms] = useState('FOR Destination - Mandapally, Siddipet');
  const [validityDays, setValidityDays] = useState<number | ''>(60);
  const [remarks, setRemarks] = useState('');
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  useEffect(() => {
    if (accessKey) {
      loadInvitation(accessKey);
    }
  }, [accessKey]);

  const loadInvitation = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${PROCUREMENT_API_URL}/api/vendor-rfqs/${key}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load RFQ details');
      }
      setInvitation(data.invitation);
      if (data.invitation?.rfq?.quantity) {
        setQuantity(data.invitation.rfq.quantity);
      }
      if (data.invitation?.quotations && data.invitation.quotations.length > 0) {
        const q = data.invitation.quotations[0];
        const qty = data.invitation.rfq?.quantity || 1;
        setUnitPrice(q.baseAmount / qty);
        setFreightCharges(q.freightCharges || 0);
        setOtherCharges(q.otherCharges || 0);
        if (q.leadTimeDays) setLeadTimeDays(q.leadTimeDays);
        if (q.paymentTerms) setPaymentTerms(q.paymentTerms);
        if (q.deliveryTerms) setDeliveryTerms(q.deliveryTerms);
        if (q.remarks) setRemarks(q.remarks);
      }
    } catch (err: any) {
      console.error('Error loading invitation:', err);
      if (typeof window !== 'undefined' && window.location.protocol === 'https:' && PROCUREMENT_API_URL.startsWith('http://localhost')) {
        setError('Cannot connect to Procurement service from secure domain (Mixed content / VITE_PROCUREMENT_API_URL not configured).');
      } else {
        setError(err.message || 'Unable to connect to Procurement RFQ system.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const calcBaseAmount = (typeof unitPrice === 'number' ? unitPrice : 0) * (quantity || 1);
  const calcTaxAmount = (calcBaseAmount * (typeof gstRate === 'number' ? gstRate : 0)) / 100;
  const calcFreight = typeof freightCharges === 'number' ? freightCharges : 0;
  const calcOther = typeof otherCharges === 'number' ? otherCharges : 0;
  const calcTotalAmount = calcBaseAmount + calcTaxAmount + calcFreight + calcOther;

  const handleSubmitQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitation || !accessKey) return;
    if (typeof unitPrice !== 'number' || unitPrice <= 0) {
      alert('Please enter a valid unit price.');
      return;
    }

    setIsSubmitting(true);
    try {
      let documentUrl: string | null = null;

      // Upload quotation PDF if provided
      if (quotationFile) {
        setUploadingDoc(true);
        try {
          documentUrl = await uploadVendorDocument(invitation.vendorId, quotationFile);
        } catch (uploadErr) {
          console.warn('Document storage upload notice:', uploadErr);
        } finally {
          setUploadingDoc(false);
        }
      }

      const payload = {
        accessKey,
        rfqVendorId: invitation.id,
        baseAmount: calcBaseAmount,
        taxAmount: calcTaxAmount,
        freightCharges: calcFreight,
        otherCharges: calcOther,
        leadTimeDays: leadTimeDays || null,
        paymentTerms,
        deliveryTerms,
        validityDays: validityDays || null,
        documentUrl,
        remarks,
        items: [
          {
            description: invitation.rfq.title,
            quantity: quantity || 1,
            unit: invitation.rfq.unit || 'Nos',
            unitPrice: unitPrice,
            taxRate: gstRate,
            totalPrice: calcTotalAmount,
          },
        ],
      };

      const res = await fetch(`${PROCUREMENT_API_URL}/api/vendor-rfqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quotation.');
      }

      setSubmittedSuccessfully(true);
    } catch (err: any) {
      console.error('Error submitting quotation:', err);
      alert(err.message || 'Quotation submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-red-500 mr-3" />
        <span>Loading RFQ details from Procurement...</span>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-8">
        <div className="bg-neutral-800 border border-neutral-700 p-8 rounded-xl max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold">RFQ Not Accessible</h2>
          <p className="text-sm text-neutral-400">{error || 'This RFQ link is invalid or expired.'}</p>
          <Link
            to="/vendor/rfqs"
            className="inline-block px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Return to RFQ Inbox
          </Link>
        </div>
      </div>
    );
  }

  if (submittedSuccessfully) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-8">
        <div className="bg-neutral-800 border border-emerald-800 p-8 rounded-xl max-w-lg text-center space-y-4 shadow-2xl">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-black">Quotation Submitted Successfully!</h2>
          <p className="text-sm text-neutral-300">
            Thank you, <strong>{invitation.vendorName}</strong>. Your quotation for{' '}
            <strong className="text-red-400">{invitation.rfq.rfqNumber}</strong> has been transmitted to DXN Procurement for Comparative Statement (CS) evaluation.
          </p>
          <div className="bg-neutral-900 p-4 rounded-lg font-mono text-sm text-neutral-300">
            Total Quoted Value: <span className="text-emerald-400 font-bold">₹{calcTotalAmount.toLocaleString()}</span>
          </div>
          <Link
            to="/vendor/rfqs"
            className="inline-block px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors mt-4"
          >
            Back to RFQ Inbox
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/vendor/rfqs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to RFQ Inbox</span>
        </Link>

        {/* RFQ Header Card */}
        <div className="bg-neutral-800/80 border border-neutral-700 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-700/60 pb-4 flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-red-400 bg-red-950/60 border border-red-900 px-2.5 py-0.5 rounded">
                  {invitation.rfq.rfqNumber}
                </span>
                <span className="text-xs text-neutral-500">·</span>
                <span className="font-mono text-xs text-neutral-400">Ref: {invitation.rfq.sourceNo}</span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1">{invitation.rfq.title}</h1>
            </div>

            <div className="text-right text-xs">
              <span className="text-neutral-400">Quotation Deadline:</span>
              <div className="font-mono font-bold text-red-400 text-sm">
                {new Date(invitation.rfq.submissionDeadline).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="text-xs space-y-2 text-neutral-300">
            <p>
              <strong>Specifications:</strong> {invitation.rfq.specifications || invitation.rfq.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-neutral-400">
              <div>
                Quantity: <strong className="text-white">{invitation.rfq.quantity || 1} {invitation.rfq.unit || 'Units'}</strong>
              </div>
              <div>
                Delivery: <strong className="text-white">{invitation.rfq.deliveryLocation || 'Mandapally, Siddipet'}</strong>
              </div>
              <div>
                Invited Vendor: <strong className="text-white">{invitation.vendorName}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Locked Status Banner if Already Submitted */}
        {invitation.quotations && invitation.quotations.length > 0 && (
          <div className="bg-emerald-950/40 border border-emerald-700/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-200">
                  Official Quotation Submitted ({invitation.quotations[0].quotationNo})
                </div>
                <div className="text-xs text-emerald-400 mt-0.5">
                  Submitted on {new Date(invitation.quotations[0].submittedAt).toLocaleDateString()} · Locked for Comparative Statement evaluation
                </div>
              </div>
            </div>
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-600 text-white shadow-sm shrink-0 self-start sm:self-auto">
              Locked / Submitted
            </span>
          </div>
        )}

        {/* Quotation Submission Form */}
        <form onSubmit={handleSubmitQuotation} className="bg-neutral-800/80 border border-neutral-700 rounded-xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-neutral-700 pb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-red-500" />
            <span>Commercial & Quotation Submission</span>
          </h2>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-300">
                Unit Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white font-mono focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300">GST / Tax Rate (%)</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(parseFloat(e.target.value))}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white font-mono"
              >
                <option value={0}>0% (Exempt)</option>
                <option value={5}>5% GST</option>
                <option value={12}>12% GST</option>
                <option value={18}>18% GST (Standard)</option>
                <option value={28}>28% GST</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-300">Freight & Delivery (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={freightCharges}
                onChange={(e) => setFreightCharges(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white font-mono"
              />
            </div>
          </div>

          {/* Computed Summary Banner */}
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Base Value</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">₹{calcBaseAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Tax ({gstRate}%)</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">₹{calcTaxAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Freight / Other</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">₹{(calcFreight + calcOther).toLocaleString()}</div>
            </div>
            <div className="bg-red-950/40 p-2 rounded-lg border border-red-900/60">
              <div className="text-[11px] text-red-300 font-bold uppercase tracking-wider">Total Quoted (₹)</div>
              <div className="text-base font-black font-mono text-emerald-400 mt-0.5">₹{calcTotalAmount.toLocaleString()}</div>
            </div>
          </div>

          {/* Delivery & Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-300">Lead Time (Days)</label>
              <input
                type="number"
                min="1"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-300">Payment Terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-300">Quotation Validity (Days)</label>
              <input
                type="number"
                min="1"
                value={validityDays}
                onChange={(e) => setValidityDays(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                className="mt-1 w-full bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <label className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Attach Quotation Document (PDF / Excel)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => setQuotationFile(e.target.files?.[0] || null)}
              className="mt-1 w-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 px-3 py-2 rounded-lg file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
            />
          </div>

          {/* Remarks */}
          <div>
            <label className="text-xs font-bold text-neutral-300">
              Technical Compliance & Remarks (Optional)
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Confirm compliance with required specifications, deviations if any, warranty terms..."
              className="mt-1 w-full bg-neutral-900 border border-neutral-700 text-xs text-white p-3 rounded-lg focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="pt-2 border-t border-neutral-700 flex items-center justify-between">
            <Link
              to="/vendor/rfqs"
              className="px-4 py-2 border border-neutral-700 hover:bg-neutral-800 rounded-lg text-xs font-semibold text-neutral-400"
            >
              Back
            </Link>
            {invitation.quotations && invitation.quotations.length > 0 ? (
              <div className="text-xs text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/80 px-4 py-2.5 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Quotation is locked and under evaluation. Revisions cannot be made.</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || typeof unitPrice !== 'number' || unitPrice <= 0}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isSubmitting ? 'Submitting Quotation...' : 'Submit Quotation to DXN'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorQuotationSubmit;
