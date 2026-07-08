const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<span className=\{\`ml-4 px-3 py-1 text-\[8px\] font-black uppercase border \$\{\s*selectedVendor\.status === 'approved' \? 'border-green-500 text-green-500 bg-green-500\/5' :\s*selectedVendor\.status === 'rejected' \? 'border-red-700 text-red-700 bg-red-700\/5' :\s*'border-amber-500 text-amber-500 bg-amber-500\/5'\s*\}\`\}>\{selectedVendor\.status \|\| 'pending'\}<\/span>\s*<\/div>\s*<\/>\s*\}\)\s*<\/div>/m;

const replacement = `<span className={\`ml-4 px-3 py-1 text-[8px] font-black uppercase border \${
                     selectedVendor.status === 'approved' ? 'border-green-500 text-green-500 bg-green-500/5' :
                     selectedVendor.status === 'rejected' ? 'border-red-700 text-red-700 bg-red-700/5' :
                     'border-amber-500 text-amber-500 bg-amber-500/5'
                  }\`}>{selectedVendor.status || 'pending'}</span>
               </div>
               <div className="flex items-center gap-3">
                  <button
                     onClick={() => setVendorEmailPreview(p => !p)}
                     className={\`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all \${vendorEmailPreview ? 'bg-red-600 border-red-600 text-white' : 'border-white/20 text-neutral-400 hover:text-white hover:bg-white/5'}\`}
                  >
                     <Mail className="w-3.5 h-3.5" /> {vendorEmailPreview ? 'Hide Email Preview' : 'Email Preview'}
                  </button>
                  <button
                     onClick={() => window.print()}
                     className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border border-white/20 text-neutral-400 hover:text-white hover:bg-white/5 transition-all print:hidden"
                  >
                     <Download className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  {selectedVendor.status === 'pending' && (
                     <>
                        <button onClick={() => handleApproveVendor(selectedVendor.id)} className="bg-green-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-green-500 transition-colors">Approve</button>
                        <button onClick={() => handleRejectVendor(selectedVendor.id)} className="bg-red-600 text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors">Reject</button>
                     </>
                  )}
               </div>`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Restored the modal buttons and added Print functionality.');
