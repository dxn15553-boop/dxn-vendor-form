// Default recipient if none provided by the website admin settings
const DEFAULT_HR_EMAIL = "ts_hr@dxn2u.com"; // or "dxn15553@gmail.com"

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const form = data.formData || {};
    const recipient = (data.recipientEmail || DEFAULT_HR_EMAIL).trim();
    const cc = (data.ccEmail || "").trim();

    // Prepare resume attachment if present
    const emailAttachments = [];
    if (data.resume && data.resume.base64) {
      const cleanBase64 = data.resume.base64.replace(/^data:.*?;base64,/, "");
      const blob = Utilities.newBlob(
        Utilities.base64Decode(cleanBase64),
        data.resume.mimeType || "application/pdf",
        data.resume.name || "Resume.pdf"
      );
      emailAttachments.push(blob);
    }

    // HTML Email Template for HR
    const hrHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #d32f2f; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; text-transform: uppercase;">New Job Application Received</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Position: <strong>${form.role || "General Application"}</strong></p>
        </div>

        <div style="padding: 24px;">
          <h3 style="color: #d32f2f; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 8px;">Applicant Profile</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; width: 35%; font-weight: bold; color: #555;">Full Name:</td><td style="padding: 8px 0;">${form.fullname || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${form.email}">${form.email || "N/A"}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td><td style="padding: 8px 0;"><a href="tel:${form.phone}">${form.phone || "N/A"}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Gender:</td><td style="padding: 8px 0;">${form.gender || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Qualification:</td><td style="padding: 8px 0;">${form.qualification || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Education / College:</td><td style="padding: 8px 0;">${form.education || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Total Experience:</td><td style="padding: 8px 0;">${form.experience || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Current Company:</td><td style="padding: 8px 0;">${form.currentCompany || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Current CTC:</td><td style="padding: 8px 0;">${form.currentCtc || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Expected CTC:</td><td style="padding: 8px 0;">${form.expectedCtc || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Notice Period:</td><td style="padding: 8px 0;">${form.noticePeriod || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Relocate to Siddipet:</td><td style="padding: 8px 0;">${form.willingToRelocate || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Disability:</td><td style="padding: 8px 0;">${form.disability || "No"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Current Address:</td><td style="padding: 8px 0;">${form.address || "Not specified"}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 12px; background-color: #f7f7f7; border-radius: 6px; font-size: 13px;">
            <strong>Attachment:</strong> ${emailAttachments.length > 0 ? `📎 ${data.resume.name} (Attached to this email)` : "No resume file attached"}
          </div>
        </div>
      </div>
    `;

    // Send email to HR
    const emailOptions = {
      htmlBody: hrHtmlBody,
      replyTo: form.email,
      attachments: emailAttachments
    };
    if (cc) emailOptions.cc = cc;

    GmailApp.sendEmail(
      recipient,
      `New Job Application: ${form.role || "Candidate"} - ${form.fullname || ""}`,
      "Please view this email in an HTML-compatible email client.",
      emailOptions
    );

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Application submitted successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
