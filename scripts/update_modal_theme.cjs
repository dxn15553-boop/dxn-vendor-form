const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

// Find the modal body
const modalBodyStart = content.indexOf('{/* Modal Body */}');
const modalBodyEnd = content.indexOf('{/* Modal Footer */}'); // Wait, let's see if there is a Modal Footer or similar.

if (modalBodyStart !== -1) {
   let before = content.substring(0, modalBodyStart);
   let modal = content.substring(modalBodyStart);
   
   // Replace dark theme classes with light theme classes inside the modal
   // Backgrounds
   modal = modal.replace(/bg-neutral-900/g, 'bg-white shadow-sm');
   modal = modal.replace(/bg-neutral-950/g, 'bg-neutral-50');
   modal = modal.replace(/bg-black/g, 'bg-white');
   
   // Text colors
   modal = modal.replace(/text-white/g, 'text-neutral-900');
   modal = modal.replace(/text-neutral-300/g, 'text-neutral-700');
   modal = modal.replace(/text-neutral-500/g, 'text-neutral-500'); // keep or change
   modal = modal.replace(/text-neutral-600/g, 'text-neutral-500'); // keep or change

   // Borders
   modal = modal.replace(/border-white\/10/g, 'border-neutral-200');
   modal = modal.replace(/border-white\/5/g, 'border-neutral-100');
   modal = modal.replace(/border-white\/20/g, 'border-neutral-300');

   // Hovers
   modal = modal.replace(/hover:bg-white\/5/g, 'hover:bg-neutral-50');
   modal = modal.replace(/hover:border-white\/10/g, 'hover:border-neutral-300');

   // Specific tags for vendor category/services
   modal = modal.replace(/'bg-white\/5 border-white\/10 text-neutral-300'/g, "'bg-neutral-100 border-neutral-200 text-neutral-700'");

   content = before + modal;
   fs.writeFileSync(file, content);
   console.log('Successfully updated modal theme to light mode.');
} else {
   console.log('Could not find Modal Body');
}
