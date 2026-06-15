import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ShieldCheck, FileText, Upload, CheckCircle, ArrowRight, Building, Mail, Phone, Tag, User, X, ChevronDown, ChevronUp } from 'lucide-react';

const VENDOR_CATEGORIES = {
  "Nature of Business": [
    "OEM / Manufacturer", "Authorized Distributor", "Authorized Dealer", "Channel Partner", 
    "Service Provider", "Contractor", "Consultant", "Trader / Reseller", "Importer", "Other"
  ],
  "Packaging Machines & Automation": [
    "Tube Filling Machine", "Liquid Filling Machine", "Carbonated Filling Machine", "Capping Machine",
    "Labeling Machine", "Shrink Sleeve Machine", "Case Erector", "Carton Sealer", "Band Sealer",
    "Check Weigher", "Online Weighing System", "Conveyor System", "Handy Printer", "Inkjet Printer",
    "Coding Machine", "Palletizer", "Stretch Wrapping Machine"
  ],
  "Process & Production Equipment": [
    "Aloe Peeling Machine", "Mixing Tank", "Storage Tank", "Reactor", "Homogenizer", 
    "Soap Manufacturing Equipment", "Liquid Processing Equipment", "Powder Handling Equipment", "Material Transfer System"
  ],
  "Utility Equipment": [
    "Air Compressor", "Blower System", "Vacuum System", "Pump", "Chiller", "Boiler", 
    "Cooling Tower", "DG Set", "RO Plant", "Water Treatment Plant", "Utility Piping"
  ],
  "Electrical, Automation & Instrumentation": [
    "PLC", "SCADA", "HMI", "VFD", "Control Panel", "Sensors", "Load Cell", 
    "Instrumentation", "Industrial Automation", "Electrical Contractor"
  ],
  "Mechanical Fabrication & Engineering Services": [
    "SS Fabrication", "MS Fabrication", "Structural Fabrication", "Piping Work", 
    "Machine Modification", "Welding Services", "Installation & Commissioning"
  ],
  "MRO & Industrial Consumables": [
    "Bearings", "Belts", "Fasteners", "Lubricants", "Pneumatics", "Hydraulics", 
    "Power Tools", "Hand Tools", "Industrial Consumables"
  ],
  "Laboratory & Quality Equipment": [
    "Laboratory Instruments", "Testing Equipment", "Calibration Services", "Validation Services", "Weighing Instruments"
  ],
  "Civil & Infrastructure": [
    "Civil Construction", "Flooring", "Waterproofing", "Roofing", "Interior Works", "Painting"
  ],
  "HVAC & Clean Room": [
    "HVAC", "Air Handling Unit", "Clean Room", "Ducting", "Ventilation System", "Exhaust System"
  ],
  "Safety & Fire Protection": [
    "Fire Fighting System", "Fire Extinguishers", "PPE", "Safety Audit", "Safety Signage"
  ],
  "Facility Management Services": [
    "Housekeeping", "Pest Control", "Security Services", "Gardening", "Waste Management"
  ],
  "Logistics & Transportation": [
    "Transport Services", "Courier Services", "Freight Forwarding", "Warehouse Services", "Packers & Movers"
  ],
  "Professional Services": [
    "Legal Consultant", "Chartered Accountant", "Technical Consultant", "Environmental Consultant", "HR Consultant", "Training Services"
  ]
};

const SERVICE_CAPABILITIES = [
  "Manufacturer Only", "Supply & Service", "Service Only", 
  "Installation & Commissioning", "AMC Support", "Breakdown Support"
];

const FileUploadField = ({
  label,
  icon: Icon,
  file,
  onFileSelect
}: {
  label: string;
  icon: any;
  file: File | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isOptional = label.toLowerCase().includes('if applicable') || 
                     label.toLowerCase().includes('if available') || 
                     label.toLowerCase().includes('optional');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col h-full gap-2 relative">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 shrink-0">
        <span className="text-base">{file ? '✅' : '⬜'}</span> <Icon className="w-3 h-3" /> 
        <span>{label} {!isOptional && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
      </label>
      <div
        className={`p-4 bg-black border border-dashed text-center group cursor-pointer transition-colors flex-grow flex flex-col justify-center min-h-[100px] relative ${file ? 'border-green-600' : 'border-white/10 hover:border-red-600'}`}
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
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <button 
              type="button" 
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/50 hover:bg-red-600 rounded-full p-1.5 transition-colors z-10"
              title="Remove File"
            >
              <X className="w-4 h-4 text-white" />
            </button>
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

const SelectInputField = ({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  options,
  required = false,
  isValid
}: {
  label: string;
  icon: any;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
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
      <div className="relative">
        <select
          required={!isOptional}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-black border border-white/10 px-6 py-4 pr-12 text-white outline-none focus:border-red-600 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

const CategoryAccordion = ({ title, options, selected, onToggle }: { title: string, options: string[], selected: string[], onToggle: (opt: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = options.filter(opt => selected.includes(opt)).length;

  return (
    <div className="border border-white/10 bg-neutral-900 overflow-hidden mb-4">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-3">
          {title}
          {selectedCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{selectedCount}</span>
          )}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-black border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selected.includes(opt)} 
                onChange={() => onToggle(opt)}
                className="w-4 h-4 accent-red-600 bg-neutral-900 border-white/20"
              />
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{opt}</span>
            </label>
          ))}
        </div>
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

const DB_NAME = 'DXNVendorDB';
const STORE_NAME = 'filesStore';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e: any) => {
      if (!e.target.result.objectStoreNames.contains(STORE_NAME)) {
        e.target.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveFileToDB = async (key: string, file: File) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, key);
  } catch (e) {
    console.error("Failed to save file to DB", e);
  }
};

const getFilesFromDB = async (): Promise<Record<string, File>> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAllKeys();
    const valuesReq = store.getAll();

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => {
        const keys = request.result as string[];
        const values = valuesReq.result as File[];
        const result: Record<string, File> = {};
        keys.forEach((k, i) => {
          result[k] = values[i];
        });
        resolve(result);
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.error("Failed to get files from DB", e);
    return {};
  }
};

const removeFileFromDB = async (key: string) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch (e) {
    console.error("Failed to remove file from DB", e);
  }
};

const clearFilesDB = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch (e) {
    console.error("Failed to clear files DB", e);
  }
};

const VendorRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"Complete" | "Observation">("Complete");

  const [formData, setFormData] = useState({
    categories: [] as string[],
    otherCategory: '',
    serviceCapabilities: [] as string[],
    oemBrands: ['', '', ''] as [string, string, string],
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

  useEffect(() => {
    const savedDraft = localStorage.getItem('vendorFormDraft');
    if (savedDraft) {
      try {
        const { formData: savedFormData, checkboxes: savedCheckboxes } = JSON.parse(savedDraft);
        if (savedFormData) setFormData(savedFormData);
        if (savedCheckboxes) setCheckboxes(savedCheckboxes);
      } catch (e) {
        console.error("Failed to parse saved draft", e);
      }
    }

    getFilesFromDB().then((savedFiles) => {
      if (Object.keys(savedFiles).length > 0) {
        setFiles(savedFiles);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('vendorFormDraft', JSON.stringify({ formData, checkboxes }));
  }, [formData, checkboxes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;
    // Enforce numeric only for phone, escalation contact, and team strength
    if (['phone', 'escContact', 'techTeamStrength'].includes(e.target.name)) {
      value = value.replace(/[^0-9]/g, '');
    }
    // Enforce letters and spaces only for authorized person
    if (e.target.name === 'authorizedPerson') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCapabilities: prev.serviceCapabilities.includes(service)
        ? prev.serviceCapabilities.filter(s => s !== service)
        : [...prev.serviceCapabilities, service]
    }));
  };

  const handleOemBrandChange = (index: number, value: string) => {
    setFormData(prev => {
      const newBrands = [...prev.oemBrands] as [string, string, string];
      newBrands[index] = value;
      return { ...prev, oemBrands: newBrands };
    });
  };

  const handleFileSelect = (key: string) => async (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e === null) {
      setFiles(prev => ({ ...prev, [key]: null }));
      await removeFileFromDB(key);
    } else if (e.target.files && e.target.files[0]) {
      const file = e.target.files![0];
      setFiles(prev => ({ ...prev, [key]: file }));
      await saveFileToDB(key, file);
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
      reader.onerror = () => {
        reject(reader.error || new Error('Unknown file read error'));
      };
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
    const mandatoryFiles = [
      'companyRegistration', 'panCard', 'gstCertificate', 'companyProfile',
      'cancelledCheque', 'bankAccountDetails', 'auditedFinancials', 'itrAcknowledgement',
      'conflictOfInterest', 'antiBribery', 'complianceDecl', 'blacklistingDecl',
      'confidentialityDecl', 'majorCustomerList', 'customerReferences', 'productCatalogue',
      'manufacturingFacility', 'serviceInfrastructure'
    ];
    
    const optionalFiles = [
      'orgChart', 'msmeCertificate', 'pfRegistration', 'esiRegistration', 
      'profTaxRegistration', 'labourLicense', 'iso9001', 'iso14001', 'iso45001',
      'gmp', 'ce', 'otherCertifications', 'vendorRegistrationForm', 'nda',
      'codeOfConduct', 'paymentTerms', 'purchaseTerms', 'authorizationLetter'
    ];
    
    const missingMandatoryFiles = mandatoryFiles.filter(key => !files[key]);
    
    const mandatoryFields = [
      'companyName', 'panNumber', 'gstNumber', 'email', 'phone', 
      'specialities', 'description', 'authorizedPerson', 'escContact'
    ];
    
    const optionalFields = ['techTeamStrength', 'installedBase', 'serviceCapabilities', 'oemBrands'];
    
    const missingMandatoryFields = mandatoryFields.filter(key => {
      const val = formData[key as keyof typeof formData];
      return typeof val === 'string' && !val.trim();
    });

    if (formData.categories.length === 0) {
      missingMandatoryFields.push('categories');
    }

    if (formData.categories.includes('Other') && (!formData.otherCategory || !formData.otherCategory.trim())) {
      missingMandatoryFields.push('otherCategory');
    }

    if (missingMandatoryFiles.length > 0 || missingMandatoryFields.length > 0) {
      alert("Please fill all mandatory fields (marked with *) and upload all required documents.");
      return;
    }

    const missingOptionalFiles = optionalFiles.filter(key => !files[key]);
    const missingOptionalFields = optionalFields.filter(key => {
      const val = formData[key as keyof typeof formData];
      return Array.isArray(val) ? val.length === 0 : (typeof val === 'string' && !val.trim());
    });

    const currentStatus = (missingOptionalFiles.length > 0 || missingOptionalFields.length > 0) 
      ? "Observation" 
      : "Complete";
      
    const fieldLabels: Record<string, string> = {
      techTeamStrength: 'Technical Team Strength',
      installedBase: 'Installed Base Details',
      serviceCapabilities: 'Service Capabilities',
      oemBrands: 'OEM Brands',
      orgChart: 'Organization Chart',
      msmeCertificate: 'MSME Certificate',
      pfRegistration: 'PF Registration Certificate',
      esiRegistration: 'ESI Registration Certificate',
      profTaxRegistration: 'Professional Tax Registration',
      labourLicense: 'Labour License',
      iso9001: 'ISO 9001',
      iso14001: 'ISO 14001',
      iso45001: 'ISO 45001',
      gmp: 'GMP',
      ce: 'CE',
      otherCertifications: 'Other Relevant Certifications',
      vendorRegistrationForm: 'Vendor Registration Form',
      nda: 'NDA',
      codeOfConduct: 'Code of Conduct Acceptance',
      paymentTerms: 'Payment Terms Acceptance',
      purchaseTerms: 'Purchase Terms & Conditions Acceptance',
      authorizationLetter: 'Authorization Letter'
    };

    const missingItemsList = [...missingOptionalFields, ...missingOptionalFiles].map(key => fieldLabels[key] || key);

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

      // 1. Convert all attached files to Base64 sequentially to prevent mobile browser crashes
      const base64Files = [];
      const validFiles = Object.entries(files).filter(([_, file]) => file !== null);
      for (const [key, file] of validFiles) {
        try {
          const b64 = await fileToBase64(file as File, key, formData.companyName);
          base64Files.push(b64);
        } catch (fileErr: any) {
           throw new Error(`Failed to process file "${file?.name}". Please remove and re-select it. Detail: ${fileErr.message || 'Read Error'}`);
        }
      }

      // 3. Prepare payload
      const payload = {
        formData: {
          ...formData,
          category: formData.categories.includes('Other') 
            ? formData.categories.filter(c => c !== 'Other').concat(formData.otherCategory).join(', ') 
            : formData.categories.join(', '),
          serviceCapabilities: formData.serviceCapabilities.join(', '),
          oemBrands: formData.oemBrands.filter(b => b.trim()).join(', '),
          specialities: formData.specialities.split(',').map(s => s.trim()).join(', '),
          description: formData.description
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

      localStorage.removeItem('vendorFormDraft');
      clearFilesDB();
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
                <SectionHeading title="Company Information" />

                <div className="col-span-1 md:col-span-2 mb-4">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-4">
                    <span className="text-base">{formData.categories.length > 0 ? '✅' : '⬜'}</span> <Building className="w-3 h-3" /> 
                    <span>Vendor Category (Select all that apply) <span className="text-red-600 text-lg leading-none ml-1">*</span></span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(VENDOR_CATEGORIES).map(([title, options]) => (
                      <CategoryAccordion 
                        key={title} 
                        title={title} 
                        options={options} 
                        selected={formData.categories} 
                        onToggle={handleCategoryToggle} 
                      />
                    ))}
                  </div>
                  {formData.categories.includes('Other') && (
                    <div className="mt-4">
                      <TextInputField 
                        label="Please Specify Other Category" 
                        icon={Building} 
                        name="otherCategory" 
                        value={formData.otherCategory} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  )}
                </div>
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
                <FileUploadField label="Company Registration Cert. (ROC/Deed/MSME)" icon={FileText} file={files.companyRegistration} onFileSelect={handleFileSelect('companyRegistration')} />
                <FileUploadField label="PAN Card" icon={FileText} file={files.panCard} onFileSelect={handleFileSelect('panCard')} />
                <FileUploadField label="GST Registration Certificate" icon={FileText} file={files.gstCertificate} onFileSelect={handleFileSelect('gstCertificate')} />
                <FileUploadField label="Company Profile" icon={FileText} file={files.companyProfile} onFileSelect={handleFileSelect('companyProfile')} />
                <FileUploadField label="Organization Chart (Optional)" icon={FileText} file={files.orgChart} onFileSelect={handleFileSelect('orgChart')} />

                <SectionHeading title="Entity Documentation" />
              <div className="col-span-1 md:col-span-2 text-red-500 text-sm mb-4">
                * Note: Maximum file size is 2MB per document. Please upload compressed PDFs or images.
              </div>
                <FileUploadField label="Cancelled Cheque OR Bank Verification Letter" icon={FileText} file={files.cancelledCheque} onFileSelect={handleFileSelect('cancelledCheque')} />
                <FileUploadField label="Bank Account Details Form" icon={FileText} file={files.bankAccountDetails} onFileSelect={handleFileSelect('bankAccountDetails')} />

                <SectionHeading title="Statutory Compliance" />
                <FileUploadField label="MSME Certificate (If Applicable)" icon={FileText} file={files.msmeCertificate} onFileSelect={handleFileSelect('msmeCertificate')} />
                <FileUploadField label="PF Registration Certificate (If Applicable)" icon={FileText} file={files.pfRegistration} onFileSelect={handleFileSelect('pfRegistration')} />
                <FileUploadField label="ESI Registration Certificate (If Applicable)" icon={FileText} file={files.esiRegistration} onFileSelect={handleFileSelect('esiRegistration')} />
                <FileUploadField label="Professional Tax Registration (If Applicable)" icon={FileText} file={files.profTaxRegistration} onFileSelect={handleFileSelect('profTaxRegistration')} />
                <FileUploadField label="Labour License (If Applicable)" icon={FileText} file={files.labourLicense} onFileSelect={handleFileSelect('labourLicense')} />

                <SectionHeading title="Financial Information" />
                <FileUploadField label="Latest Audited Financial Statement (or last 2 yrs)" icon={FileText} file={files.auditedFinancials} onFileSelect={handleFileSelect('auditedFinancials')} />
                <FileUploadField label="Income Tax Return Acknowledgement (Last FY)" icon={FileText} file={files.itrAcknowledgement} onFileSelect={handleFileSelect('itrAcknowledgement')} />

                <SectionHeading title="Contact Details" />
                <TextInputField label="Authorized Contact Person" icon={User} name="authorizedPerson" value={formData.authorizedPerson} onChange={handleInputChange} required />
                <TextInputField label="Mobile Number" icon={Phone} name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" />
                <TextInputField label="Email Address" icon={Mail} name="email" value={formData.email} onChange={handleInputChange} type="email" required />
                <TextInputField label="Escalation Contact Details" icon={Phone} name="escContact" value={formData.escContact} onChange={handleInputChange} required type="tel" />

                <SectionHeading title="Declarations" />
                <FileUploadField label="Conflict of Interest Declaration" icon={FileText} file={files.conflictOfInterest} onFileSelect={handleFileSelect('conflictOfInterest')} />
                <FileUploadField label="Anti-Bribery & Anti-Corruption Declaration" icon={FileText} file={files.antiBribery} onFileSelect={handleFileSelect('antiBribery')} />
                <FileUploadField label="Compliance Declaration" icon={FileText} file={files.complianceDecl} onFileSelect={handleFileSelect('complianceDecl')} />
                <FileUploadField label="Blacklisting Declaration" icon={FileText} file={files.blacklistingDecl} onFileSelect={handleFileSelect('blacklistingDecl')} />
                <FileUploadField label="Confidentiality Declaration" icon={FileText} file={files.confidentialityDecl} onFileSelect={handleFileSelect('confidentialityDecl')} />

                <SectionHeading title="Quality & Business Capability" />
                <FileUploadField label="Major Customer List" icon={FileText} file={files.majorCustomerList} onFileSelect={handleFileSelect('majorCustomerList')} />
                <FileUploadField label="Customer References" icon={FileText} file={files.customerReferences} onFileSelect={handleFileSelect('customerReferences')} />
                <FileUploadField label="Product Catalogue / Service Brochure" icon={FileText} file={files.productCatalogue} onFileSelect={handleFileSelect('productCatalogue')} />
                <FileUploadField label="Manufacturing Facility Details" icon={Building} file={files.manufacturingFacility} onFileSelect={handleFileSelect('manufacturingFacility')} />
                <FileUploadField label="Service Infrastructure Details" icon={Building} file={files.serviceInfrastructure} onFileSelect={handleFileSelect('serviceInfrastructure')} />
                <TextInputField label="Technical Team Strength" icon={CheckCircle} name="techTeamStrength" value={formData.techTeamStrength} onChange={handleInputChange} type="tel" />
                <TextInputField label="Installed Base Details" icon={CheckCircle} name="installedBase" value={formData.installedBase} onChange={handleInputChange} />
                <div className="col-span-1 md:col-span-2">
                  <TextInputField label="Manufacturing Specialities (Comma Separated)" icon={Tag} name="specialities" value={formData.specialities} onChange={handleInputChange} required placeholder="e.g. Raw Material, Packaging, Lab Services" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <TextInputField label="Facility Capabilities Overview" icon={FileText} name="description" value={formData.description} onChange={handleInputChange} type="textarea" />
                </div>

                <SectionHeading title="Service Capability" />
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {SERVICE_CAPABILITIES.map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group p-3 border border-white/10 bg-neutral-900 hover:bg-white/5 transition-colors">
                      <input 
                        type="checkbox" 
                        checked={formData.serviceCapabilities.includes(opt)} 
                        onChange={() => handleServiceToggle(opt)}
                        className="w-4 h-4 accent-red-600 bg-neutral-900 border-white/20"
                      />
                      <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>

                <SectionHeading title="OEM / Brand Representation" />
                <TextInputField label="Brand / OEM 1 (Optional)" icon={Tag} name="oemBrand1" value={formData.oemBrands[0]} onChange={(e) => handleOemBrandChange(0, e.target.value)} />
                <TextInputField label="Brand / OEM 2 (Optional)" icon={Tag} name="oemBrand2" value={formData.oemBrands[1]} onChange={(e) => handleOemBrandChange(1, e.target.value)} />
                <TextInputField label="Brand / OEM 3 (Optional)" icon={Tag} name="oemBrand3" value={formData.oemBrands[2]} onChange={(e) => handleOemBrandChange(2, e.target.value)} />
                <FileUploadField label="Upload Authorization Letter (Optional)" icon={FileText} file={files.authorizationLetter} onFileSelect={handleFileSelect('authorizationLetter')} />


                <SectionHeading title="Certifications (If Available)" />
                <FileUploadField label="ISO 9001 (If Available)" icon={ShieldCheck} file={files.iso9001} onFileSelect={handleFileSelect('iso9001')} />
                <FileUploadField label="ISO 14001 (If Available)" icon={ShieldCheck} file={files.iso14001} onFileSelect={handleFileSelect('iso14001')} />
                <FileUploadField label="ISO 45001 (If Available)" icon={ShieldCheck} file={files.iso45001} onFileSelect={handleFileSelect('iso45001')} />
                <FileUploadField label="GMP (If Available)" icon={ShieldCheck} file={files.gmp} onFileSelect={handleFileSelect('gmp')} />
                <FileUploadField label="CE (If Available)" icon={ShieldCheck} file={files.ce} onFileSelect={handleFileSelect('ce')} />
                <FileUploadField label="Other Relevant Certifications (If Available)" icon={ShieldCheck} file={files.otherCertifications} onFileSelect={handleFileSelect('otherCertifications')} />

                <SectionHeading title="Agreements" />
                <FileUploadField label="Vendor Registration Form (Optional)" icon={FileText} file={files.vendorRegistrationForm} onFileSelect={handleFileSelect('vendorRegistrationForm')} />
                <FileUploadField label="NDA (If Applicable)" icon={FileText} file={files.nda} onFileSelect={handleFileSelect('nda')} />
                <FileUploadField label="Code of Conduct Acceptance (Optional)" icon={FileText} file={files.codeOfConduct} onFileSelect={handleFileSelect('codeOfConduct')} />
                <FileUploadField label="Payment Terms Acceptance (Optional)" icon={FileText} file={files.paymentTerms} onFileSelect={handleFileSelect('paymentTerms')} />
                <FileUploadField label="Purchase Terms & Conditions Acceptance (Optional)" icon={FileText} file={files.purchaseTerms} onFileSelect={handleFileSelect('purchaseTerms')} />

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
            <p className="text-xl text-neutral-400 font-light max-w-2xl text-center leading-relaxed mb-12">
              {submissionStatus === 'Observation' 
                ? 'Your registration has been received with some missing information. We will get back to you soon.'
                : 'Thank you for registering. We will review your profile and get back to you soon.'}
            </p>
            
            <div className="bg-neutral-900 border border-white/10 p-8 text-left mb-12 max-w-lg mx-auto">
              <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Submission Summary</h3>
              <div className="space-y-4">
                <div><span className="text-neutral-500 uppercase text-xs font-black tracking-widest block mb-1">Company Name</span><span className="text-white">{formData.companyName}</span></div>
                <div><span className="text-neutral-500 uppercase text-xs font-black tracking-widest block mb-1">Category</span><span className="text-white">{formData.categories.includes('Other') ? formData.categories.filter(c => c !== 'Other').concat(formData.otherCategory).join(', ') : formData.categories.join(', ')}</span></div>
                <div><span className="text-neutral-500 uppercase text-xs font-black tracking-widest block mb-1">Email</span><span className="text-white">{formData.email}</span></div>
                <div><span className="text-neutral-500 uppercase text-xs font-black tracking-widest block mb-1">Contact Person</span><span className="text-white">{formData.authorizedPerson}</span></div>
              </div>
              <p className="text-xs text-neutral-500 mt-8 italic">A detailed confirmation has been sent to your email.</p>
            </div>

            <button
              onClick={() => {
                setFormData({
                  categories: [], serviceCapabilities: [], oemBrands: ['', '', ''],
                  otherCategory: '', companyName: '', panNumber: '', gstNumber: '', email: '', phone: '',
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
