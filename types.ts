
export interface Stat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
}

export interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: string[];
  strengths: string[];
  capacity: string;
  image: string;
}

export interface Certification {
  id?: string;
  name: string;
  status: 'active' | 'in-progress';
  description: string;
  certificateNumber?: string;
  issuingAuthority?: string;
  category?: string;
  validUntil?: string;
  pdfUrl?: string;
  imageUrl?: string;
  logoUrl?: string;
  imageClass?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  status: 'Available' | 'Coming Soon' | 'Export Only';
}

export interface Vendor {
  uid: string;
  companyName: string;
  email: string;
  phone: string;
  taxId: string; // GST/PAN
  specialities: string[];
  status: 'pending' | 'approved' | 'rejected' | 'onboarding';
  documents: {
    name: string;
    url: string;
    type: string;
  }[];
  products: VendorProduct[];
  createdAt: number;
}

export interface VendorProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  priceEstimate?: string;
  capacity?: string;
}
