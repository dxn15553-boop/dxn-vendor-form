const fs = require('fs');
const files = [
  'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx',
  'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/VendorRegistration.tsx'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/z-50/g, 'z-[120]');
  
  if (file.includes('Admin.tsx')) {
    content = content.replace(
      '<div className="min-h-screen bg-black flex items-center justify-center p-6">',
      '<div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">'
    );
  }
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
