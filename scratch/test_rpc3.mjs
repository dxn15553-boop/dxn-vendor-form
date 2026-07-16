import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://nmiqhmngdvyblfizkfjp.supabase.co', 'sb_publishable_bUQLrA9jZvdiHZRI1-YMGg_p3T8W0L0');

async function check() {
  // Try direct update
  const { data, error } = await supabase
    .from('vendors')
    .update({ company_name: 'Nilkamal Limited' })
    .eq('id', '1782817368824')
    .select('id, company_name');
  
  console.log('Direct update result:', data, 'Error:', error?.message);

  // Check columns available
  const { data: row } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', '1782817368824')
    .single();
  console.log('All columns:', row ? Object.keys(row) : 'null');
}
check();
