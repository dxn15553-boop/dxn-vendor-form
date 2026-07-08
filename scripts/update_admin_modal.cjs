const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'pages', 'Admin.tsx');
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* Company & Contact Info \*\/\}(.|\n|\r)*?(?=\{\/\* Facility Overview \*\/\})/g;

const newContent = `{/* Company & Contact Info */}
                     <div className="bg-neutral-900 border border-white/10 p-6">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-3 mb-4 flex items-center gap-2"><Building className="w-3.5 h-3.5 text-red-500" /> Company & Contact Info</h3>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse text-sm text-neutral-300">
                              <tbody>
                                 {[
                                    { label: 'Company Legal Name', value: selectedVendor.company_name || selectedVendor.companyName },
                                    { label: 'Authorized Contact Person', value: selectedVendor.contact_person || selectedVendor.authorizedPerson },
                                    { label: 'Email Address', value: selectedVendor.email },
                                    { label: 'Mobile Number', value: selectedVendor.phone },
                                    { label: 'Escalation Contact', value: selectedVendor.escalation_contact || selectedVendor.escContact },
                                    { label: 'PAN Number', value: selectedVendor.pan_number || selectedVendor.panNumber },
                                    { label: 'GST Number', value: selectedVendor.gst_number || selectedVendor.gstNumber },
                                    { label: 'Applied On', value: selectedVendor.created_at ? new Date(selectedVendor.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }) : '—' },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                       <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-2 font-medium text-white">{value || <span className="text-neutral-600 italic">Not provided</span>}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>

                     {/* Business Details */}
                     <div className="bg-neutral-900 border border-white/10 p-6">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-3 mb-4 flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-red-500" /> Business Details</h3>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse text-sm text-neutral-300">
                              <tbody>
                                 {[
                                    { label: 'Vendor Category', value: selectedVendor.vendor_category || selectedVendor.categories?.join(', ') },
                                    { label: 'Service Capabilities', value: selectedVendor.service_capabilities || selectedVendor.serviceCapabilities?.join(', ') },
                                    { label: 'OEM Brands', value: selectedVendor.oem_brands || selectedVendor.oemBrands?.filter(Boolean).join(', ') },
                                    { label: 'Specialities', value: selectedVendor.specialities },
                                    { label: 'Technical Team Strength', value: selectedVendor.tech_team_strength || selectedVendor.techTeamStrength },
                                    { label: 'Installed Base Details', value: selectedVendor.installed_base || selectedVendor.installedBase },
                                 ].map(({ label, value }) => (
                                    <tr key={label} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                       <th className="py-3 px-2 font-black uppercase text-[10px] tracking-widest text-neutral-500 w-1/3 align-top">{label}</th>
                                       <td className="py-3 px-2 font-medium text-white">
                                          {label === 'Vendor Category' || label === 'Service Capabilities' ? (
                                             <div className="flex flex-wrap gap-1.5">
                                                {(value || '').split(',').filter(Boolean).map((item, i) => (
                                                   <span key={i} className={\`\${label === 'Vendor Category' ? 'bg-red-600/10 border-red-600/30 text-red-400' : 'bg-white/5 border-white/10 text-neutral-300'} border px-2 py-0.5 text-[9px] font-black uppercase\`}>{item.trim()}</span>
                                                ))}
                                             </div>
                                          ) : (
                                             value || <span className="text-neutral-600 italic">Not provided</span>
                                          )}
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  `;

if(regex.test(content)) {
    content = content.replace(regex, newContent);
    fs.writeFileSync(file, content);
    console.log("Success! Admin.tsx modal updated with tabular layout");
} else {
    console.log("Failed to match regex. Regex did not find the target text.");
}
