const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const endBlockStr = `                  </details>
                  </div>
               </div>
            </div>
          </div>
      )}
      </>
   );
};

export default Admin;`;

const newEndBlockStr = `                  </details>
               </div>
            </div>
          </div>
      )}
      </>
   );
};

export default Admin;`;

content = content.replace(endBlockStr, newEndBlockStr);
fs.writeFileSync(file, content);
console.log("Removed extra </div> at the end of the file.");
