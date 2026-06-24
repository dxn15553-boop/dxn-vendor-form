const fs = require('fs');
let code = fs.readFileSync('pages/VendorRegistration.tsx', 'utf8');

// 1. Update the form components at the top
code = code.replace(
  /const TextInputField = \(\{ label, value, onChange, required = false, type = "text", placeholder, disabled = false \}: any\) => \(\s*<div className="space-y-2">\s*<label className="text-xs font-black uppercase tracking-\[0.2em\] text-neutral-500 flex items-center gap-2">\s*<span>\{label\} \{required && <span className="text-red-600 text-lg leading-none ml-1">\*<\/span>\}<\/span>\s*<\/label>\s*<input\s*type=\{type\}\s*value=\{value \|\| ''\}\s*onChange=\{e => onChange\(e.target.value\)\}\s*required=\{required\}\s*disabled=\{disabled\}\s*placeholder=\{placeholder\}\s*className="w-full bg-black border border-white\/10 p-3 text-white focus:border-red-600 outline-none disabled:opacity-50"\s*\/>\s*<\/div>\s*\);/g,
  `const TextInputField = ({ label, value, onChange, required = false, type = "text", placeholder, disabled = false }: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
      <span>{label} {required && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-sm disabled:opacity-50"
    />
  </div>
);`
);

code = code.replace(
  /const TextAreaField = \(\{ label, value, onChange, required = false, placeholder \}: any\) => \(\s*<div className="space-y-2">\s*<label className="text-xs font-black uppercase tracking-\[0.2em\] text-neutral-500 flex items-center gap-2">\s*<span>\{label\} \{required && <span className="text-red-600 text-lg leading-none ml-1">\*<\/span>\}<\/span>\s*<\/label>\s*<textarea\s*value=\{value \|\| ''\}\s*onChange=\{e => onChange\(e.target.value\)\}\s*required=\{required\}\s*placeholder=\{placeholder\}\s*rows=\{4\}\s*className="w-full bg-black border border-white\/10 p-3 text-white focus:border-red-600 outline-none resize-none"\s*\/>\s*<\/div>\s*\);/g,
  `const TextAreaField = ({ label, value, onChange, required = false, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
      <span>{label} {required && <span className="text-red-600 text-lg leading-none ml-1">*</span>}</span>
    </label>
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-sm resize-none"
    />
  </div>
);`
);

code = code.replace(/<label className="text-xs font-black uppercase tracking-\[0.2em\] text-neutral-500 flex items-center gap-2 shrink-0">/g, '<label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2 shrink-0">');
code = code.replace(/bg-black border border-dashed text-center group cursor-pointer transition-colors flex-grow flex flex-col justify-center min-h-\[100px\] relative \$\{file \? 'border-green-600' : 'border-white\/10 hover:border-red-600'\}/g, "bg-white border-2 border-dashed rounded-lg text-center group cursor-pointer transition-colors flex-grow flex flex-col justify-center min-h-[100px] relative ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-red-600 hover:bg-gray-50'}");
code = code.replace(/<p className="text-\[10px\] font-black uppercase tracking-widest text-white truncate max-w-full px-2">\{file.name\}<\/p>/g, '<p className="text-[10px] font-bold tracking-wider text-gray-900 truncate max-w-full px-2">{file.name}</p>');
code = code.replace(/<p className="text-\[10px\] font-black uppercase tracking-widest text-neutral-500">Upload Document<\/p>/g, '<p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Upload Document</p>');
code = code.replace(/bg-neutral-900 border border-white\/5 p-4 cursor-pointer hover:border-red-600\/30 transition-all/g, 'bg-white shadow-sm rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-red-600/30 hover:shadow-md transition-all');
code = code.replace(/<h4 className="text-sm font-bold uppercase tracking-widest text-white flex items-center justify-between">/g, '<h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 flex items-center justify-between">');
code = code.replace(/text-neutral-500 group-hover:text-white/g, 'text-gray-400 group-hover:text-red-600');
code = code.replace(/text-white group-hover:text-red-600/g, 'text-gray-900 group-hover:text-red-600');
code = code.replace(/text-xs text-neutral-400 mt-2/g, 'text-xs text-gray-600 mt-2');
code = code.replace(/className="flex items-center gap-3 p-3 bg-black border border-white\/5 cursor-pointer hover:border-red-600\/30 transition-all"/g, 'className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md shadow-sm cursor-pointer hover:border-red-600 hover:bg-red-50 transition-all"');
code = code.replace(/text-xs font-bold uppercase text-neutral-300/g, 'text-xs font-bold uppercase text-gray-700');
code = code.replace(/className="w-4 h-4 rounded-sm border-white\/20 bg-transparent text-red-600 focus:ring-red-600 focus:ring-offset-black"/g, 'className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600"');

// Form container wrappers
code = code.replace(/<div className="max-w-5xl mx-auto bg-neutral-900 border border-white\/10 p-4 sm:p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-500">/g, '<div className="max-w-5xl mx-auto bg-white rounded-2xl p-4 sm:p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-500">');
code = code.replace(/text-3xl font-black uppercase tracking-tighter text-white mb-2/g, 'text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2');
code = code.replace(/text-neutral-500 mb-8 border-b border-white\/5 pb-6/g, 'text-gray-500 mb-8 border-b border-gray-200 pb-6');
code = code.replace(/<SectionHeading title="(.*?)" \/>/g, (match, p1) => {
  return `<div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-gray-200 pb-2"><h3 className="text-xl font-bold uppercase tracking-widest text-red-600">${p1}</h3></div>`;
});

// Update label for category
code = code.replace(/<label className="text-xs font-black uppercase tracking-\[0.2em\] text-neutral-500 flex items-center gap-2 mb-4">/g, '<label className="text-[11px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2 mb-4">');

// Step 3 specific texts
code = code.replace(/bg-neutral-900 border border-white\/10 p-8 text-center mb-12/g, 'bg-white shadow-sm border border-gray-200 rounded-xl p-8 text-center mb-12');
code = code.replace(/text-xl font-bold uppercase tracking-widest text-white mb-4/g, 'text-xl font-bold uppercase tracking-widest text-gray-900 mb-4');
code = code.replace(/<div className="p-4 bg-red-600\/10 border border-red-600\/30 flex items-start gap-3 text-left">/g, '<div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-left">');
code = code.replace(/<p className="text-sm text-red-200">/g, '<p className="text-sm text-red-800">');
code = code.replace(/text-neutral-500 block mb-6/g, 'text-gray-500 block mb-6');
code = code.replace(/<label className="flex items-start gap-4 p-6 bg-black border border-white\/10 cursor-pointer hover:border-red-600\/50 transition-all">/g, '<label className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:border-red-600/50 hover:bg-white transition-all shadow-sm">');
code = code.replace(/text-sm font-bold text-white mb-1/g, 'text-sm font-bold text-gray-900 mb-1');
code = code.replace(/text-xs text-neutral-500/g, 'text-xs text-gray-500');

// Step 4 texts
code = code.replace(/<div className="text-center animate-in fade-in zoom-in-95 duration-1000 max-w-2xl mx-auto bg-neutral-900 border border-white\/10 p-12">/g, '<div className="text-center animate-in fade-in zoom-in-95 duration-1000 max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-12">');
code = code.replace(/<h2 className="text-3xl font-black uppercase text-white mb-4">/g, '<h2 className="text-3xl font-black uppercase text-gray-900 mb-4">');
code = code.replace(/bg-neutral-900 border border-white\/10 p-8 text-left mb-12 max-w-lg mx-auto/g, 'bg-gray-50 border border-gray-200 rounded-xl p-8 text-left mb-12 max-w-lg mx-auto');
code = code.replace(/text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white\/10 pb-4/g, 'text-xl font-bold uppercase tracking-widest text-gray-900 mb-6 border-b border-gray-200 pb-4');
code = code.replace(/text-neutral-500 uppercase text-xs font-black tracking-widest block mb-1/g, 'text-gray-500 uppercase text-[10px] font-bold tracking-widest block mb-1');
code = code.replace(/<span className="text-white">\{formData.companyName\}<\/span>/g, '<span className="text-gray-900 font-semibold">{formData.companyName}</span>');
code = code.replace(/<span className="text-white">\{formData.email\}<\/span>/g, '<span className="text-gray-900 font-semibold">{formData.email}</span>');
code = code.replace(/<span className="text-white">\{formData.authorizedPerson\}<\/span>/g, '<span className="text-gray-900 font-semibold">{formData.authorizedPerson}</span>');
code = code.replace(/bg-neutral-800 border border-white\/10 px-3 py-1 rounded-sm text-\[10px\] uppercase font-bold text-neutral-300/g, 'bg-white border border-gray-300 px-3 py-1 rounded-md shadow-sm text-[10px] uppercase font-bold text-gray-700');
code = code.replace(/<span className="text-2xl font-black text-white">#\{applicationId\}<\/span>/g, '<span className="text-2xl font-black text-red-600">#{applicationId}</span>');

// Remove SectionHeading
code = code.replace(/const SectionHeading = \(\{ title \}: \{ title: string \}\) => \(\s*<div className="col-span-1 md:col-span-2 mt-8 mb-4 border-b border-white\/10 pb-2">\s*<h3 className="text-xl font-bold uppercase tracking-widest text-white">\{title\}<\/h3>\s*<\/div>\s*\);\s*/, '');

fs.writeFileSync('pages/VendorRegistration.tsx', code);
console.log("Form theme targeted update complete!");
