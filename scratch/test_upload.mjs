import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://nmiqhmngdvyblfizkfjp.supabase.co', 'sb_publishable_bUQLrA9jZvdiHZRI1-YMGg_p3T8W0L0');

async function testUpload() {
  const fileContent = "dummy pdf content";
  const blob = new Blob([fileContent], { type: 'application/pdf' });
  const file = new File([blob], 'ISO 9000.pdf', { type: 'application/pdf' });
  
  const uploadVendorId = '1782817368824';
  
  const testNames = [
    'ISO9001_TestCompany_ISO_9000.pdf',
    '[ISO9001] TestCompany - ISO 9000.pdf',
    'ISO9001 TestCompany - ISO 9000.pdf'
  ];

  for (const name of testNames) {
    const renamedFile = new File([file], name, { type: file.type });
    const filePath = `vendors/${uploadVendorId}/${renamedFile.name}`;
    const { data, error } = await supabase.storage
      .from('vendor-documents')
      .upload(filePath, renamedFile, { upsert: true });

    console.log(`Upload Result for ${name}:`, data, error);
  }
}

testUpload();
