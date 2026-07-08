const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const categoriesLogic = `const VENDOR_CATEGORIES: Record<string, string[]> = {
  "Nature of Business": [
    "OEM / Manufacturer",
    "Authorized Distributor",
    "Authorized Dealer",
    "Channel Partner",
    "Service Provider",
    "Contractor",
    "Consultant",
    "Trader / Reseller",
    "Importer",
    "Other"
  ],
  "Packaging Machines & Automation": [
    "Tube Filling Machine",
    "Liquid Filling Machine",
    "Carbonated Filling Machine",
    "Capping Machine",
    "Labeling Machine",
    "Shrink Sleeve Machine",
    "Case Erector",
    "Carton Sealer",
    "Band Sealer",
    "Check Weigher",
    "Online Weighing System",
    "Conveyor System"
  ],
  "Process & Production Equipment": [
    "Storage Tank",
    "Homogenizer",
    "Liquid Processing Equipment",
    "Material Transfer System",
    "Mixing Tank",
    "Powder Handling Equipment"
  ],
  "Utility Equipment": [
    "Air Compressor",
    "Chiller",
    "Cooling Tower",
    "Boiler",
    "RO Plant",
    "Generator",
    "Pumps",
    "Motors",
    "Valves",
    "Piping & Fittings",
    "Heat Exchanger"
  ],
  "Electrical, Automation & Instrumentation": [
    "Load Cell",
    "Weighing Scale",
    "Transformer",
    "Panel / Switchgear",
    "Cables & Wires",
    "PLC / SCADA System",
    "VFD",
    "Sensors / Transmitters",
    "UPS / Battery",
    "Lighting System"
  ],
  "Mechanical Fabrication & Engineering Services": [
    "Fabrication (SS/MS)",
    "Machining Parts",
    "Structural Steel Work",
    "Sheet Metal Work",
    "Die / Mold Making",
    "Engineering Design (CAD/CAM)"
  ],
  "MRO & Industrial Consumables": [
    "Bearings",
    "Fasteners",
    "Pneumatics",
    "Hydraulics",
    "Belts",
    "Filters",
    "Lubricants",
    "Gaskets / Seals",
    "Tools & Tackles",
    "Industrial Consumables",
    "Packaging Material (Primary/Secondary)",
    "Chemicals / Solvents"
  ],
  "Laboratory & Quality Equipment": [
    "Lab Equipment",
    "Testing Instruments",
    "Calibration Services",
    "Glassware",
    "Lab Consumables"
  ],
  "Civil & Infrastructure": [
    "Civil Construction",
    "Painting",
    "Flooring",
    "Waterproofing",
    "Interior Works"
  ],
  "HVAC & Clean Room": [
    "HVAC System",
    "Clean Room Equipment",
    "AHU",
    "Ducting",
    "Clean Room Consumables"
  ],
  "Safety & Fire Protection": [
    "PPE",
    "Fire Hydrant System",
    "Fire Extinguisher",
    "Safety Equipment",
    "CCTV / Access Control"
  ],
  "Facility Management Services": [
    "Housekeeping",
    "Security Services",
    "Pest Control",
    "Scrap Dealer",
    "Canteen / Catering",
    "Transport / Cab Services"
  ],
  "Logistics & Transportation": [
    "Freight Forwarder",
    "Custom House Agent",
    "Transporter",
    "Courier Services",
    "Warehousing"
  ],
  "Professional Services": [
    "IT Services",
    "Manpower Supply",
    "Legal / Statutory Consulting",
    "Event Management",
    "Marketing / Advertising",
    "Travel Agency"
  ]
};

const renderCategorizedVendorCategory = (categoryString: string) => {
   if (!categoryString) return <span className="text-neutral-500 italic">Not provided</span>;
   const selectedItems = categoryString.split(',').map(item => item.trim()).filter(Boolean);
   if (selectedItems.length === 0) return <span className="text-neutral-500 italic">Not provided</span>;

   // Group items by category
   const grouped: Record<string, string[]> = {};
   const uncategorized: string[] = [];

   selectedItems.forEach(item => {
      let found = false;
      for (const [parentCategory, options] of Object.entries(VENDOR_CATEGORIES)) {
         if (options.includes(item)) {
            if (!grouped[parentCategory]) grouped[parentCategory] = [];
            grouped[parentCategory].push(item);
            found = true;
            break;
         }
      }
      if (!found) uncategorized.push(item);
   });

   return (
      <div className="flex flex-col gap-4">
         {Object.entries(grouped).map(([parentCat, items]) => (
            <div key={parentCat} className="space-y-1">
               <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">{parentCat}</div>
               <div className="flex flex-wrap gap-1.5">
                  {items.map((item, i) => (
                     <span key={i} className="bg-red-600/10 border border-red-600/30 text-red-600 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item}</span>
                  ))}
               </div>
            </div>
         ))}
         {uncategorized.length > 0 && (
            <div className="space-y-1">
               <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">Other Categories</div>
               <div className="flex flex-wrap gap-1.5">
                  {uncategorized.map((item, i) => (
                     <span key={i} className="bg-red-600/10 border border-red-600/30 text-red-600 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item}</span>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};`;

// Inject the categories logic right below the categorizeDocuments function
content = content.replace(
    /const Admin: React\.FC = \(\) => {/,
    categoriesLogic + '\\n\\nconst Admin: React.FC = () => {'
);


// Rewrite the rendering of Business Details to handle Vendor Category specially
const searchTarget = `{ label: 'Vendor Category', value: selectedVendor.vendor_category || selectedVendor.categories?.join(', ') },
                                    { label: 'Service Capabilities', value: selectedVendor.service_capabilities || selectedVendor.serviceCapabilities?.join(', ') },
                                    { label: 'OEM Brands', value: selectedVendor.oem_brands || selectedVendor.oemBrands?.filter(Boolean).join(', ') },
                                    { label: 'Specialities', value: selectedVendor.specialities },
                                    { label: 'Technical Team Strength', value: selectedVendor.tech_team_strength || selectedVendor.techTeamStrength },
                                    { label: 'Installed Base Details', value: selectedVendor.installed_base || selectedVendor.installedBase },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                                       <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-2 font-medium text-neutral-900">
                                          {label === 'Vendor Category' || label === 'Service Capabilities' ? (
                                             <div className="flex flex-wrap gap-1.5">
                                                {(value || '').split(',').filter(Boolean).map((item, i) => (
                                                   <span key={i} className={\`\${label === 'Vendor Category' ? 'bg-red-600/10 border-red-600/30 text-red-400' : 'bg-white/5 border-neutral-200 text-neutral-700'} border px-2 py-0.5 text-[9px] font-black uppercase\`}>{item.trim()}</span>
                                                ))}
                                             </div>
                                          ) : (
                                             value || <span className="text-neutral-500 italic">Not provided</span>
                                          )}
                                       </td>
                                    </tr>
                                 ))}`;

const replacement = `{/* Vendor Category is handled separately for advanced grouping */}
                                 <tr className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                                    <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">Vendor Category</th>
                                    <td className="py-3 px-2 font-medium text-neutral-900">
                                       {renderCategorizedVendorCategory(selectedVendor.vendor_category || selectedVendor.categories?.join(', ') || '')}
                                    </td>
                                 </tr>
                                 {/* Other Business Details */}
                                 {[
                                    { label: 'Service Capabilities', value: selectedVendor.service_capabilities || selectedVendor.serviceCapabilities?.join(', ') },
                                    { label: 'OEM Brands', value: selectedVendor.oem_brands || selectedVendor.oemBrands?.filter(Boolean).join(', ') },
                                    { label: 'Specialities', value: selectedVendor.specialities },
                                    { label: 'Technical Team Strength', value: selectedVendor.tech_team_strength || selectedVendor.techTeamStrength },
                                    { label: 'Installed Base Details', value: selectedVendor.installed_base || selectedVendor.installedBase },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                                       <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-2 font-medium text-neutral-900">
                                          {label === 'Service Capabilities' ? (
                                             <div className="flex flex-wrap gap-1.5">
                                                {(value || '').split(',').filter(Boolean).map((item, i) => (
                                                   <span key={i} className="bg-white/5 border border-neutral-200 text-neutral-700 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm">{item.trim()}</span>
                                                ))}
                                             </div>
                                          ) : (
                                             value || <span className="text-neutral-500 italic">Not provided</span>
                                          )}
                                       </td>
                                    </tr>
                                 ))}`;

if (content.includes("label === 'Vendor Category'")) {
    // Basic indexOf to replace
    const startIdx = content.indexOf("{ label: 'Vendor Category'");
    const endIdxStr = "                                 ))}";
    const endIdx = content.indexOf(endIdxStr, startIdx) + endIdxStr.length;
    if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
    } else {
        console.error("Could not find the map block to replace.");
    }
} else {
    console.error("String 'Vendor Category' block not found.");
}

fs.writeFileSync(file, content);
console.log("Successfully categorized vendor categories.");
