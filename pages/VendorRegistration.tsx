import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ShieldCheck, FileText, Upload, CheckCircle, ArrowRight, Building, Mail, Phone, Tag, User, X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { uploadVendorDocument, updateVendorApplication } from '../services/SupabaseService';

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

const MANDATORY_FILES = [
  'companyRegistration', 'panCard', 'gstCertificate', 'companyProfile',
  'cancelledCheque', 'bankAccountDetails',
  'conflictOfInterest', 'antiBribery', 'complianceDecl', 'blacklistingDecl',
  'confidentialityDecl', 'majorCustomerList', 'customerReferences', 'productCatalogue',
  'manufacturingFacility', 'serviceInfrastructure'
];

const OPTIONAL_FILES = [
  'orgChart', 'msmeCertificate', 'pfRegistration', 'esiRegistration',
  'profTaxRegistration', 'labourLicense', 'auditedFinancials', 'itrAcknowledgement', 'iso9001', 'iso14001', 'iso45001',
  'gmp', 'ce', 'otherCertifications', 'vendorRegistrationForm', 'nda',
  'codeOfConduct', 'paymentTerms', 'purchaseTerms', 'authorizationLetter'
];

const FIELD_LABELS: Record<string, string> = {
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
  authorizationLetter: 'Authorization Letter',
  companyRegistration: 'Company Registration Cert. (ROC/Deed/MSME)',
  panCard: 'PAN Card',
  gstCertificate: 'GST Registration Certificate',
  companyProfile: 'Company Profile',
  cancelledCheque: 'Cancelled Cheque OR Bank Verification Letter',
  bankAccountDetails: 'Bank Account Details Form',
  conflictOfInterest: 'Conflict of Interest Declaration',
  antiBribery: 'Anti-Bribery & Anti-Corruption Declaration',
  complianceDecl: 'Compliance Declaration',
  blacklistingDecl: 'Blacklisting Declaration',
  confidentialityDecl: 'Confidentiality Declaration',
  majorCustomerList: 'Major Customer List',
  customerReferences: 'Customer References',
  productCatalogue: 'Product Catalogue / Service Brochure',
  manufacturingFacility: 'Manufacturing Facility Details',
  serviceInfrastructure: 'Service Infrastructure Details',
  auditedFinancials: 'Latest Audited Financial Statement',
  itrAcknowledgement: 'Income Tax Return Acknowledgement'
};

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
      <label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2 shrink-0">
        <span className="text-base">{file ? '✅' : '⬜'}</span> <Icon className="w-3 h-3" />
        <span>{label} {!isOptional && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
      </label>
      <div
        className={`p-4 bg-white border-2 border-dashed rounded-lg text-center group cursor-pointer transition-colors flex-grow flex flex-col justify-center min-h-[100px] relative ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-red-600 hover:bg-gray-50'}`}
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
              <X className="w-4 h-4 text-gray-900" />
            </button>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-[10px] font-bold tracking-wider text-gray-900 truncate max-w-full px-2">{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Upload Document</p>
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
      <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
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
          className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all resize-none"
        />
      ) : (
        <input
          required={!isOptional}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
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
      <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
        <span className="text-base">{(isValid !== undefined ? isValid : value.trim() !== '') ? '✅' : '⬜'}</span> <Icon className="w-3 h-3" />
        <span>{label} {!isOptional && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
      </label>
      <div className="relative">
        <select
          required={!isOptional}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 pr-12 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-white text-gray-900">{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
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
    <div className="border border-gray-200 bg-gray-50 rounded-xl overflow-hidden mb-4 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white transition-colors"
      >
        <span className="font-bold text-gray-900 uppercase tracking-wider text-sm flex items-center gap-3">
          {title}
          {selectedCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{selectedCount}</span>
          )}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mt-12 mb-6 border-b border-gray-200 pb-4 col-span-1 md:col-span-2">
    <h3 className="text-xl font-black uppercase tracking-widest text-gray-900 flex items-center gap-3">
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

const saveFileToDB = async (draftId: string, key: string, file: File) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, `${draftId}_${key}`);
  } catch (e) {
    console.error("Failed to save file to DB", e);
  }
};

const getFilesFromDB = async (draftId: string): Promise<Record<string, File>> => {
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
          if (k.startsWith(`${draftId}_`)) {
            const originalKey = k.replace(`${draftId}_`, '');
            result[originalKey] = values[i];
          }
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

const removeFileFromDB = async (draftId: string, key: string) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(`${draftId}_${key}`);
  } catch (e) {
    console.error("Failed to remove file from DB", e);
  }
};

const clearFilesDB = async (draftId: string) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAllKeys();

    request.onsuccess = () => {
      const keys = request.result as string[];
      keys.forEach(k => {
        if (k.startsWith(`${draftId}_`)) {
          store.delete(k);
        }
      });
    };
  } catch (e) {
    console.error("Failed to clear files DB", e);
  }
};

const VendorRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"Complete" | "Observation">("Complete");
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [resumeAppId, setResumeAppId] = useState('');
  const [resumeEmail, setResumeEmail] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [isResuming, setIsResuming] = useState(false);
  const [previouslyUploadedFiles, setPreviouslyUploadedFiles] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<any>(null);

  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [draftsList, setDraftsList] = useState<any[]>([]);
  const [draftsModalOpen, setDraftsModalOpen] = useState(false);

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

  const handleResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeError('');
    setIsResuming(true);

    try {
      const { data, error } = await supabase.rpc('fetch_vendor_application_by_id_or_pan', {
        p_identifier: resumeAppId.trim(),
        p_email: resumeEmail.trim()
      });

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("No application found with that ID/PAN and Email combination.");
      }

      const vendor = data[0];
      setApplicationId(vendor.id);
      setIsUpdateMode(true);

      const categoryArray = (vendor.vendor_category || '').split(',').map((c: string) => c.trim()).filter(Boolean);
      const allStandardCats = Object.values(VENDOR_CATEGORIES).flat();
      const standardCats = categoryArray.filter((c: string) => allStandardCats.includes(c));
      const otherCats = categoryArray.filter((c: string) => !allStandardCats.includes(c));

      if (otherCats.length > 0) standardCats.push('Other');

      const oemArray = (vendor.oem_brands || '').split(',').map((c: string) => c.trim());
      const oemBrands: [string, string, string] = [oemArray[0] || '', oemArray[1] || '', oemArray[2] || ''];

      const newFormData = {
        categories: standardCats,
        otherCategory: otherCats.join(', '),
        serviceCapabilities: (vendor.service_capabilities || '').split(',').map((c: string) => c.trim()).filter(Boolean),
        oemBrands: oemBrands,
        companyName: vendor.company_name || '',
        panNumber: vendor.pan_number || '',
        gstNumber: vendor.gst_number || '',
        email: vendor.email || '',
        phone: vendor.phone || '',
        specialities: vendor.specialities || '',
        description: vendor.facility_description || '',
        authorizedPerson: vendor.contact_person || '',
        escContact: vendor.escalation_contact || '',
        techTeamStrength: vendor.tech_team_strength || '',
        installedBase: vendor.installed_base || '',
      };

      setFormData(newFormData);

      setOriginalData(newFormData);

      setCheckboxes({
        verifiedInfo: true,
        documentsUploaded: true,
        authSignatory: true
      });

      const missingItemsStr = vendor.missing_items || '';
      const newFiles: Record<string, File | null> = {};
      const uploadedFileKeys: string[] = [];
      MANDATORY_FILES.forEach(key => {
        const label = FIELD_LABELS[key] || key;
        if (!missingItemsStr.includes(label) && !missingItemsStr.includes(key)) {
          newFiles[key] = new File([], "✅ Previously Uploaded", { type: "application/pdf" });
          uploadedFileKeys.push(key);
        }
      });
      OPTIONAL_FILES.forEach(key => {
        const label = FIELD_LABELS[key] || key;
        if (!missingItemsStr.includes(label) && !missingItemsStr.includes(key)) {
          newFiles[key] = new File([], "✅ Previously Uploaded", { type: "application/pdf" });
          uploadedFileKeys.push(key);
        }
      });
      setFiles(newFiles);
      setPreviouslyUploadedFiles(uploadedFileKeys);

      setResumeModalOpen(false);
      setStep(2);

      alert("Application loaded successfully. You can now update your details and resubmit.");
    } catch (err: any) {
      setResumeError(err.message || "Failed to fetch application");
    } finally {
      setIsResuming(false);
    }
  };

  useEffect(() => {
    const savedDraftsStr = localStorage.getItem('vendorFormDrafts');
    if (savedDraftsStr) {
      try {
        const parsed = JSON.parse(savedDraftsStr);
        setDraftsList(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse saved drafts", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!activeDraftId || isUpdateMode) return;

    const hasData = formData.companyName || formData.email || formData.phone || formData.categories.length > 0;
    if (!hasData) return;

    setDraftsList(prev => {
      const existingIdx = prev.findIndex(d => d.id === activeDraftId);
      const newDraft = {
        id: activeDraftId,
        lastModified: Date.now(),
        companyName: formData.companyName || 'Untitled Draft',
        formData,
        checkboxes
      };

      let newList;
      if (existingIdx >= 0) {
        newList = [...prev];
        newList[existingIdx] = newDraft;
      } else {
        newList = [...prev, newDraft];
      }

      localStorage.setItem('vendorFormDrafts', JSON.stringify(newList));
      return newList;
    });
  }, [formData, checkboxes, activeDraftId, isUpdateMode]);

  const handleDeleteDraft = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this draft?")) {
      await clearFilesDB(id);
      setDraftsList(prev => {
        const newList = prev.filter(d => d.id !== id);
        localStorage.setItem('vendorFormDrafts', JSON.stringify(newList));
        return newList;
      });
      if (activeDraftId === id) {
        setActiveDraftId(null);
        setStep(1);
      }
    }
  };

  const handleStartNew = () => {
    setFormData({
      categories: [], otherCategory: '', serviceCapabilities: [], oemBrands: ['', '', ''],
      companyName: '', panNumber: '', gstNumber: '', email: '', phone: '', specialities: '',
      description: '', authorizedPerson: '', escContact: '', techTeamStrength: '', installedBase: ''
    });
    setCheckboxes({ verifiedInfo: false, documentsUploaded: false, authSignatory: false });
    setFiles({});
    setActiveDraftId(Date.now().toString());
    setIsUpdateMode(false);
    setStep(2);
  };

  const handleResumeDraft = async (draft: any) => {
    setFormData(draft.formData);
    setCheckboxes(draft.checkboxes);
    setActiveDraftId(draft.id);
    setIsUpdateMode(false);
    const savedFiles = await getFilesFromDB(draft.id);
    if (Object.keys(savedFiles).length > 0) {
      setFiles(savedFiles);
    } else {
      setFiles({});
    }
    setDraftsModalOpen(false);
    setStep(2);
  };

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
      await removeFileFromDB(activeDraftId || '', key);
    } else if (e.target.files && e.target.files[0]) {
      const file = e.target.files![0];

      // Immediate 5MB file size validation
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum allowed size is 5MB.`);
        if (e.target) e.target.value = ''; // Clear the input
        return;
      }

      setFiles(prev => ({ ...prev, [key]: file }));
      await saveFileToDB(activeDraftId || '', key, file);
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

    const missingMandatoryFiles = MANDATORY_FILES.filter(key => !files[key]);
    const missingOptionalFiles = OPTIONAL_FILES.filter(key => !files[key]);
    const missingOptionalFields = optionalFields.filter(key => {
      const val = formData[key as keyof typeof formData];
      return Array.isArray(val) ? val.length === 0 : (typeof val === 'string' && !val.trim());
    });

    // Status depends on both Mandatory and Optional items
    const currentStatus = (missingMandatoryFiles.length > 0 || missingOptionalFiles.length > 0 || missingOptionalFields.length > 0)
      ? "Observation"
      : "Complete";

    const missingItemsList = [...missingMandatoryFields, ...missingMandatoryFiles, ...missingOptionalFields, ...missingOptionalFiles].map(key => FIELD_LABELS[key] || key);

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
      const validFiles = Object.entries(files).filter(([_, file]) => file !== null && file.size > 0);
      for (const [key, file] of validFiles) {
        try {
          const b64 = await fileToBase64(file as File, key, formData.companyName);
          base64Files.push(b64);
        } catch (fileErr: any) {
          throw new Error(`Failed to process file "${file?.name}". Please remove and re-select it. Detail: ${fileErr.message || 'Read Error'}`);
        }
      }

      // Calculate what was updated
      const updatedFields: string[] = [];
      if (isUpdateMode && originalData) {
        Object.keys(formData).forEach(key => {
          const oldVal = JSON.stringify(originalData[key as keyof typeof originalData]);
          const newVal = JSON.stringify(formData[key as keyof typeof formData]);
          if (oldVal !== newVal) {
            updatedFields.push(`${key}: changed to ${newVal}`);
          }
        });
        const newUploadedFiles = validFiles.filter(([key, _]) => !previouslyUploadedFiles.includes(key));
        if (newUploadedFiles.length > 0) {
          updatedFields.push(`New Documents Uploaded: ${newUploadedFiles.map(f => f[0]).join(', ')}`);
        }
      }

      // Generate ID early if new application so GAS gets it
      let currentAppId = applicationId;
      if (!isUpdateMode) {
        currentAppId = Date.now();
      }

      // 3. Prepare payload
      const payload = {
        applicationId: currentAppId,
        id: currentAppId, // Backward compatibility for old Google Apps Script
        isUpdateMode,
        updatedFields,
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
        // Log to Supabase Database
        if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
          const vendorData = {
            company_name: payload.formData.companyName,
            pan_number: payload.formData.panNumber,
            gst_number: payload.formData.gstNumber,
            contact_person: payload.formData.authorizedPerson,
            email: payload.formData.email,
            phone: payload.formData.phone,
            escalation_contact: payload.formData.escContact,
            vendor_category: payload.formData.category,
            service_capabilities: payload.formData.serviceCapabilities,
            oem_brands: payload.formData.oemBrands,
            specialities: payload.formData.specialities,
            tech_team_strength: payload.formData.techTeamStrength,
            installed_base: payload.formData.installedBase,
            facility_description: payload.formData.description,
            missing_items: payload.missingItems,
            status: payload.submissionStatus
          };

          let dbError = false;

          if (isUpdateMode && applicationId) {
            try {
              await updateVendorApplication(applicationId, vendorData);
            } catch (supabaseError: any) {
              console.error("Supabase Error:", supabaseError);
              alert("Warning: Failed to update database. " + supabaseError.message);
              dbError = true;
            }
          } else {
            // Use the ID we generated for the payload
            const { error: supabaseError } = await supabase.from('vendors').insert([{
              id: payload.applicationId,
              ...vendorData
            }]);
            if (supabaseError) {
              console.error("Supabase Error:", supabaseError);
              dbError = true;
            } else {
              setApplicationId(payload.applicationId);
            }
          }

          if (!dbError || (isUpdateMode && applicationId)) {
            // Upload files to Supabase Storage so admin can access them
            // In update mode, always use the existing applicationId (not payload.applicationId which may be null)
            const uploadVendorId = isUpdateMode && applicationId
              ? String(applicationId)
              : String(payload.applicationId);
            const safeCompanyName = payload.formData.companyName.replace(/[^a-zA-Z0-9]/g, '_') || 'Vendor';

            // Only upload files that are genuinely new (not the "Previously Uploaded" placeholders)
            const newFiles = validFiles.filter(([_, file]) => (file as File).size > 0 && (file as File).name !== '✅ Previously Uploaded');

            for (const [key, file] of newFiles) {
              try {
                const formattedName = `__${key.toUpperCase()}__ ${safeCompanyName} - ${(file as File).name}`;
                const renamedFile = new File([file as File], formattedName, { type: (file as File).type });
                await uploadVendorDocument(uploadVendorId, renamedFile);
              } catch (uploadErr) {
                console.warn(`Failed to upload file ${key} to storage:`, uploadErr);
              }
            }
          }
        }

        const isTestSubmission = payload.formData.companyName.toLowerCase().includes('test');

        if (!isTestSubmission) {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            redirect: "follow",
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error("Server responded with status: " + response.status);
          }

          const result = await response.json();
          if (result.status === "error") {
            throw new Error(result.message);
          }
        } else {
          console.log("Test submission detected. Skipping email notification.");
        }

        setDraftsList(prev => {
          const newList = prev.filter(d => d.id !== activeDraftId);
          localStorage.setItem('vendorFormDrafts', JSON.stringify(newList));
          return newList;
        });
        clearFilesDB(activeDraftId || '');
        setActiveDraftId(null);
        setStep(3);
      } catch (fetchErr: any) {
        console.error("GAS Fetch Error:", fetchErr);
        throw new Error("Failed to submit form to server. The file sizes might be too large, or there is a network issue. Please try again. Detail: " + (fetchErr.message || "Network Error"));
      }

    } catch (err: any) {
      console.error("Submission error:", err);
      alert("Submission Error: " + (err.message || err.toString()) + "\n\nPlease check the console for more details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {step === 1 && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <SectionTitle subtitle="Partnership" title="Vendor Onboarding Portal" light />
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-12">
              {draftsList.length > 0 ? (
                <>
                  <button
                    onClick={() => setDraftsModalOpen(true)}
                    className="bg-red-600 text-white px-8 py-6 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all flex-1"
                  >
                    Resume Saved Draft ({draftsList.length}) <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleStartNew}
                    className="bg-transparent border border-gray-300 text-white px-8 py-6 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all flex-1"
                  >
                    Start New
                  </button>
                </>
              ) : (
                <button
                  onClick={handleStartNew}
                  className="bg-red-600 text-white px-12 py-6 text-lg font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all flex-1"
                >
                  Begin Registration <ArrowRight className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={() => setResumeModalOpen(true)}
                className="bg-transparent border border-gray-300 text-white px-12 py-6 text-sm sm:text-lg font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white/10 transition-all flex-1"
              >
                Update Existing <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>

            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-16">
              Join the DXN Global supply chain. We are looking for elite manufacturing partners, raw material suppliers, and technical service providers who align with our <span className="text-white font-bold">"One World One Market"</span> philosophy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-10 bg-neutral-900 shadow-sm rounded-xl border border-white/10 hover:border-red-600/50 transition-all">
                <ShieldCheck className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Compliance First</h3>
                <p className="text-gray-400 text-sm">All vendors must adhere to DXN’s global quality standards (GMP, ISO, Halal).</p>
              </div>
              <div className="p-10 bg-neutral-900 shadow-sm rounded-xl border border-white/10 hover:border-red-600/50 transition-all">
                <FileText className="w-12 h-12 text-red-600 mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-4">Documented Excellence</h3>
                <p className="text-gray-400 text-sm">Valid Tax IDs (GST/PAN) and Speciality Certifications are mandatory.</p>
              </div>
            </div>
          </div>
        )}

        {resumeModalOpen && (
          <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 shadow-sm rounded-xl border border-white/10 p-6 sm:p-8 max-w-md w-full relative mx-4">
              <button onClick={() => setResumeModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black uppercase text-white mb-2">Resume Application</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your Application ID and Email to resume a saved or submitted application.</p>

              <form onSubmit={handleResume} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">Application ID / PAN Number</label>
                  <input required type="text" value={resumeAppId} onChange={(e) => setResumeAppId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-sm" placeholder="e.g. 125 or ABCDE1234F" />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">Registered Email</label>
                  <input required type="email" value={resumeEmail} onChange={(e) => setResumeEmail(e.target.value)} className="w-full bg-black border border-white/20 p-3 rounded-lg text-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-sm" placeholder="email@company.com" />
                </div>

                {resumeError && <div className="p-3 bg-red-950/50 border border-red-900 text-red-500 text-sm">{resumeError}</div>}

                <button type="submit" disabled={isResuming} className="w-full bg-red-600 text-white font-bold uppercase p-4 hover:bg-red-700 disabled:opacity-50 mt-4">
                  {isResuming ? 'Loading...' : 'Fetch Application'}
                </button>
              </form>
            </div>
          </div>
        )}

        {draftsModalOpen && (
          <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 shadow-sm rounded-xl border border-white/10 p-6 sm:p-8 max-w-2xl w-full relative mx-4">
              <button onClick={() => setDraftsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black uppercase text-white mb-6 border-b border-white/10 pb-4">Saved Drafts</h2>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {draftsList.map(draft => (
                  <div key={draft.id} className="bg-black border border-white/10 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/20 transition-all">
                    <div>
                      <h4 className="text-lg font-black uppercase text-white">{draft.companyName}</h4>
                      <p className="text-xs text-gray-500 font-bold tracking-widest mt-1">LAST SAVED: {new Date(draft.lastModified).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button onClick={(e) => handleDeleteDraft(draft.id, e)} className="bg-neutral-800 shadow-sm rounded-xl border border-white/10 text-white px-4 py-3 text-xs font-black uppercase hover:bg-red-600 transition-all flex-1 sm:flex-none">
                        Delete
                      </button>
                      <button onClick={() => handleResumeDraft(draft)} className="bg-red-600 text-white px-6 py-3 text-xs font-black uppercase hover:bg-white hover:text-black transition-all flex-1 sm:flex-none">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-5xl mx-auto bg-slate-50 border-t-[6px] border-t-red-600 rounded-2xl p-4 sm:p-8 md:p-12 shadow-[0_0_80px_-15px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">Entity Verification</h2>
            <p className="text-gray-500 mb-8 border-b border-gray-200 pb-6">Please complete the mandatory document checklist.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Company Information</h3></div>

                <div className="col-span-1 md:col-span-2 mb-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2 mb-4">
                    <Building className="w-3 h-3" />
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

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Entity Documentation</h3></div>
                <div className="col-span-1 md:col-span-2 text-red-500 text-sm mb-4">
                  * Note: Maximum file size is 2MB per document. Please upload compressed PDFs or images.
                </div>
                <FileUploadField label="Cancelled Cheque OR Bank Verification Letter" icon={FileText} file={files.cancelledCheque} onFileSelect={handleFileSelect('cancelledCheque')} />
                <FileUploadField label="Bank Account Details Form" icon={FileText} file={files.bankAccountDetails} onFileSelect={handleFileSelect('bankAccountDetails')} />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Statutory Compliance</h3></div>
                <FileUploadField label="MSME Certificate (If Applicable)" icon={FileText} file={files.msmeCertificate} onFileSelect={handleFileSelect('msmeCertificate')} />
                <FileUploadField label="PF Registration Certificate (If Applicable)" icon={FileText} file={files.pfRegistration} onFileSelect={handleFileSelect('pfRegistration')} />
                <FileUploadField label="ESI Registration Certificate (If Applicable)" icon={FileText} file={files.esiRegistration} onFileSelect={handleFileSelect('esiRegistration')} />
                <FileUploadField label="Professional Tax Registration (If Applicable)" icon={FileText} file={files.profTaxRegistration} onFileSelect={handleFileSelect('profTaxRegistration')} />
                <FileUploadField label="Labour License (If Applicable)" icon={FileText} file={files.labourLicense} onFileSelect={handleFileSelect('labourLicense')} />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Financial Information</h3></div>
                <FileUploadField label="Latest Audited Financial Statement (or last 2 yrs) (Optional)" icon={FileText} file={files.auditedFinancials} onFileSelect={handleFileSelect('auditedFinancials')} />
                <FileUploadField label="Income Tax Return Acknowledgement (Last FY) (Optional)" icon={FileText} file={files.itrAcknowledgement} onFileSelect={handleFileSelect('itrAcknowledgement')} />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Contact Details</h3></div>
                <TextInputField label="Authorized Contact Person" icon={User} name="authorizedPerson" value={formData.authorizedPerson} onChange={handleInputChange} required />
                <TextInputField label="Mobile Number" icon={Phone} name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" />
                <TextInputField label="Email Address" icon={Mail} name="email" value={formData.email} onChange={handleInputChange} type="email" required />
                <TextInputField label="Escalation Contact Details" icon={Phone} name="escContact" value={formData.escContact} onChange={handleInputChange} required type="tel" />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Declarations</h3></div>
                <FileUploadField label="Conflict of Interest Declaration" icon={FileText} file={files.conflictOfInterest} onFileSelect={handleFileSelect('conflictOfInterest')} />
                <FileUploadField label="Anti-Bribery & Anti-Corruption Declaration" icon={FileText} file={files.antiBribery} onFileSelect={handleFileSelect('antiBribery')} />
                <FileUploadField label="Compliance Declaration" icon={FileText} file={files.complianceDecl} onFileSelect={handleFileSelect('complianceDecl')} />
                <FileUploadField label="Blacklisting Declaration" icon={FileText} file={files.blacklistingDecl} onFileSelect={handleFileSelect('blacklistingDecl')} />
                <FileUploadField label="Confidentiality Declaration" icon={FileText} file={files.confidentialityDecl} onFileSelect={handleFileSelect('confidentialityDecl')} />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Quality & Business Capability</h3></div>
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

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Service Capability</h3></div>
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {SERVICE_CAPABILITIES.map(opt => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:border-red-600 hover:bg-red-50 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.serviceCapabilities.includes(opt)}
                        onChange={() => handleServiceToggle(opt)}
                        className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors">{opt}</span>
                    </label>
                  ))}
                </div>

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">OEM / Brand Representation</h3></div>
                <TextInputField label="Brand / OEM 1 (Optional)" icon={Tag} name="oemBrand1" value={formData.oemBrands[0]} onChange={(e) => handleOemBrandChange(0, e.target.value)} />
                <TextInputField label="Brand / OEM 2 (Optional)" icon={Tag} name="oemBrand2" value={formData.oemBrands[1]} onChange={(e) => handleOemBrandChange(1, e.target.value)} />
                <TextInputField label="Brand / OEM 3 (Optional)" icon={Tag} name="oemBrand3" value={formData.oemBrands[2]} onChange={(e) => handleOemBrandChange(2, e.target.value)} />
                <FileUploadField label="Upload Authorization Letter (Optional)" icon={FileText} file={files.authorizationLetter} onFileSelect={handleFileSelect('authorizationLetter')} />


                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Certifications (If Available)</h3></div>
                <FileUploadField label="ISO 9001 (If Available)" icon={ShieldCheck} file={files.iso9001} onFileSelect={handleFileSelect('iso9001')} />
                <FileUploadField label="ISO 14001 (If Available)" icon={ShieldCheck} file={files.iso14001} onFileSelect={handleFileSelect('iso14001')} />
                <FileUploadField label="ISO 45001 (If Available)" icon={ShieldCheck} file={files.iso45001} onFileSelect={handleFileSelect('iso45001')} />
                <FileUploadField label="GMP (If Available)" icon={ShieldCheck} file={files.gmp} onFileSelect={handleFileSelect('gmp')} />
                <FileUploadField label="CE (If Available)" icon={ShieldCheck} file={files.ce} onFileSelect={handleFileSelect('ce')} />
                <FileUploadField label="Other Relevant Certifications (If Available)" icon={ShieldCheck} file={files.otherCertifications} onFileSelect={handleFileSelect('otherCertifications')} />

                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Agreements</h3></div>
                <FileUploadField label="Vendor Registration Form (Optional)" icon={FileText} file={files.vendorRegistrationForm} onFileSelect={handleFileSelect('vendorRegistrationForm')} />
                <FileUploadField label="NDA (If Applicable)" icon={FileText} file={files.nda} onFileSelect={handleFileSelect('nda')} />
                <FileUploadField label="Code of Conduct Acceptance (Optional)" icon={FileText} file={files.codeOfConduct} onFileSelect={handleFileSelect('codeOfConduct')} />
                <FileUploadField label="Payment Terms Acceptance (Optional)" icon={FileText} file={files.paymentTerms} onFileSelect={handleFileSelect('paymentTerms')} />
                <FileUploadField label="Purchase Terms & Conditions Acceptance (Optional)" icon={FileText} file={files.purchaseTerms} onFileSelect={handleFileSelect('purchaseTerms')} />

              </div>

              <div className="mt-8">
                <div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Final Submission / Checklist</h3></div>
                <div className="space-y-4 bg-gray-50 p-8 border border-gray-200 rounded-xl">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="verifiedInfo" checked={checkboxes.verifiedInfo} onChange={handleCheckboxChange} className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">All Information Verified</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="documentsUploaded" checked={checkboxes.documentsUploaded} onChange={handleCheckboxChange} className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Documents Uploaded</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <input type="checkbox" name="authSignatory" checked={checkboxes.authSignatory} onChange={handleCheckboxChange} className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Authorized Signatory Confirmation</span>
                  </label>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    alert("Your progress has been saved as a draft on your device.");
                    setStep(1);
                  }}
                  className="w-full sm:w-1/3 bg-white border border-gray-300 text-gray-700 py-6 font-black uppercase tracking-widest text-sm hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm rounded-lg"
                >
                  Save Draft & Exit
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 bg-red-600 text-white py-6 font-black uppercase tracking-widest text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-md rounded-lg"
                >
                  {isSubmitting ? 'Securing Data...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-slate-50 border-t-[6px] border-t-green-600 rounded-2xl shadow-[0_0_80px_-15px_rgba(0,0,0,0.8)] text-center py-16 px-8 sm:px-12 animate-in zoom-in duration-700 mt-10">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-600/20">
              <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-gray-900 mb-4">
              {submissionStatus === 'Observation' ? 'Registration Under Observation' : 'Registration Completed'}
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl text-center leading-relaxed mb-10">
              {submissionStatus === 'Observation'
                ? 'Registration received with observations. We will contact you soon.'
                : 'Thank you for registering. We will review your profile and get back to you soon.'}
            </p>

            <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 text-left mb-12 max-w-lg mx-auto">
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-200 pb-4">Submission Summary</h3>
              <div className="space-y-4">
                <div><span className="text-gray-500 uppercase text-[10px] font-bold tracking-widest block mb-1">Company Name</span><span className="text-gray-900 font-semibold">{formData.companyName}</span></div>
                <div>
                  <span className="text-gray-500 uppercase text-xs font-black tracking-widest block mb-2">Category</span>
                  <div className="flex flex-wrap gap-2">
                    {(formData.categories.includes('Other') ? formData.categories.filter(c => c !== 'Other').concat(formData.otherCategory) : formData.categories).map((cat, i) => (
                      <span key={i} className="inline-block bg-white border border-gray-300 px-3 py-1 rounded-md shadow-sm text-[10px] uppercase font-bold text-gray-700">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div><span className="text-gray-500 uppercase text-[10px] font-bold tracking-widest block mb-1">Email</span><span className="text-gray-900 font-semibold">{formData.email}</span></div>
                <div><span className="text-gray-500 uppercase text-[10px] font-bold tracking-widest block mb-1">Contact Person</span><span className="text-gray-900 font-semibold">{formData.authorizedPerson}</span></div>
              </div>
              <p className="text-xs text-gray-500 mt-8 italic">A detailed confirmation has been sent to your email.</p>
              {applicationId && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center shadow-sm">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500 block mb-1">Your Application ID</span>
                  <span className="text-2xl font-black text-red-600">#{applicationId}</span>
                  <p className="text-xs text-red-800 mt-2 font-medium">Save this ID. You can use it to update your registration later.</p>
                </div>
              )}
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
                  setApplicationId(null);
                  setIsUpdateMode(false);
                  setStep(1);
                }}
                className="mx-auto block bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all rounded-lg shadow-md mb-8"
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
