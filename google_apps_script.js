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
        fileLinks.push(fileObj.name + ": " + savedFile.getUrl());
      });
    }
    
    // 2. Append data to Google Sheet
    // If sheet is empty, add headers first
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Vendor Category",
        "Company Name", 
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
      sheet.getRange(1, 1, 1, 13).setFontWeight("bold");
    }
    
    const docsString = fileLinks.length > 0 ? fileLinks.join("\n") : "No documents attached.";
    
    const decls = data.declarations || {};
    const declString = `Verified: ${decls.verifiedInfo ? 'Yes' : 'No'}, Docs Uploaded: ${decls.documentsUploaded ? 'Yes' : 'No'}, Auth Signatory: ${decls.authSignatory ? 'Yes' : 'No'}`;
    const declStringEmail = `\n        - Verified: ${decls.verifiedInfo ? 'Yes' : 'No'}\n        - Docs Uploaded: ${decls.documentsUploaded ? 'Yes' : 'No'}\n        - Auth Signatory: ${decls.authSignatory ? 'Yes' : 'No'}`;
    
    sheet.appendRow([
      new Date(),
      data.formData.category || "",
      data.formData.companyName || "",
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
    const emailBody = `
      New Vendor Registration Received!
      
      Vendor Category: ${data.formData.category || "N/A"}
      Company Name: ${data.formData.companyName || "N/A"}
      Contact Person: ${data.formData.authorizedPerson || "N/A"}
      Email: ${data.formData.email || "N/A"}
      Phone: ${data.formData.phone || "N/A"}
      Escalation Contact: ${data.formData.escContact || "N/A"}
      
      Tech Team Strength: ${data.formData.techTeamStrength || "N/A"}
      Installed Base: ${data.formData.installedBase || "N/A"}
      Specialities: ${data.formData.specialities || "N/A"}
      Facility Details: ${data.formData.description || "N/A"}
      
      Declarations Confirmed: ${declStringEmail}
      
      Individual File Links:
      ${docsString}
    `;
    
    GmailApp.sendEmail(
      NOTIFICATION_EMAIL,
      "New Vendor Registration: " + data.formData.companyName,
      emailBody
    );
    
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
