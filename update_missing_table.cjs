const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetBlock = `<div className="space-y-5">
                           {Object.entries(categorizeMissingItems(selectedVendor.missing_items)).map(([cat, items]) => {
                              if (items.length === 0) return null;
                              return (
                                 <div key={cat} className="space-y-2">
                                    <h4 className="text-amber-800 text-[10px] font-black uppercase tracking-widest border-b border-amber-200/50 pb-1.5 mb-2">{cat}</h4>
                                    <div className="space-y-2">
                                       {items.map((item, i) => (
                                          <div key={i} className="flex items-start gap-2 text-amber-900 text-sm font-bold">
                                             <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                                             <span className="leading-snug">{item}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              );
                           })}
                        </div>`;

const newBlock = `<div className="mt-4 overflow-hidden rounded-sm border border-amber-200 shadow-sm bg-white/50">
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

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced block with table.");
} else {
    console.log("Could not find target block to replace.");
}
