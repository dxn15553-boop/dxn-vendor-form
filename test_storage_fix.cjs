const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
let supabaseUrl = '';
let supabaseKey = '';

envFile.split('\n').forEach(line => {
  if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.storage.from('vendor-documents').list('vendors');
  console.log('vendors folder:', data, error);

  if (data && data.length > 0) {
     for(let f of data) {
        if(f.name === '.emptyFolderPlaceholder') continue;
        const {data: d2} = await supabase.storage.from('vendor-documents').list('vendors/' + f.name);
        console.log('inside', f.name, d2);
     }
  }
}
check();
