const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfPwcfwqcJl1RFwRb8Lsf1Djn6k-JyzRFA4g7kN8x2NO3mCn1aoyp-MR0-3E57lU5X/exec';
const payload = {
  formData: {
    category: 'OEM / Manufacturer',
    serviceCapabilities: 'Manufacturer Only',
    oemBrands: 'Brand X',
    companyName: 'Test Company',
    email: 'test@example.com',
    phone: '1234567890',
    escContact: '1234567890',
    techTeamStrength: '10',
    installedBase: 'N/A',
    specialities: 'Testing',
    description: 'Test Description'
  },
  files: [],
  declarations: { verifiedInfo: true, documentsUploaded: true, authSignatory: true },
  submissionStatus: 'Complete',
  missingItems: ''
};
fetch(GOOGLE_SCRIPT_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify(payload)
})
.then(res => res.text())
.then(text => console.log('Response:', text))
.catch(err => console.error('Error:', err));
