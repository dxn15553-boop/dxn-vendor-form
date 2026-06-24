const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetRegex = /\{\/\* Uploaded Documents \*\/\}[\s\S]*?export default Admin;/;

const newBlock = `{/* Uploaded Documents */}
                  <details open className="bg-white shadow-sm border border-neutral-200 group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Upload className="w-3.5 h-3.5 text-red-500" /> Uploaded Documents</h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-5 pt-4">
                     {isLoadingDocs && <p className="text-neutral-500 text-xs uppercase tracking-widest">Fetching documents from storage...</p>}
                     {!isLoadingDocs && vendorDocs.length === 0 && (
                        <p className="text-neutral-500 text-xs italic">No documents found in storage. Documents from new registrations are automatically uploaded.</p>
                     )}
                     {!isLoadingDocs && vendorDocs.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                           {vendorDocs.map((doc) => (
                              <a
                                 key={doc.name}
                                 href={doc.url}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="flex items-center gap-3 bg-white border border-neutral-200 px-4 py-3 hover:border-red-600 hover:bg-red-600/5 transition-all group"
                              >
                                 <FileText className="w-4 h-4 text-red-500 shrink-0" />
                                 <span className="text-neutral-700 text-[10px] font-bold uppercase truncate group-hover:text-neutral-900 transition-colors">{doc.name}</span>
                                 <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-neutral-900 ml-auto shrink-0" />
                              </a>
                           ))}
                        </div>
                     )}
                  </div>
                  </details>
                  </div>
               </div>
            </div>
          </div>
      )}
      </>
   );
};

export default Admin;`;

content = content.replace(targetRegex, newBlock);
fs.writeFileSync(file, content);
console.log("Fixed syntax errors and duplications.");
