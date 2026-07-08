const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add ChevronDown to imports
if (!content.includes('ChevronDown')) {
    content = content.replace('ChevronRight, Tag', 'ChevronRight, ChevronDown, Tag');
}

// 2. Replace the tabular layout with the details/summary dropdown layout
const targetBlock = `<div className="mt-4 overflow-hidden rounded-sm border border-amber-200 shadow-sm bg-white/50">
                           <table className="w-full text-left border-collapse text-sm">
                              <tbody>
                                 {Object.entries(categorizeMissingItems(selectedVendor.missing_items)).map(([cat, items]) => {
                                    if (items.length === 0) return null;
                                    return (
                                       <React.Fragment key={cat}>
                                          <tr className="bg-amber-100/80 border-b border-amber-200">
                                             <th className="py-2.5 px-4 font-black uppercase text-[10px] tracking-widest text-amber-900">
                                                {cat}
                                             </th>
                                          </tr>
                                          {items.map((item, i) => (
                                             <tr key={i} className="border-b border-amber-100 last:border-0 hover:bg-amber-50 transition-colors">
                                                <td className="py-3 px-4 font-bold text-amber-900 flex items-start gap-3">
                                                   <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                                   <span>{item}</span>
                                                </td>
                                             </tr>
                                          ))}
                                       </React.Fragment>
                                    );
                                 })}
                              </tbody>
                           </table>
                        </div>`;

const newBlock = `<div className="mt-4 border border-amber-200 shadow-sm rounded-sm divide-y divide-amber-200">
                           {Object.entries(categorizeMissingItems(selectedVendor.missing_items)).map(([cat, items]) => {
                              if (items.length === 0) return null;
                              return (
                                 <details key={cat} open className="group bg-white/50">
                                    <summary className="bg-amber-100/80 py-3 px-4 font-black uppercase text-[10px] tracking-widest text-amber-900 cursor-pointer list-none flex justify-between items-center transition-colors hover:bg-amber-100 [&::-webkit-details-marker]:hidden">
                                       {cat}
                                       <ChevronDown className="w-4 h-4 text-amber-700 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="p-0 border-t border-amber-200">
                                       <table className="w-full text-left border-collapse text-sm">
                                          <tbody>
                                             {items.map((item, i) => (
                                                <tr key={i} className="border-b border-amber-100 last:border-0 hover:bg-amber-50 transition-colors">
                                                   <td className="py-3 px-4 font-bold text-amber-900 flex items-start gap-3">
                                                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                                      <span>{item}</span>
                                                   </td>
                                                </tr>
                                             ))}
                                          </tbody>
                                       </table>
                                    </div>
                                 </details>
                              );
                           })}
                        </div>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
    fs.writeFileSync(file, content);
    console.log("Successfully updated to accordion layout.");
} else {
    console.log("Could not find target block to replace.");
}
