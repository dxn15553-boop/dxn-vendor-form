const fs = require('fs');
const path = 'd:\\\\Layasri\\\\Website\\\\Deployment\\\\dxn-india-manufacturing---global-flagship\\\\pages\\\\Admin.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add states
content = content.replace(
  /const \[vendorSearch, setVendorSearch\] = useState\(''\);\s*const \[vendorActivityFilter, setVendorActivityFilter\] = useState<.*>\('all'\);\s*\/\/ Sync ref/,
  `const [vendorSearch, setVendorSearch] = useState('');
   const [vendorActivityFilter, setVendorActivityFilter] = useState<'all' | 'registered_today' | 'updated_today' | 'completed' | 'observation'>('all');
   const [vendorCategoryFilter, setVendorCategoryFilter] = useState<string[]>([]);
   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

   // Sync ref`
);

// 2. Add filtering logic
content = content.replace(
  /if \(vendorActivityFilter === 'observation'\) \{\s*if \(!\(v\.missing_items && v\.missing_items\.trim\(\)\.length > 0 && v\.status !== 'approved'\)\) return false;\s*\}\s*if \(!vendorSearch\) return true;/,
  `if (vendorActivityFilter === 'observation') {
         if (!(v.missing_items && v.missing_items.trim().length > 0 && v.status !== 'approved')) return false;
      }

      if (vendorCategoryFilter.length > 0) {
         const vendorCatStr = (v.vendor_category || '').toLowerCase();
         const hasMatch = vendorCategoryFilter.some(cat => vendorCatStr.includes(cat.toLowerCase()));
         if (!hasMatch) return false;
      }

      if (!vendorSearch) return true;`
);

// 3. Add UI logic
content = content.replace(
  /<div className="flex items-center gap-2 w-full sm:w-auto">\s*<select\s*value=\{vendorActivityFilter\}/,
  `<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                     <div className="relative">
                                        <button 
                                           onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                           className="bg-black border border-white/20 text-white px-4 py-2 text-xs outline-none hover:border-red-600 transition-colors flex items-center justify-between gap-2 w-full sm:w-auto min-w-[160px] md:min-w-[180px]"
                                        >
                                           <span className="truncate">
                                              {vendorCategoryFilter.length === 0 ? 'All Categories' : \`\${vendorCategoryFilter.length} Selected\`}
                                           </span>
                                           <ChevronDown className={\`w-3 h-3 text-neutral-500 transition-transform \${isCategoryDropdownOpen ? 'rotate-180' : ''}\`} />
                                        </button>
                                        
                                        {isCategoryDropdownOpen && (
                                           <>
                                              <div className="fixed inset-0 z-40" onClick={() => setIsCategoryDropdownOpen(false)}></div>
                                              <div className="absolute top-full mt-1 right-0 md:right-auto md:left-0 w-[280px] max-h-96 overflow-y-auto bg-neutral-900 border border-white/10 shadow-2xl z-50 p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                                 {vendorCategoryFilter.length > 0 && (
                                                    <button onClick={() => { setVendorCategoryFilter([]); setVendorPage(1); }} className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase mb-2 w-full text-left px-2 py-1">Clear All Filters</button>
                                                 )}
                                                 {Object.entries(VENDOR_CATEGORIES).map(([group, items]) => (
                                                    <div key={group} className="mb-4">
                                                       <div className="text-[9px] font-black uppercase tracking-wider text-neutral-500 mb-1 px-2 pb-1 border-b border-white/5">{group}</div>
                                                       {items.map(item => (
                                                          <label key={item} className="flex items-start gap-2 p-2 hover:bg-white/5 cursor-pointer rounded transition-colors">
                                                             <input 
                                                                type="checkbox" 
                                                                checked={vendorCategoryFilter.includes(item)}
                                                                onChange={(e) => {
                                                                   if (e.target.checked) {
                                                                      setVendorCategoryFilter(prev => [...prev, item]);
                                                                   } else {
                                                                      setVendorCategoryFilter(prev => prev.filter(i => i !== item));
                                                                   }
                                                                   setVendorPage(1);
                                                                }}
                                                                className="mt-0.5 accent-red-600 rounded-sm cursor-pointer"
                                                             />
                                                             <span className="text-[11px] text-neutral-300 leading-tight select-none">{item}</span>
                                                          </label>
                                                       ))}
                                                    </div>
                                                 ))}
                                              </div>
                                           </>
                                        )}
                                     </div>
                                     <select
                                        value={vendorActivityFilter}`
);

fs.writeFileSync(path, content);
console.log('Admin.tsx updated successfully.');
