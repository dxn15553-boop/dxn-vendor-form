const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const helperFunc = `
const categorizeMissingItems = (itemsString: string) => {
   const items = itemsString.split(',').map((i: string) => i.trim()).filter(Boolean);
   const categories: Record<string, string[]> = {
      'Mandatory Registrations & Tax': [],
      'Financial & Bank Details': [],
      'Compliance & Declarations': [],
      'Certifications & Quality': [],
      'Other Observations': []
   };

   items.forEach((item: string) => {
      const lower = item.toLowerCase();
      if (lower.includes('pan') || lower.includes('gst') || lower.includes('company registration') || lower.includes('profile')) {
         categories['Mandatory Registrations & Tax'].push(item);
      } else if (lower.includes('bank') || lower.includes('cheque') || lower.includes('financial') || lower.includes('itr')) {
         categories['Financial & Bank Details'].push(item);
      } else if (lower.includes('decl') || lower.includes('conflict') || lower.includes('bribery') || lower.includes('confidentiality') || lower.includes('code of conduct') || lower.includes('nda')) {
         categories['Compliance & Declarations'].push(item);
      } else if (lower.includes('iso') || lower.includes('gmp') || lower.includes('ce') || lower.includes('certificate') || lower.includes('license') || lower.includes('registration')) {
         categories['Certifications & Quality'].push(item);
      } else {
         categories['Other Observations'].push(item);
      }
   });

   return categories;
};

const Admin: React.FC = () => {`;

content = content.replace('const Admin: React.FC = () => {', helperFunc);

const targetBlock = `{selectedVendor.missing_items && (
                     <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-6 mb-8 rounded-r-sm shadow-sm">
                        <h3 className="text-black font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Action Required: Missing / Observation Items</h3>
                        <div className="space-y-2.5">
                           {selectedVendor.missing_items.split(',').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-amber-900 text-sm font-bold">
                                 <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                 <span className="leading-snug">{item.trim()}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}`;

const newBlock = `{selectedVendor.missing_items && (
                     <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-6 mb-8 rounded-r-sm shadow-sm">
                        <h3 className="text-black font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Action Required: Missing / Observation Items</h3>
                        <div className="space-y-5">
                           {Object.entries(categorizeMissingItems(selectedVendor.missing_items)).map(([cat, items]) => {
                              if (items.length === 0) return null;
                              return (
                                 <div key={cat} className="space-y-2">
                                    <h4 className="text-amber-800 text-[10px] font-black uppercase tracking-widest border-b border-amber-200/50 pb-1.5 mb-2">{cat}</h4>
                                    <div className="space-y-2">
                                       {items.map((item, i) => (
                                          <div key={i} className="flex items-start gap-2 text-amber-900 text-sm font-bold">
                                             <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                             <span className="leading-snug">{item}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  )}`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
    fs.writeFileSync(file, content);
    console.log("Successfully categorized missing items.");
} else {
    console.log("Could not find target block to replace.");
}
