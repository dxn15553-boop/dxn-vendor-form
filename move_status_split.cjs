const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

const topBlockPattern = /\{\/\* Submission Status \*\/\}\s*<div className="bg-white shadow-sm border border-neutral-200 p-6">\s*<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-5 flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500" \/> Submission Status<\/h3>[\s\S]*?(?=\{\/\* Registration Info Grid \*\/\})/g;

const newTopBlock = `{/* Submission Status */}
                  <div className="bg-white shadow-sm border border-neutral-200 p-6 mb-8">
                     <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5 text-red-500" /> Application Status</h3>
                     <div>
                        <span className={\`inline-block px-3 py-1 text-xs font-black uppercase border \${
                           selectedVendor.status === 'approved' ? 'border-green-500 text-green-500 bg-green-50' :
                           selectedVendor.status === 'rejected' ? 'border-red-700 text-red-700 bg-red-50' :
                           'border-amber-500 text-amber-600 bg-amber-50'
                        }\`}>{selectedVendor.status || 'Pending Review'}</span>
                     </div>
                  </div>

                  `;

content = content.replace(topBlockPattern, newTopBlock);

const insertionPoint = `{/* Uploaded Documents */}`;
const bottomBlock = `{/* Observations / Missing Items */}
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
                  )}

                  {/* Uploaded Documents */}`;

content = content.replace(insertionPoint, bottomBlock);

fs.writeFileSync(file, content);
console.log("Successfully moved Observation Items down and kept Application Status at top.");
