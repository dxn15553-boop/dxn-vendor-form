const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// FIX 1: Move Search from ContentContext to lucide-react import
content = content.replace(
  `import { Search, useContent } from '../context/ContentContext';`,
  `import { useContent } from '../context/ContentContext';`
);
content = content.replace(
  `   Save, Layout, Database, Image as ImageIcon, CheckCircle, Lock, Plus, Trash2,
   Video, Film, Briefcase, LogOut, Settings, ChevronRight, ChevronDown, Tag, RotateCcw, X,
   Users, FileText, Package, Download, Upload, AlertCircle, AlertTriangle, Truck, RefreshCw, ExternalLink,
   Calendar, Phone, MapPin, BarChart3, PlayCircle, Mail, Building, ShieldCheck } from 'lucide-react';`,
  `   Save, Layout, Database, Image as ImageIcon, CheckCircle, Lock, Plus, Trash2,
   Video, Film, Briefcase, LogOut, Settings, ChevronRight, ChevronDown, Tag, RotateCcw, X,
   Users, FileText, Package, Download, Upload, AlertCircle, AlertTriangle, Truck, RefreshCw, ExternalLink,
   Calendar, Phone, MapPin, BarChart3, PlayCircle, Mail, Building, ShieldCheck, Search
} from 'lucide-react';`
);

// FIX 2: Remove the misplaced filteredVendors/totalVendorPages/return code that got injected
// inside the renderCategorizedVendorCategory function
const badCode = `
   const filteredVendors = vendors.filter(v => {
      if (!vendorSearch) return true;
      const term = vendorSearch.toLowerCase();
      return (
         (v.company_name || v.companyName || '').toLowerCase().includes(term) ||
         (v.email || '').toLowerCase().includes(term) ||
         (v.pan_number || v.panNumber || '').toLowerCase().includes(term) ||
         (v.phone || '').toLowerCase().includes(term) ||
         (v.gst_number || v.gstNumber || '').toLowerCase().includes(term) ||
         (v.status || '').toLowerCase().includes(term)
      );
   });
   const totalVendorPages = Math.max(1, Math.ceil(filteredVendors.length / VENDORS_PER_PAGE));

   return (`;

const goodReturn = `
   return (`;

content = content.replace(badCode, goodReturn);

// FIX 3: Add filteredVendors and totalVendorPages inside the Admin component before return
const beforeReturn = `   if (loading) return null;`;
const withFilteredVendors = `   const filteredVendors = vendors.filter((v: any) => {
      if (!vendorSearch) return true;
      const term = vendorSearch.toLowerCase();
      return (
         (v.company_name || v.companyName || '').toLowerCase().includes(term) ||
         (v.email || '').toLowerCase().includes(term) ||
         (v.pan_number || v.panNumber || '').toLowerCase().includes(term) ||
         (v.phone || '').toLowerCase().includes(term) ||
         (v.gst_number || v.gstNumber || '').toLowerCase().includes(term) ||
         (v.status || '').toLowerCase().includes(term)
      );
   });
   const totalVendorPages = Math.max(1, Math.ceil(filteredVendors.length / VENDORS_PER_PAGE));

   if (loading) return null;`;

content = content.replace(beforeReturn, withFilteredVendors);

fs.writeFileSync(file, content, 'utf8');
console.log('All errors fixed.');
