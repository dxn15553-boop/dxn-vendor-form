// --- CONFIGURATION ---
const DRIVE_FOLDER_ID = "12gnSdi9yZMIThQXii1qAQREN_hXPkDi7"; // Replace with your Drive Folder ID


const NOTIFICATION_EMAIL = "layasriireni@gmail.com"; 
// ---------------------

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const mainFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    let fileLinks = [];
    let vendorFolderUrl = "";
    
    // 1. Process and save uploaded files to Google Drive
    if (data.files && data.files.length > 0) {
      // Create a subfolder for this specific vendor
      const vendorFolder = mainFolder.createFolder(data.formData.companyName + " - " + new Date().getTime());
      vendorFolderUrl = vendorFolder.getUrl(); // Get the link to the folder itself!
      
      data.files.forEach(function(fileObj) {
        // Decode base64 and create the file
        const blob = Utilities.newBlob(
          Utilities.base64Decode(fileObj.base64), 
          fileObj.mimeType, 
          fileObj.name
        );
        const savedFile = vendorFolder.createFile(blob);
        fileLinks.push(`<li><a href="${savedFile.getUrl()}">${fileObj.name}</a></li>`);
      });
    }
    
    // 2. Append data to Google Sheet
    // If sheet is empty, add headers first
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Vendor Category",
        "Service Capabilities",
        "OEM Brands",
        "Company Name", 
        "PAN Number",
        "GST Number",
        "Contact Person", 
        "Email", 
        "Phone", 
        "Escalation Contact",
        "Tech Team Strength",
        "Installed Base",
        "Specialities", 
        "Facility Description", 
        "Declarations Confirmed",
        "Vendor Drive Folder" // Changed this to just be the folder link
      ]);
      sheet.getRange(1, 1, 1, 17).setFontWeight("bold");
    }
    
    const docsString = fileLinks.length > 0 ? `<ul>${fileLinks.join("")}</ul>` : "<p>No documents attached.</p>";
    
    const decls = data.declarations || {};
    const declString = `Verified: ${decls.verifiedInfo ? 'Yes' : 'No'}, Docs Uploaded: ${decls.documentsUploaded ? 'Yes' : 'No'}, Auth Signatory: ${decls.authSignatory ? 'Yes' : 'No'}`;
    
    const formatList = (str) => {
      if (!str || str === "N/A") return "N/A";
      const items = str.split(",").map(s => s.trim()).filter(Boolean);
      if (items.length <= 1) return str;
      return `<ul style="margin: 0; padding-left: 16px;">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    };
    
    sheet.appendRow([
      new Date(),
      data.formData.category || "",
      data.formData.serviceCapabilities || "",
      data.formData.oemBrands || "",
      data.formData.companyName || "",
      data.formData.panNumber || "",
      data.formData.gstNumber || "",
      data.formData.authorizedPerson || "",
      data.formData.email || "",
      data.formData.phone || "",
      data.formData.escContact || "",
      data.formData.techTeamStrength || "",
      data.formData.installedBase || "",
      data.formData.specialities || "",
      data.formData.description || "",
      declString,
      vendorFolderUrl || "No documents attached" // Paste the single folder link!
    ]);
    
    // 3. Send Email Notification
    const emailHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">New Vendor Registration Received</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.companyName || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>PAN Number:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.panNumber || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>GST Number:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.gstNumber || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contact Person:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.authorizedPerson || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.formData.email}" style="color: #d32f2f;">${data.formData.email || "N/A"}</a></td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.phone || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Escalation Contact:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.escContact || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Vendor Category:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.category)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service Capabilities:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.serviceCapabilities)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>OEM Brands:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.oemBrands)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Specialities:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.specialities)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tech Team Strength:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.techTeamStrength || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Installed Base:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.installedBase || "N/A"}</td></tr>
        </table>
        
        <h3 style="color: #444;">Facility Details</h3>
        <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #d32f2f; font-size: 14px;">${data.formData.description || "N/A"}</p>
        
        <h3 style="color: #444;">Declarations Confirmed</h3>
        <ul style="font-size: 14px;">
          <li>Verified Info: ${decls.verifiedInfo ? 'Yes' : 'No'}</li>
          <li>Docs Uploaded: ${decls.documentsUploaded ? 'Yes' : 'No'}</li>
          <li>Auth Signatory: ${decls.authSignatory ? 'Yes' : 'No'}</li>
        </ul>
        
        ${data.missingItems ? `
        <h3 style="color: #d32f2f;">⚠️ Observations (Missing Information)</h3>
        <ul style="font-size: 14px; color: #d32f2f;">
          ${data.missingItems.split(', ').map(item => `<li>${item}</li>`).join('')}
        </ul>
        ` : ''}
        
        <h3 style="color: #444;">✅ Submitted Documents</h3>
        <div style="font-size: 14px; margin-bottom: 15px;">
          ${vendorFolderUrl ? `<p style="font-size: 16px;"><strong><a href="${vendorFolderUrl}" style="color: #d32f2f; text-decoration: none;">📁 View All Vendor Documents in Google Drive</a></strong></p>` : `<p>No documents attached.</p>`}
        </div>
      </div>
    `;
    
    GmailApp.sendEmail(
      NOTIFICATION_EMAIL,
      "New Vendor Registration: " + data.formData.companyName,
      "Please view this email in an HTML-compatible client.",
      { htmlBody: emailHtmlBody }
    );
    
    if (data.formData.email) {
      const vendorHtmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #d32f2f;">DXN Vendor Registration Received</h2>
          <p>Dear ${data.formData.authorizedPerson || "Vendor"},</p>
          <p>Thank you for submitting your Vendor Registration application to DXN Global. Below is a summary of the details you provided:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Company Name:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.companyName || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>PAN Number:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.panNumber || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>GST Number:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.gstNumber || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Contact Person:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.authorizedPerson || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.formData.email}" style="color: #d32f2f;">${data.formData.email || "N/A"}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.phone || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Escalation Contact:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.escContact || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Vendor Category:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.category)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service Capabilities:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.serviceCapabilities)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>OEM Brands:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.oemBrands)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Specialities:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatList(data.formData.specialities)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tech Team Strength:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.techTeamStrength || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Installed Base:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.formData.installedBase || "N/A"}</td></tr>
          </table>
          
          <h3 style="color: #444;">Facility Details</h3>
          <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #d32f2f; font-size: 14px;">${data.formData.description || "N/A"}</p>
          
          <h3 style="color: #444;">Declarations Confirmed</h3>
          <ul style="font-size: 14px;">
            <li>Verified Info: ${decls.verifiedInfo ? 'Yes' : 'No'}</li>
            <li>Docs Uploaded: ${decls.documentsUploaded ? 'Yes' : 'No'}</li>
            <li>Auth Signatory: ${decls.authSignatory ? 'Yes' : 'No'}</li>
          </ul>
          
          ${data.missingItems ? `
          <h3 style="color: #d32f2f;">⚠️ Observations (Missing Information)</h3>
          <ul style="font-size: 14px; color: #d32f2f;">
            ${data.missingItems.split(', ').map(item => `<li>${item}</li>`).join('')}
          </ul>
          ` : ''}
          
          <h3 style="color: #444;">✅ Submitted Documents</h3>
          <div style="font-size: 14px; margin-bottom: 15px;">
            ${vendorFolderUrl ? `<p style="font-size: 16px;"><strong><a href="${vendorFolderUrl}" style="color: #d32f2f; text-decoration: none;">📁 View All Vendor Documents in Google Drive</a></strong></p>` : `<p>No documents attached.</p>`}
          </div>
          
          <p>We will review your application and get back to you soon.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">Best regards,<br><strong>DXN Global Supply Chain Team</strong></p>
        </div>
      `;
      try {
        GmailApp.sendEmail(
          data.formData.email,
          "DXN Vendor Registration - Application Received",
          "Please view this email in an HTML-compatible client.",
          { htmlBody: vendorHtmlBody }
        );
      } catch (e) {
        // Ignore if vendor email fails
      }
    }
    
    // 4. Return success to the React App
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}
function forceAuthorize() {
  GmailApp.sendEmail("test@example.com", "test", "test");
}
