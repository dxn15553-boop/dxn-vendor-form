import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://nmiqhmngdvyblfizkfjp.supabase.co', 'sb_publishable_bUQLrA9jZvdiHZRI1-YMGg_p3T8W0L0');

async function checkRpc() {
  // Check what update_vendor_application does by trying it
  const { data, error } = await supabase.rpc('update_vendor_application', {
    p_id: 999999999,
    p_vendor_data: { company_name: 'test', last_activity_at: new Date().toISOString() }
  });
  console.log('RPC result:', data, 'Error:', error?.message);
}
checkRpc();
