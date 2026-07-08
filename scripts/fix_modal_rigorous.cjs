const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// Match everything from VENDOR DETAIL MODAL down to Email Preview Panel
const regex = /\{\/\* ======= VENDOR DETAIL MODAL ======= \*\/\}\s*\{selectedVendor && \([\s\S]*?\{\/\* Email Preview Panel \*\/\}/m;

const replacement = `{\/* ======= VENDOR DETAIL MODAL ======= *\/}
      {selectedVendor && (
         <div className="fixed inset-0 z-[120] bg-black/95 flex flex-col overflow-hidden">
            {\/* Modal Header *\/}
            <div className="flex items-center justify-between px-8 py-5 bg-neutral-900 border-b border-white/10 shrink-0">
               <div className="flex items-center gap-4">
                  <button
                     onClick={() => setSelectedVendor(null)}
                     className="text-neutral-500 hover:text-white p-2 hover:bg-white/5 rounded transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>
                  <div>
                     <h2 className="text-white font-black uppercase tracking-tight text-lg">{selectedVendor.company_name || selectedVendor.companyName}</h2>
                     <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">Application ID: #{selectedVendor.id}</p>
                  </div>
                  <span className={\`ml-4 px-3 py-1 text-[8px] font-black uppercase border \${
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
               </div>
            </div>

            {\/* Modal Body *\/}
            <div className="flex-grow overflow-y-auto">
               <div className="max-w-5xl mx-auto px-8 py-10 space-y-6">

                  {\/* Email Preview Panel *\//`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully repaired the modal structure using rigorous regex.');
} else {
    console.log('Regex did not match. Please verify file state.');
}
