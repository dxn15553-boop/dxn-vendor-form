const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

const oldObservationBlock = `{/* Observations / Missing Items */}
                  {selectedVendor.missing_items && (
                     <div className="bg-amber-50 border border-amber-200 p-6 mb-8">
                        <h3 className="text-amber-800 font-black uppercase tracking-widest text-xs border-b border-amber-200 pb-3 mb-4 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> Missing / Observation Items</h3>
                        <div className="space-y-2">
                           {selectedVendor.missing_items.split(',').map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-amber-700 text-xs font-medium">
                                 <AlertTriangle className="w-3 h-3 shrink-0" />
                                 <span>{item.trim()}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
                  {!selectedVendor.missing_items && (
                     <div className="bg-green-50 border border-green-200 p-6 mb-8">
                        <h3 className="text-green-800 font-black uppercase tracking-widest text-xs border-b border-green-200 pb-3 mb-4 flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5" /> Missing / Observation Items</h3>
                        <div className="flex items-center gap-2 text-green-700 text-xs font-bold uppercase tracking-widest">
                           <CheckCircle className="w-4 h-4" />
                           <span>All forms and documents submitted — Complete</span>
                        </div>
                     </div>
                  )}`;

const newObservationBlock = `{/* Observations / Missing Items */}
                  {selectedVendor.missing_items && (
                     <div className="bg-white shadow-sm border border-neutral-200 p-6 mb-8">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Missing / Observation Items</h3>
                        <div className="space-y-2">
                           {selectedVendor.missing_items.split(',').map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-neutral-700 text-xs font-medium">
                                 <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                                 <span>{item.trim()}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
                  {!selectedVendor.missing_items && (
                     <div className="bg-white shadow-sm border border-neutral-200 p-6 mb-8">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Missing / Observation Items</h3>
                        <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest">
                           <CheckCircle className="w-4 h-4" />
                           <span>All forms and documents submitted — Complete</span>
                        </div>
                     </div>
                  )}`;

if(content.includes(oldObservationBlock)) {
   content = content.replace(oldObservationBlock, newObservationBlock);
   fs.writeFileSync(file, content);
   console.log("Updated observation block styles.");
} else {
   // Fallback using regex just in case formatting shifted slightly
   const regex = /\{\/\* Observations \/ Missing Items \*\/\}[\s\S]*?(?=\{\/\* Uploaded Documents \*\/\})/g;
   if(regex.test(content)) {
      content = content.replace(regex, newObservationBlock + '\n\n                  ');
      fs.writeFileSync(file, content);
      console.log("Updated observation block styles using regex.");
   } else {
      console.log("Could not find the block.");
   }
}
