const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Company & Contact Info
const companyBlockOrig = `<div className="bg-white shadow-sm border border-neutral-200 p-6">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><Building className="w-3.5 h-3.5 text-red-500" /> Company & Contact Info</h3>
                        <div className="overflow-x-auto">`;

const companyBlockNew = `<details open className="bg-white shadow-sm border border-neutral-200 group">
                        <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Building className="w-3.5 h-3.5 text-red-500" /> Company & Contact Info</h3>
                           <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                        </summary>
                        <div className="p-5 pt-0 overflow-x-auto">`;

// For the closing tags, the original was:
//                            </table>
//                         </div>
//                      </div>
// We need to replace the `</div>` with `</details>` for company block. We'll do this by replacing the original block start and manually fixing the end via regex or split.

// Actually, regex replacement is cleaner:
content = content.replace(
    /<div className="bg-white shadow-sm border border-neutral-200 p-6">\s*<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><Building className="w-3\.5 h-3\.5 text-red-500" \/> Company & Contact Info<\/h3>([\s\S]*?)<\/table>\s*<\/div>\s*<\/div>/,
    `<details open className="bg-white shadow-sm border border-neutral-200 group">
                        <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Building className="w-3.5 h-3.5 text-red-500" /> Company & Contact Info</h3>
                           <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                        </summary>
                        <div className="p-5 pt-4">$1</table>
                        </div>
                     </details>`
);

// 2. Business Details
content = content.replace(
    /<div className="bg-white shadow-sm border border-neutral-200 p-6">\s*<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-4 flex items-center gap-2"><Briefcase className="w-3\.5 h-3\.5 text-red-500" \/> Business Details<\/h3>([\s\S]*?)<\/table>\s*<\/div>\s*<\/div>/,
    `<details open className="bg-white shadow-sm border border-neutral-200 group">
                        <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                           <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-red-500" /> Business Details</h3>
                           <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                        </summary>
                        <div className="p-5 pt-4">$1</table>
                        </div>
                     </details>`
);

// 3. Facility Overview
content = content.replace(
    /<div className="bg-white shadow-sm border border-neutral-200 p-6">\s*<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-5 flex items-center gap-2"><FileText className="w-3\.5 h-3\.5 text-red-500" \/> Facility Capabilities Overview<\/h3>([\s\S]*?)<\/div>/,
    `<details open className="bg-white shadow-sm border border-neutral-200 group mb-8">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-red-500" /> Facility Capabilities Overview</h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-5 pt-4">$1</div>
                  </details>`
);

// 4. Uploaded Documents
content = content.replace(
    /<div className="bg-white shadow-sm border border-neutral-200 p-6">\s*<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs border-b border-neutral-200 pb-3 mb-5 flex items-center gap-2"><Upload className="w-3\.5 h-3\.5 text-red-500" \/> Uploaded Documents<\/h3>([\s\S]*?)(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/,
    `<details open className="bg-white shadow-sm border border-neutral-200 group">
                     <summary className="p-5 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-neutral-50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-neutral-200 mb-4 group-open:mb-0">
                        <h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Upload className="w-3.5 h-3.5 text-red-500" /> Uploaded Documents</h3>
                        <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform group-open:rotate-180 shrink-0" />
                     </summary>
                     <div className="p-5 pt-4">$1</div>
                  </details>`
);

fs.writeFileSync(file, content);
console.log("Successfully converted sections to accordions.");
