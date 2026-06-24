const fs = require('fs');
let code = fs.readFileSync('pages/VendorRegistration.tsx', 'utf8');

// 1. Backgrounds
code = code.replace(/bg-neutral-950/g, 'bg-[#F8F9FC]');
code = code.replace(/bg-neutral-900/g, 'bg-white shadow-sm rounded-xl');
code = code.replace(/bg-neutral-800/g, 'bg-gray-50');
code = code.replace(/bg-black(?!\/)/g, 'bg-white'); // bg-black but not bg-black/90
code = code.replace(/bg-black\/90/g, 'bg-white/90 backdrop-blur-md');

// 2. Borders
code = code.replace(/border-white\/10/g, 'border-gray-200');
code = code.replace(/border-white\/5/g, 'border-gray-100');
code = code.replace(/border-white\/20/g, 'border-gray-300');
code = code.replace(/hover:border-white\/30/g, 'hover:border-gray-400');
code = code.replace(/hover:border-white\/10/g, 'hover:border-gray-300');

// 3. Text Colors
code = code.replace(/text-white(?! px-| py-| font-bold uppercase p-4| px-12| px-8)/g, 'text-gray-900');
code = code.replace(/text-neutral-400/g, 'text-gray-600');
code = code.replace(/text-neutral-500/g, 'text-gray-500');
code = code.replace(/text-neutral-300/g, 'text-gray-700');
code = code.replace(/text-neutral-600/g, 'text-gray-400');

// 4. Inputs specifically
code = code.replace(/className="w-full bg-white border border-gray-200 p-3 text-gray-900 focus:border-red-600 outline-none"/g, 'className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-sm"');

// 5. SectionTitle - remove 'light' prop
code = code.replace(/<SectionTitle subtitle="Partnership" title="Vendor Onboarding Portal" light \/>/g, '<SectionTitle subtitle="Partnership" title="Vendor Onboarding Portal" />');

// 6. Fix any buttons that got messed up
code = code.replace(/bg-red-600 text-gray-900/g, 'bg-red-600 text-white');
code = code.replace(/bg-red-600 px-6 py-3 text-gray-900/g, 'bg-red-600 px-6 py-3 text-white');
code = code.replace(/text-gray-900 font-bold/g, 'text-white font-bold'); 

// 7. Make form labels cleaner
code = code.replace(/text-xs font-black uppercase text-gray-500 mb-2 block/g, 'text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2 block');

// 8. Bottom bar shadow
code = code.replace(/fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4/g, 'fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]');

fs.writeFileSync('pages/VendorRegistration.tsx', code);
console.log('Theme updated!');
