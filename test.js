
const sendEmail = require('./index');
require('dotenv').config();

(async () => {
  try {
    await sendEmail({
      to: '210303105486@paruluniversity.ac.in', 
      subject: 'Test Email from org-mailer 📩',
      text: 'This is a plain text test email.',
      html: '<h1>Hello from org-mailer!</h1><p>This is a test email sent using <strong>nodemailer</strong> via Gmail SMTP.</p>',
    });
  } catch (err) {
    console.error("❌ Failed to send test email:", err);
  }
})();
