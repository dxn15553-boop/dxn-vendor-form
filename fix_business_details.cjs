const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// The faulty string has `{[\\n                                    {/* Vendor Category` and closes improperly
// Let's just fix it by replacing the whole `<tbody> ... </tbody>` of the Business Details table.

const oldBlockStart = `<h3 className="text-neutral-900 font-black uppercase tracking-widest text-xs flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-red-500" /> Business Details</h3>`;
const blockStartIndex = content.indexOf(oldBlockStart);

const tBodyStartStr = '<tbody>';
const tBodyStart = content.indexOf(tBodyStartStr, blockStartIndex);
const tBodyEndStr = '</tbody>';
const tBodyEnd = content.indexOf(tBodyEndStr, tBodyStart) + tBodyEndStr.length;

const correctTBody = \`<tbody>
                                 {/* Vendor Category is handled separately for advanced grouping */}
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
                                 ))}
                              </tbody>\`;

if (tBodyStart !== -1 && tBodyEnd !== -1) {
    content = content.substring(0, tBodyStart) + correctTBody + content.substring(tBodyEnd);
    fs.writeFileSync(file, content);
    console.log("Successfully fixed JSX syntax error.");
} else {
    console.error("Could not find the tbody block to fix.");
}
