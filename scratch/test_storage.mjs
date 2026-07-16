import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://nmiqhmngdvyblfizkfjp.supabase.co', 'sb_publishable_bUQLrA9jZvdiHZRI1-YMGg_p3T8W0L0');

async function test() {
  const { data, error } = await supabase.storage.from('vendor-documents').list('vendors/1782817368824');
  console.log('Error:', error);
  console.log('Data:', data);
}
test();
