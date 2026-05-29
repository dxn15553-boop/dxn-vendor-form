
import React, { useState, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ShieldCheck, FileText, Upload, CheckCircle, ArrowRight, Building, Mail, Phone, Tag } from 'lucide-react';
import { createVendorProfile, uploadVendorDocument, updateVendor } from '../services/FirebaseService';

const VendorRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    taxId: '',
    specialities: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Create Base Profile
      const vendorId = await createVendorProfile({
        ...formData,
        specialities: formData.specialities.split(',').map(s => s.trim())
      });

      // 2. Upload Document if exists
      if (file) {
         try {
           const downloadUrl = await uploadVendorDocument(vendorId, file);
           
           // 3. Update Profile with Document URL
           await updateVendor(vendorId, {
              documents: [{
                 name: file.name,
                 url: downloadUrl,
                 type: file.type,
                 uploadedAt: Date.now()
              }]
           });
         } catch (uploadError) {
           console.error("Document upload failed, but profile created", uploadError);
         }
      }

      setStep(3);
    } catch (err) {
      // Fallback for simulation if keys are missing or network fails
      console.warn("Submitting to Local Storage (Simulation Mode/Network Fail)");
      const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
      
      const newVendor = { 
        ...formData, 
        id: Date.now(), 
        status: 'pending',
        createdAt: Date.now(),
        products: [],
        documents: file ? [{ name: file.name, url: '#', type: file.type }] : []
      };
      
      saved.push(newVendor);
      localStorage.setItem('dxn_pending_vendors', JSON.stringify(saved));
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-neutral-950">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {step === 1 && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <SectionTitle subtitle="Partnership" title="Vendor Onboarding Portal" light />
            <p className="text-2xl text-neutral-400 font-light leading-relaxed mb-12">
              Join the DXN Global supply chain. We are looking for elite manufacturing partners, raw material suppliers, and technical service providers who align with our <span className="text-white font-bold">"One World One Market"</span> philosophy.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-10 bg-neutral-900 border border-white/5 hover:border-red-600/30 transition-all">
                <ShieldCheck className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Compliance First</h3>
                <p className="text-neutral-500 text-sm">All vendors must adhere to DXN’s global quality standards (GMP, ISO, Halal).</p>
              </div>
              <div className="p-10 bg-neutral-900 border border-white/5 hover:border-red-600/30 transition-all">
                <FileText className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Documented Excellence</h3>
                <p className="text-neutral-500 text-sm">Valid Tax IDs (GST/PAN) and Speciality Certifications are mandatory.</p>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="bg-red-600 text-white px-12 py-6 text-lg font-black uppercase tracking-widest flex items-center gap-4 hover:bg-white hover:text-black transition-all"
            >
              Begin Registration <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-3xl mx-auto bg-neutral-900 border border-white/10 p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-8 border-b border-white/5 pb-6">Entity Verification</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"><Building className="w-3 h-3" /> Company Legal Name</label>
                  <input required name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"><Mail className="w-3 h-3" /> Corporate Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"><Phone className="w-3 h-3" /> Contact Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"><CheckCircle className="w-3 h-3" /> GST / PAN Number</label>
                  <input required name="taxId" value={formData.taxId} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2"><Tag className="w-3 h-3" /> Manufacturing Specialities (Comma Separated)</label>
                <input required name="specialities" placeholder="e.g. Raw Material, Packaging, Lab Services" value={formData.specialities} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">Facility Capabilities Overview</label>
                <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all resize-none" />
              </div>

              <div 
                className={`p-8 bg-black border border-dashed text-center group cursor-pointer transition-colors ${file ? 'border-green-600' : 'border-white/10 hover:border-red-600'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  accept=".pdf,.doc,.docx"
                />
                {file ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">{file.name}</p>
                    <p className="text-[9px] text-neutral-500 mt-2">Ready for Upload</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-neutral-600 mx-auto mb-4 group-hover:text-red-600 transition-colors" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Click to Upload Company Profile (PDF)</p>
                  </>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-6 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? 'Securing Data...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in duration-700">
             <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-600/20">
                <CheckCircle className="w-12 h-12 text-white" />
             </div>
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-none">Application Under Review</h2>
             <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
               Your entity credentials have been logged in the DXN Manufacturing ecosystem. Our vendor audit team will review your specialities and tax compliance within <span className="text-white font-bold">3-5 business days</span>.
             </p>
             <div className="bg-neutral-900 border border-white/5 p-8 inline-block text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2">Protocol Reference</p>
                <p className="text-neutral-400 text-xs font-mono">APP-ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VendorRegistration;
