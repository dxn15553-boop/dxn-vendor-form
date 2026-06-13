import React, { useState, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ShieldCheck, FileText, Upload, CheckCircle, ArrowRight, Building, Mail, Phone, Tag } from 'lucide-react';

const FileUploadField = ({
  label,
  icon: Icon,
  file,
  onFileSelect
}: {
  label: string;
  icon: any;
  file: File | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOptional = label.toLowerCase().includes('if applicable') || 
                     label.toLowerCase().includes('if available') || 
                     label.toLowerCase().includes('optional');

  return (
    <div className="flex flex-col h-full gap-2">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 shrink-0">
        <span className="text-base">{file ? '✅' : '⬜'}</span> <Icon className="w-3 h-3" /> 
        <span>{label} {!isOptional && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
      </label>
      <div
        className={`p-4 bg-black border border-dashed text-center group cursor-pointer transition-colors flex-grow flex flex-col justify-center min-h-[100px] ${file ? 'border-green-600' : 'border-white/10 hover:border-red-600'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={onFileSelect}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        {file ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white truncate max-w-full px-2">{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="w-5 h-5 text-neutral-600 group-hover:text-red-600 transition-colors" />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Upload Document</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TextInputField = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  isValid
}: {
  label: string;
  icon: any;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  isValid?: boolean;
}) => {
  const isOptional = label.toLowerCase().includes('if applicable') || 
                     label.toLowerCase().includes('if available') || 
                     label.toLowerCase().includes('optional');

  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
        <span className="text-base">{(isValid !== undefined ? isValid : value.trim() !== '') ? '✅' : '⬜'}</span> <Icon className="w-3 h-3" /> 
        <span>{label} {!isOptional && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
      </label>
      {type === "textarea" ? (
        <textarea
          required={!isOptional}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all resize-none"
        />
      ) : (
        <input
          required={!isOptional}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-black border border-white/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all"
        />
      )}
    </div>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mt-12 mb-6 border-b border-white/10 pb-4 col-span-1 md:col-span-2">
    <h3 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
      {title}
    </h3>
  </div>
);

const VendorRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"Complete" | "Observation">("Complete");

  const [formData, setFormData] = useState({
    companyName: '',
    panNumber: '',
    gstNumber: '',
    email: '',
    phone: '',
    specialities: '',
    description: '',
    authorizedPerson: '',
    escContact: '',
    techTeamStrength: '',
    installedBase: '',
  });

  const [files, setFiles] = useState<Record<string, File | null>>({});

  const [checkboxes, setCheckboxes] = useState({
    verifiedInfo: false,
    documentsUploaded: false,
    authSignatory: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };

  const handleFileSelect = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const fileToBase64 = (file: File, key: string, companyName: string): Promise<{ name: string, mimeType: string, base64: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result as string;
        encoded = encoded.split(',')[1];
        const safeCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '_') || 'Vendor';
        const formattedName = `[${key.toUpperCase()}] ${safeCompanyName} - ${file.name}`;
        resolve({ name: formattedName, mimeType: file.type, base64: encoded });
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(formData.panNumber)) {
      alert("Please enter valid PAN details.");
      return;
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
    if (!gstRegex.test(formData.gstNumber)) {
      alert("Please enter valid GST details.");
      return;
    }

    if (!checkboxes.verifiedInfo || !checkboxes.documentsUploaded || !checkboxes.authSignatory) {
      alert("Please check all declarations in the Final Submission section.");
      return;
    }

    // Determine Submission Status (Observation vs Complete)
    const requiredFiles = [
      'companyRegistration', 'panCard', 'gstCertificate', 'companyProfile',
      'cancelledCheque', 'bankAccountDetails', 'auditedFinancials', 'itrAcknowledgement',
      'conflictOfInterest', 'antiBribery', 'complianceDecl', 'blacklistingDecl',
      'confidentialityDecl', 'majorCustomerList', 'customerReferences', 'productCatalogue',
      'manufacturingFacility', 'serviceInfrastructure', 'vendorRegistrationForm',
      'codeOfConduct', 'paymentTerms', 'purchaseTerms'
    ];
    
    const missingFiles = requiredFiles.filter(key => !files[key]);
    
    const requiredFields = [
      'companyName', 'panNumber', 'gstNumber', 'email', 'phone', 
      'specialities', 'description', 'authorizedPerson', 'escContact', 
      'techTeamStrength', 'installedBase'
    ];
    
    const missingFields = requiredFields.filter(key => !formData[key as keyof typeof formData].trim());

    if (missingFiles.length > 0 || missingFields.length > 0) {
      alert("Please fill all mandatory fields (marked with *) and upload all required documents.");
      return;
    }

    const currentStatus = "Complete";
    const missingItemsList = [...missingFields, ...missingFiles];

    setSubmissionStatus(currentStatus);
    setIsSubmitting(true);

    try {
      // Save to Local Storage immediately to prevent data loss if GAS fetch fails
      const saved = JSON.parse(localStorage.getItem('dxn_pending_vendors') || '[]');
      const newVendor = {
        ...formData,
        id: Date.now(),
        status: 'pending',
        createdAt: Date.now(),
        products: [],
        declarations: checkboxes,
        documents: Object.entries(files)
          .filter(([_, file]) => file !== null)
          .map(([key, file]) => ({ name: file!.name, key, url: '#', type: file!.type }))
      };
      saved.push(newVendor);
      localStorage.setItem('dxn_pending_vendors', JSON.stringify(saved));
      window.dispatchEvent(new Event('storage'));

      // 1. Convert all attached files to Base64 with identifiable names
      const filePromises = Object.entries(files)
        .filter(([_, file]) => file !== null)
        .map(([key, file]) => fileToBase64(file as File, key, formData.companyName));

      const base64Files = await Promise.all(filePromises);

      // 2. Prepare submitted and missing lists for the email
      const allFormFields = [
        { key: 'companyName', label: 'Company Legal Name' },
        { key: 'panNumber', label: 'PAN Number' },
        { key: 'gstNumber', label: 'GST Number' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Mobile Number' },
        { key: 'specialities', label: 'Manufacturing Specialities' },
        { key: 'description', label: 'Facility Capabilities Overview' },
        { key: 'authorizedPerson', label: 'Authorized Contact Person' },
        { key: 'escContact', label: 'Escalation Contact Details' },
        { key: 'techTeamStrength', label: 'Technical Team Strength' },
        { key: 'installedBase', label: 'Installed Base Details' },
      ];

      const allFileFields = [
        { key: 'companyRegistration', label: 'Company Registration Cert.' },
        { key: 'panCard', label: 'PAN Card' },
        { key: 'gstCertificate', label: 'GST Registration Certificate' },
        { key: 'companyProfile', label: 'Company Profile' },
        { key: 'orgChart', label: 'Organization Chart' },
        { key: 'cancelledCheque', label: 'Cancelled Cheque' },
        { key: 'bankAccountDetails', label: 'Bank Account Details Form' },
        { key: 'msmeCertificate', label: 'MSME Certificate' },
        { key: 'pfRegistration', label: 'PF Registration Certificate' },
        { key: 'esiRegistration', label: 'ESI Registration Certificate' },
        { key: 'profTaxRegistration', label: 'Professional Tax Registration' },
        { key: 'labourLicense', label: 'Labour License' },
        { key: 'auditedFinancials', label: 'Latest Audited Financial Statement' },
        { key: 'itrAcknowledgement', label: 'Income Tax Return Acknowledgement' },
        { key: 'conflictOfInterest', label: 'Conflict of Interest Declaration' },
        { key: 'antiBribery', label: 'Anti-Bribery & Anti-Corruption Declaration' },
        { key: 'complianceDecl', label: 'Compliance Declaration' },
        { key: 'blacklistingDecl', label: 'Blacklisting Declaration' },
        { key: 'confidentialityDecl', label: 'Confidentiality Declaration' },
        { key: 'majorCustomerList', label: 'Major Customer List' },
        { key: 'customerReferences', label: 'Customer References' },
        { key: 'productCatalogue', label: 'Product Catalogue / Service Brochure' },
        { key: 'manufacturingFacility', label: 'Manufacturing Facility Details' },
        { key: 'serviceInfrastructure', label: 'Service Infrastructure Details' },
        { key: 'iso9001', label: 'ISO 9001' },
        { key: 'iso14001', label: 'ISO 14001' },
        { key: 'iso45001', label: 'ISO 45001' },
        { key: 'gmp', label: 'GMP' },
        { key: 'ce', label: 'CE' },
        { key: 'otherCertifications', label: 'Other Relevant Certifications' },
        { key: 'vendorRegistrationForm', label: 'Vendor Registration Form' },
        { key: 'nda', label: 'NDA' },
        { key: 'codeOfConduct', label: 'Code of Conduct Acceptance' },
        { key: 'paymentTerms', label: 'Payment Terms Acceptance' },
        { key: 'purchaseTerms', label: 'Purchase Terms & Conditions Acceptance' },
      ];

      const submittedNames: string[] = [];
      const notSubmittedNames: string[] = [];

      allFormFields.forEach(f => {
        if (formData[f.key as keyof typeof formData]?.trim()) submittedNames.push(f.label);
        else notSubmittedNames.push(f.label);
      });

      allFileFields.forEach(f => {
        if (files[f.key]) submittedNames.push(f.label);
        else notSubmittedNames.push(f.label);
      });

      const submissionSummary = `\n\n--- SUBMISSION DETAILS ---\n\n✅ SUBMITTED ITEMS:\n - ${submittedNames.join('\n - ')}\n\n❌ NOT SUBMITTED ITEMS:\n${notSubmittedNames.length > 0 ? ' - ' + notSubmittedNames.join('\n - ') : 'None'}`;

      // 3. Prepare payload
      const payload = {
        formData: {
          ...formData,
          specialities: formData.specialities.split(',').map(s => s.trim()).join(', '),
          description: formData.description + submissionSummary
        },
        files: base64Files,
        declarations: checkboxes,
        submissionStatus: currentStatus,
        missingItems: missingItemsList.join(', ')
      };

      // 4. Send to Google Apps Script Web App
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfPwcfwqcJl1RFwRb8Lsf1Djn6k-JyzRFA4g7kN8x2NO3mCn1aoyp-MR0-3E57lU5X/exec"

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload)
        });
      } catch (fetchErr) {
        console.warn("GAS Fetch Warning:", fetchErr);
      }

      setStep(3);

    } catch (err: any) {
      console.error("Submission error:", err);
      alert("Submission Error: " + (err.message || err.toString()) + "\n\nPlease check the console for more details.");
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
          <div className="max-w-5xl mx-auto bg-neutral-900 border border-white/10 p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Entity Verification</h2>
            <p className="text-neutral-500 mb-8 border-b border-white/5 pb-6">Please complete the mandatory document checklist.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionHeading title="Section A - Company Information" />

                <div className="space-y-2">
                  <TextInputField label="Company Legal Name" icon={Building} name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                  {/* PAN and GST added below */}
                  <TextInputField 
                    label="PAN Number (e.g. ABCDE1234F)" 
                    icon={FileText} 
                    name="panNumber" 
                    value={formData.panNumber} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="ABCDE1234F" 
                    isValid={/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNumber)}
                  />
                  <TextInputField 
                    label="GST Number (e.g. 22ABCDE1234F1Z5)" 
                    icon={FileText} 
                    name="gstNumber" 
                    value={formData.gstNumber} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="22ABCDE1234F1Z5" 
                    isValid={/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(formData.gstNumber)}
                  />
                </div>
                <FileUploadField label="Company Registration Cert. (ROC/Deed/MSME)" icon={FileText} file={files.companyRegistration} onFileSelect={handleFileSelect('companyRegistration')} />
                <FileUploadField label="PAN Card" icon={FileText} file={files.panCard} onFileSelect={handleFileSelect('panCard')} />
                <FileUploadField label="GST Registration Certificate" icon={FileText} file={files.gstCertificate} onFileSelect={handleFileSelect('gstCertificate')} />
                <FileUploadField label="Company Profile" icon={FileText} file={files.companyProfile} onFileSelect={handleFileSelect('companyProfile')} />
                <FileUploadField label="Organization Chart (Optional)" icon={FileText} file={files.orgChart} onFileSelect={handleFileSelect('orgChart')} />

                <SectionHeading title="Section B - Entity Documentation" />
              <div className="col-span-1 md:col-span-2 text-red-500 text-sm mb-4">
                * Note: Maximum file size is 2MB per document. Please upload compressed PDFs or images.
              </div>
                <FileUploadField label="Cancelled Cheque OR Bank Verification Letter" icon={FileText} file={files.cancelledCheque} onFileSelect={handleFileSelect('cancelledCheque')} />
                <FileUploadField label="Bank Account Details Form" icon={FileText} file={files.bankAccountDetails} onFileSelect={handleFileSelect('bankAccountDetails')} />

                <SectionHeading title="Section C - Statutory Compliance" />
                <FileUploadField label="MSME Certificate (If Applicable)" icon={FileText} file={files.msmeCertificate} onFileSelect={handleFileSelect('msmeCertificate')} />
                <FileUploadField label="PF Registration Certificate (If Applicable)" icon={FileText} file={files.pfRegistration} onFileSelect={handleFileSelect('pfRegistration')} />
                <FileUploadField label="ESI Registration Certificate (If Applicable)" icon={FileText} file={files.esiRegistration} onFileSelect={handleFileSelect('esiRegistration')} />
                <FileUploadField label="Professional Tax Registration (If Applicable)" icon={FileText} file={files.profTaxRegistration} onFileSelect={handleFileSelect('profTaxRegistration')} />
                <FileUploadField label="Labour License (If Applicable)" icon={FileText} file={files.labourLicense} onFileSelect={handleFileSelect('labourLicense')} />

                <SectionHeading title="Section D - Financial Information" />
                <FileUploadField label="Latest Audited Financial Statement (or last 2 yrs)" icon={FileText} file={files.auditedFinancials} onFileSelect={handleFileSelect('auditedFinancials')} />
                <FileUploadField label="Income Tax Return Acknowledgement (Last FY)" icon={FileText} file={files.itrAcknowledgement} onFileSelect={handleFileSelect('itrAcknowledgement')} />

                <SectionHeading title="Section E - Contact Details" />
                <TextInputField label="Authorized Contact Person" icon={Phone} name="authorizedPerson" value={formData.authorizedPerson} onChange={handleInputChange} required />
                <TextInputField label="Mobile Number" icon={Phone} name="phone" value={formData.phone} onChange={handleInputChange} required />
                <TextInputField label="Email Address" icon={Mail} name="email" value={formData.email} onChange={handleInputChange} type="email" required />
                <TextInputField label="Escalation Contact Details" icon={Phone} name="escContact" value={formData.escContact} onChange={handleInputChange} required />

                <SectionHeading title="Section F - Declarations" />
                <FileUploadField label="Conflict of Interest Declaration" icon={FileText} file={files.conflictOfInterest} onFileSelect={handleFileSelect('conflictOfInterest')} />
                <FileUploadField label="Anti-Bribery & Anti-Corruption Declaration" icon={FileText} file={files.antiBribery} onFileSelect={handleFileSelect('antiBribery')} />
                <FileUploadField label="Compliance Declaration" icon={FileText} file={files.complianceDecl} onFileSelect={handleFileSelect('complianceDecl')} />
                <FileUploadField label="Blacklisting Declaration" icon={FileText} file={files.blacklistingDecl} onFileSelect={handleFileSelect('blacklistingDecl')} />
                <FileUploadField label="Confidentiality Declaration" icon={FileText} file={files.confidentialityDecl} onFileSelect={handleFileSelect('confidentialityDecl')} />

                <SectionHeading title="Section G - Quality & Business Capability" />
                <FileUploadField label="Major Customer List" icon={FileText} file={files.majorCustomerList} onFileSelect={handleFileSelect('majorCustomerList')} />
                <FileUploadField label="Customer References" icon={FileText} file={files.customerReferences} onFileSelect={handleFileSelect('customerReferences')} />
                <FileUploadField label="Product Catalogue / Service Brochure" icon={FileText} file={files.productCatalogue} onFileSelect={handleFileSelect('productCatalogue')} />
                <FileUploadField label="Manufacturing Facility Details" icon={Building} file={files.manufacturingFacility} onFileSelect={handleFileSelect('manufacturingFacility')} />
                <FileUploadField label="Service Infrastructure Details" icon={Building} file={files.serviceInfrastructure} onFileSelect={handleFileSelect('serviceInfrastructure')} />
                <TextInputField label="Technical Team Strength" icon={CheckCircle} name="techTeamStrength" value={formData.techTeamStrength} onChange={handleInputChange} />
                <TextInputField label="Installed Base Details" icon={CheckCircle} name="installedBase" value={formData.installedBase} onChange={handleInputChange} />
                <div className="col-span-1 md:col-span-2">
                  <TextInputField label="Manufacturing Specialities (Comma Separated)" icon={Tag} name="specialities" value={formData.specialities} onChange={handleInputChange} required placeholder="e.g. Raw Material, Packaging, Lab Services" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <TextInputField label="Facility Capabilities Overview" icon={FileText} name="description" value={formData.description} onChange={handleInputChange} type="textarea" />
                </div>

                <SectionHeading title="Section H - Certifications (If Available)" />
                <FileUploadField label="ISO 9001 (If Available)" icon={ShieldCheck} file={files.iso9001} onFileSelect={handleFileSelect('iso9001')} />
                <FileUploadField label="ISO 14001 (If Available)" icon={ShieldCheck} file={files.iso14001} onFileSelect={handleFileSelect('iso14001')} />
                <FileUploadField label="ISO 45001 (If Available)" icon={ShieldCheck} file={files.iso45001} onFileSelect={handleFileSelect('iso45001')} />
                <FileUploadField label="GMP (If Available)" icon={ShieldCheck} file={files.gmp} onFileSelect={handleFileSelect('gmp')} />
                <FileUploadField label="CE (If Available)" icon={ShieldCheck} file={files.ce} onFileSelect={handleFileSelect('ce')} />
                <FileUploadField label="Other Relevant Certifications (If Available)" icon={ShieldCheck} file={files.otherCertifications} onFileSelect={handleFileSelect('otherCertifications')} />

                <SectionHeading title="Section I - Agreements" />
                <FileUploadField label="Vendor Registration Form" icon={FileText} file={files.vendorRegistrationForm} onFileSelect={handleFileSelect('vendorRegistrationForm')} />
                <FileUploadField label="NDA (If Applicable)" icon={FileText} file={files.nda} onFileSelect={handleFileSelect('nda')} />
                <FileUploadField label="Code of Conduct Acceptance" icon={FileText} file={files.codeOfConduct} onFileSelect={handleFileSelect('codeOfConduct')} />
                <FileUploadField label="Payment Terms Acceptance" icon={FileText} file={files.paymentTerms} onFileSelect={handleFileSelect('paymentTerms')} />
                <FileUploadField label="Purchase Terms & Conditions Acceptance" icon={FileText} file={files.purchaseTerms} onFileSelect={handleFileSelect('purchaseTerms')} />

              </div>

              <div className="mt-8">
                <SectionHeading title="Final Submission / Checklist" />
                <div className="space-y-4 bg-black p-8 border border-white/10">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="verifiedInfo" checked={checkboxes.verifiedInfo} onChange={handleCheckboxChange} className="w-5 h-5 accent-red-600 bg-neutral-900 border-white/20" />
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">All Information Verified</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="documentsUploaded" checked={checkboxes.documentsUploaded} onChange={handleCheckboxChange} className="w-5 h-5 accent-red-600 bg-neutral-900 border-white/20" />
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Documents Uploaded</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="authSignatory" checked={checkboxes.authSignatory} onChange={handleCheckboxChange} className="w-5 h-5 accent-red-600 bg-neutral-900 border-white/20" />
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Authorized Signatory Confirmation</span>
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-6 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Securing Data...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in duration-700">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-600/20">
              <CheckCircle className="w-24 h-24 text-red-600 mb-8 animate-bounce" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">
              {submissionStatus === 'Observation' ? 'Submitted with Observations' : 'Application Submitted Successfully'}
            </h2>
            <p className="text-xl text-neutral-400 font-light max-w-2xl text-center leading-relaxed mb-8">
              {submissionStatus === 'Observation' 
                ? 'Your registration has been received, but some mandatory documents or fields are missing. Our procurement team will review your file under observation status.'
                : 'Your registration has been successfully transmitted to the DXN Global Vendor Management System. Our procurement team will review your profile.'}
            </p>
            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
              Our vendor audit team will review your specialities and tax compliance within <span className="text-white font-bold">3-5 business days</span>.
            </p>
            <div className="bg-neutral-900 border border-white/5 p-8 inline-block text-left mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2">Protocol Reference</p>
              <p className="text-neutral-400 text-xs font-mono">APP-ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
            </div>
            
            <button
              onClick={() => {
                setFormData({
                  companyName: '', panNumber: '', gstNumber: '', email: '', phone: '',
                  specialities: '', description: '', authorizedPerson: '', escContact: '',
                  techTeamStrength: '', installedBase: ''
                });
                setFiles({});
                setCheckboxes({ verifiedInfo: false, documentsUploaded: false, authSignatory: false });
                setStep(1);
              }}
              className="mx-auto block bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
            >
              Submit Another Application
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VendorRegistration;
