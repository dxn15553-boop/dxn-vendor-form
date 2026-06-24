require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.storage.from('vendor-documents').list();
  console.log("Root files/folders:", data, error);

  const { data: d2, error: e2 } = await supabase.storage.from('vendor-documents').list('vendors');
  console.log("Inside vendors/:", d2, e2);
}

test();
