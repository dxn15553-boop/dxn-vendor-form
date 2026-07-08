const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change the main container to max-w-5xl and remove space-y-10 if we are going to group them.
// Let's actually keep space-y-6 for the gap between Email preview and the main block.
content = content.replace(
    /<div className="max-w-6xl mx-auto px-8 py-10 space-y-10">/,
    '<div className="max-w-5xl mx-auto px-8 py-10 space-y-6">'
);

// We want to wrap from Application Status to Uploaded Documents in ONE white container.
// We will replace the individual styling.

// Submission Status block:
content = content.replace(
    /<div className="bg-white shadow-sm border border-neutral-200 p-6 mb-8">/g,
    '<div className="bg-white p-6">' // We'll add the main wrapper later or right above this.
);

// Grid wrapper:
content = content.replace(
    /<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">/,
    ''
);
// We need to remove its closing div. It's closed right after Business Details.
// The structure was: </details> \n </div> \n {/* Facility Overview */}
content = content.replace(
    /<\/details>\s*<\/div>\s*\{\/\* Facility Overview \*\/\}/,
    '</details>\n\n                  {/* Facility Overview */}'
);

// Each details block styling
content = content.replace(
    /<details open className="bg-white shadow-sm border border-neutral-200 group">/g,
    '<details open className="group bg-white">'
);
content = content.replace(
    /<details open className="bg-white shadow-sm border border-neutral-200 group mb-8">/g,
    '<details open className="group bg-white">'
);

// Missing Items block
// currently: <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-6 mb-8 rounded-r-sm shadow-sm">
content = content.replace(
    /<div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-6 mb-8 rounded-r-sm shadow-sm">/g,
    '<div className="bg-amber-50 border-l-4 border-l-amber-500 p-6">'
);
content = content.replace(
    /<div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 p-6 mb-8 rounded-r-sm shadow-sm">/g,
    '<div className="bg-green-50 border-l-4 border-l-green-500 p-6">'
);

// Now wrap from Submission Status to the end of Uploaded Documents
// Search for: {/* Submission Status */}
// Replace with: {/* Main Unified Table Container */}\n<div className="bg-white shadow-xl rounded-sm border border-neutral-200 overflow-hidden divide-y divide-neutral-200">\n{/* Submission Status */}

content = content.replace(
    /\{\/\* Submission Status \*\/\}/,
    '{/* Main Unified Table Container */}\n                  <div className="bg-white shadow-xl rounded-sm border border-neutral-200 overflow-hidden divide-y divide-neutral-200">\n                  {/* Submission Status */}'
);

// We need to close this new main container at the very end of Uploaded Documents.
// It ends at:
//                   </div>
//                   </details>
//                </div> (this closes max-w-5xl)
content = content.replace(
    /<\/details>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
    `</details>\n                  </div>\n               </div>\n            </div>\n          </div>\n      </div>`
);


fs.writeFileSync(file, content);
console.log("Successfully transformed modal into a unified full table layout.");
