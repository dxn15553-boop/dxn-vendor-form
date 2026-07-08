require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  console.log("Checking storage...");
  const { data, error } = await supabase.storage.from('vendor-documents').list();
  console.log("Root files/folders:", data, error);

  if (data && data.length > 0) {
    for (const folder of data) {
      if (folder.name === '.emptyFolderPlaceholder') continue;
      
      const { data: d2, error: e2 } = await supabase.storage.from('vendor-documents').list(`vendors/${folder.name}`);
      console.log(`Inside vendors/${folder.name}:`, d2, e2);
      
      const { data: d3, error: e3 } = await supabase.storage.from('vendor-documents').list(folder.name);
      console.log(`Inside ${folder.name}:`, d3, e3);
    }
  }

  // Check the `vendors` folder explicitly
  const { data: d4, error: e4 } = await supabase.storage.from('vendor-documents').list('vendors');
  console.log("Inside vendors/:", d4, e4);
}

test();
