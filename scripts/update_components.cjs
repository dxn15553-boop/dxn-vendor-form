const fs = require('fs');
let code = fs.readFileSync('pages/VendorRegistration.tsx', 'utf8');

// TextInputField & TextAreaField
code = code.replace(/className="w-full bg-black border border-white\/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all"/g, 'className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"');
code = code.replace(/className="w-full bg-black border border-white\/10 px-6 py-4 text-white outline-none focus:border-red-600 transition-all resize-none"/g, 'className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all resize-none"');

// SelectInputField
code = code.replace(/className="w-full bg-black border border-white\/10 px-6 py-4 pr-12 text-white outline-none focus:border-red-600 transition-all appearance-none cursor-pointer"/g, 'className="w-full bg-white border border-gray-300 rounded-lg px-6 py-4 pr-12 text-gray-900 shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none cursor-pointer"');

// CategoryAccordion wrapper
code = code.replace(/className="border border-white\/10 bg-neutral-900 overflow-hidden mb-4"/g, 'className="border border-gray-200 bg-gray-50 rounded-xl overflow-hidden mb-4 shadow-sm"');
code = code.replace(/className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white\/5 transition-colors"/g, 'className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white transition-colors"');
code = code.replace(/className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-3"/g, 'className="font-bold text-gray-900 uppercase tracking-wider text-sm flex items-center gap-3"');
code = code.replace(/className="px-6 py-4 bg-black border-t border-white\/10 grid grid-cols-1 md:grid-cols-2 gap-4"/g, 'className="px-6 py-4 bg-white border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4"');

// CategoryAccordion checkboxes labels
code = code.replace(/className="text-xs font-bold uppercase text-neutral-300 group-hover:text-white transition-colors"/g, 'className="text-xs font-bold uppercase text-gray-700 group-hover:text-red-600 transition-colors"');

// Form Checkboxes (like CheckboxField if they exist, or just general)
code = code.replace(/className="flex items-center gap-3 p-3 bg-black border border-white\/5 cursor-pointer hover:border-red-600\/30 transition-all"/g, 'className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md shadow-sm cursor-pointer hover:border-red-600 hover:bg-red-50 transition-all"');
code = code.replace(/className="text-xs font-bold uppercase text-neutral-300"/g, 'className="text-xs font-bold uppercase text-gray-700"');

// SelectInputField options inside
code = code.replace(/className="bg-black text-white"/g, 'className="bg-white text-gray-900"');

fs.writeFileSync('pages/VendorRegistration.tsx', code);
console.log('Components updated!');
