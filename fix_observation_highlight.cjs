const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* Observations \/ Missing Items \*\/\}[\s\S]*?(?=\{\/\* Uploaded Documents \*\/\})/g;

const newObservationBlock = `{/* Observations / Missing Items */}
                  {selectedVendor.missing_items && (
                     <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-6 mb-8 rounded-r-sm shadow-sm">
                        <h3 className="text-amber-900 font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Action Required: Missing / Observation Items</h3>
                        <div className="space-y-2.5">
                           {selectedVendor.missing_items.split(',').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-amber-900 text-sm font-bold">
                                 <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                 <span className="leading-snug">{item.trim()}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
                  {!selectedVendor.missing_items && (
                     <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 p-6 mb-8 rounded-r-sm shadow-sm">
                        <h3 className="text-green-900 font-black uppercase tracking-widest text-xs mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Status Complete</h3>
                        <p className="text-green-800 text-sm font-bold">All required forms and documents have been successfully submitted.</p>
                     </div>
                  )}

                  `;

if(regex.test(content)) {
   content = content.replace(regex, newObservationBlock);
   fs.writeFileSync(file, content);
   console.log("Updated observation block with highlight styles.");
} else {
   console.log("Could not find the observation block using regex.");
}
