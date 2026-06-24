const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Search to imports
content = content.replace(/import \{([\s\S]*?)\} from 'lucide-react';/, (match, group) => {
   if (!group.includes('Search')) {
      return `import { Search, ${group.trim()} } from 'lucide-react';`;
   }
   return match;
});

// 2. Add vendorSearch state
content = content.replace(
   /const \[newVideoCategory, setNewVideoCategory\] = useState\(''\);/,
   `const [newVideoCategory, setNewVideoCategory] = useState('');\n   const [vendorSearch, setVendorSearch] = useState('');`
);

// 3. Add filteredVendors logic before return
content = content.replace(
   /   return \(/,
   `   const filteredVendors = vendors.filter(v => {
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

   return (`
);

// 4. Update the Vendors Tab UI
const vendorTabRegex = /<div className="flex justify-between items-center border-b border-white\/5 pb-6">[\s\S]*?<button onClick=\{fetchVendorData\} className="p-2 bg-white\/5 hover:bg-white\/10 text-white rounded-full transition-colors" title="Refresh List">/;
const vendorTabReplacement = `<div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 gap-4">
                           <div>
                              <h3 className="text-xl font-black uppercase tracking-tighter text-white">Vendor Management System</h3>
                              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-1">Review entity applications and compliance status</p>
                           </div>
                           <div className="flex items-center gap-4 w-full md:w-auto">
                              <div className="relative flex-grow md:flex-grow-0">
                                 <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                 <input
                                    type="text"
                                    placeholder="Search vendors..."
                                    value={vendorSearch}
                                    onChange={(e) => {
                                       setVendorSearch(e.target.value);
                                       setVendorPage(1);
                                    }}
                                    className="bg-black border border-white/10 text-white pl-10 pr-4 py-2 text-xs outline-none focus:border-red-600 transition-colors w-full md:w-64"
                                 />
                                 {vendorSearch && (
                                    <button onClick={() => { setVendorSearch(''); setVendorPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                                       <X className="w-3 h-3" />
                                    </button>
                                 )}
                              </div>
                              <button onClick={fetchVendorData} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full shrink-0 transition-colors" title="Refresh List">`;
content = content.replace(vendorTabRegex, vendorTabReplacement);

// 5. Update mapping from vendors to filteredVendors
content = content.replace(
   /vendors\.slice\(\(vendorPage - 1\) \* VENDORS_PER_PAGE, vendorPage \* VENDORS_PER_PAGE\)\.map/g,
   `filteredVendors.slice((vendorPage - 1) * VENDORS_PER_PAGE, vendorPage * VENDORS_PER_PAGE).map`
);

// 6. Update empty states and pagination checks
content = content.replace(
   /\{vendors\.length === 0 && !isLoadingVendors && <div className="p-12 text-center border border-dashed border-white\/10 text-neutral-600 uppercase text-xs">No pending applications<\/div>\}/,
   `{vendors.length === 0 && !isLoadingVendors && <div className="p-12 text-center border border-dashed border-white/10 text-neutral-600 uppercase text-xs">No pending applications</div>}
    {vendors.length > 0 && filteredVendors.length === 0 && <div className="p-12 text-center border border-dashed border-white/10 text-neutral-600 uppercase text-xs">No vendors match your search</div>}`
);

content = content.replace(
   /vendors\.length > VENDORS_PER_PAGE/g,
   `filteredVendors.length > VENDORS_PER_PAGE`
);

content = content.replace(
   /Math\.ceil\(vendors\.length \/ VENDORS_PER_PAGE\)/g,
   `totalVendorPages`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Search functionality added.');
