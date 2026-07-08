const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const docCategorizationCode = `const DOCUMENT_CATEGORIES: Record<string, string[]> = {
   'Entity Documentation': ['COMPANYREGISTRATION', 'PANCARD', 'GSTCERTIFICATE', 'COMPANYPROFILE', 'ORGCHART', 'CANCELLEDCHEQUE', 'BANKACCOUNTDETAILS'],
   'Statutory Compliance': ['MSMECERTIFICATE', 'PFREGISTRATION', 'ESIREGISTRATION', 'PROFTAXREGISTRATION', 'LABOURLICENSE'],
   'Financial Information': ['AUDITEDFINANCIALS', 'ITRACKNOWLEDGEMENT'],
   'Declarations': ['CONFLICTOFINTEREST', 'ANTIBRIBERY', 'COMPLIANCEDECL', 'BLACKLISTINGDECL', 'CONFIDENTIALITYDECL'],
   'Quality & Business Capability': ['MAJORCUSTOMERLIST', 'CUSTOMERREFERENCES', 'PRODUCTCATALOGUE', 'MANUFACTURINGFACILITY', 'SERVICEINFRASTRUCTURE'],
   'Certifications': ['ISO9001', 'ISO14001', 'ISO45001', 'GMP', 'CE', 'OTHERCERTIFICATIONS']
};

const categorizeDocuments = (docs: { name: string; url: string }[]) => {
   const categorized: Record<string, { name: string; url: string }[]> = {
      'Entity Documentation': [],
      'Statutory Compliance': [],
      'Financial Information': [],
      'Declarations': [],
      'Quality & Business Capability': [],
      'Certifications': [],
      'Other / Uncategorized': []
   };

   docs.forEach(doc => {
      const match = doc.name.match(/^\\[(.*?)\\]/);
      let foundCategory = false;
      
      if (match) {
         const key = match[1].toUpperCase();
         for (const [catName, keys] of Object.entries(DOCUMENT_CATEGORIES)) {
            if (keys.includes(key)) {
               categorized[catName].push(doc);
               foundCategory = true;
               break;
            }
         }
      } else {
         // Heuristic fallback for older files
         const lower = doc.name.toLowerCase();
         if (lower.includes('pan') || lower.includes('gst') || lower.includes('profile') || lower.includes('cheque') || lower.includes('bank') || lower.includes('company')) {
            categorized['Entity Documentation'].push(doc);
            foundCategory = true;
         } else if (lower.includes('msme') || lower.includes('pf') || lower.includes('esi') || lower.includes('labour') || lower.includes('tax')) {
            categorized['Statutory Compliance'].push(doc);
            foundCategory = true;
         } else if (lower.includes('audit') || lower.includes('itr') || lower.includes('financial')) {
            categorized['Financial Information'].push(doc);
            foundCategory = true;
         } else if (lower.includes('decl') || lower.includes('conflict') || lower.includes('bribery') || lower.includes('nda') || lower.includes('conduct')) {
            categorized['Declarations'].push(doc);
            foundCategory = true;
         } else if (lower.includes('iso') || lower.includes('gmp') || lower.includes('ce') || lower.includes('cert')) {
            categorized['Certifications'].push(doc);
            foundCategory = true;
         } else if (lower.includes('customer') || lower.includes('catalogue') || lower.includes('facility') || lower.includes('infrastructure') || lower.includes('brochure')) {
            categorized['Quality & Business Capability'].push(doc);
            foundCategory = true;
         }
      }

      if (!foundCategory) {
         categorized['Other / Uncategorized'].push(doc);
      }
   });

   return categorized;
};`;

// Insert the code just before Admin component definition
content = content.replace(
    /const Admin: React\.FC = \(\) => {/,
    docCategorizationCode + '\n\nconst Admin: React.FC = () => {'
);

// Replace the single Uploaded Documents details block
const oldDocsBlock = `{/* Uploaded Documents */}
                  <details open className="group bg-white">
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
                  </details>`;

const newDocsBlock = `{/* Categorized Uploaded Documents */}
                  {isLoadingDocs ? (
                     <div className="p-8 text-center text-neutral-500 text-xs uppercase tracking-widest flex flex-col items-center gap-3 bg-white"><RefreshCw className="w-5 h-5 animate-spin text-red-500" /> Fetching documents...</div>
                  ) : vendorDocs.length === 0 ? (
                     <div className="p-8 text-center text-neutral-500 text-xs italic bg-white">No documents found in storage. Documents from new registrations are automatically uploaded.</div>
                  ) : (
                     Object.entries(categorizeDocuments(vendorDocs)).map(([catName, docs]) => {
                        if (docs.length === 0) return null;
                        return (
                           <details key={catName} open className="group bg-white">
                              <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                                 <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Upload className="w-3.5 h-3.5 text-red-500" /> {catName}</h3>
                                 <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                              </summary>
                              <div className="p-5 pt-4">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {docs.map((doc) => (
                                       <a
                                          key={doc.name}
                                          href={doc.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-3 bg-white border border-neutral-200 px-4 py-3 hover:border-red-600 hover:bg-red-600/5 transition-all group shadow-sm rounded-sm"
                                       >
                                          <FileText className="w-4 h-4 text-red-500 shrink-0" />
                                          <span className="text-neutral-700 text-[10px] font-bold uppercase truncate group-hover:text-neutral-900 transition-colors" title={doc.name.replace(/^\\[.*?\\]\\s*(.*\\s*-\\s*)?/, '')}>{doc.name.replace(/^\\[.*?\\]\\s*(.*\\s*-\\s*)?/, '')}</span>
                                          <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-neutral-900 ml-auto shrink-0" />
                                       </a>
                                    ))}
                                 </div>
                              </div>
                           </details>
                        );
                     })
                  )}`;

// To ensure strict string matching despite formatting differences, I will use replace on the string:
const startIdx = content.indexOf('{/* Uploaded Documents */}');
const endIdx = content.indexOf('</details>', startIdx) + '</details>'.length;
if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + newDocsBlock + content.substring(endIdx);
} else {
    console.error("Could not find Uploaded Documents block.");
}

fs.writeFileSync(file, content);
console.log("Successfully categorized uploaded documents.");
