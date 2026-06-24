const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the Category line
content = content.replace(/<p className="col-span-2"><span className="text-neutral-600 uppercase font-black tracking-widest text-\[9px\]">Category: <\/span><span className="text-red-400 text-\[10px\]">\{vendor\.vendor_category \|\| vendor\.specialities \|\| '—'\}<\/span><\/p>\s*/g, '');

// 2. Remove the Applied date line
content = content.replace(/<p className="text-neutral-600 text-\[9px\] uppercase font-bold tracking-widest">Applied: \{vendor\.created_at \? new Date\(vendor\.created_at\)\.toLocaleString\('en-IN'\) : '—'\}<\/p>\s*/g, '');

fs.writeFileSync(file, content);
console.log('Done cleaning up vendor list items in Admin.tsx');
