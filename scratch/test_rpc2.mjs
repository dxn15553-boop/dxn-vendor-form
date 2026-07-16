import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://nmiqhmngdvyblfizkfjp.supabase.co', 'sb_publishable_bUQLrA9jZvdiHZRI1-YMGg_p3T8W0L0');

async function check() {
  // 1. Fetch the real vendor
  const { data: vendor, error: fetchErr } = await supabase
    .from('vendors')
    .select('id, company_name, last_activity_at, created_at')
    .eq('id', '1782817368824')
    .single();
  console.log('Before update:', vendor, fetchErr?.message);

  // 2. Try update via RPC
  const { data, error } = await supabase.rpc('update_vendor_application', {
    p_id: '1782817368824',
    p_vendor_data: { 
      company_name: vendor?.company_name,
      last_activity_at: new Date().toISOString()
    }
  });
  console.log('RPC result:', data, 'Error:', error?.message);

  // 3. Fetch again to see if last_activity_at was set
  const { data: after } = await supabase
    .from('vendors')
    .select('id, company_name, last_activity_at')
    .eq('id', '1782817368824')
    .single();
  console.log('After update:', after);
}
check();
