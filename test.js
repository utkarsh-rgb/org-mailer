
const sendEmail = require('./index');
require('dotenv').config();

(async () => {
  try {
    await sendEmail({
      to: 'recipient@example.com', 
      subject: 'Test Email from universal-mailer 📩',
      text: 'This is a plain text test email.',
      html: '<h1>Hello from universal-mailer!</h1><p>This is a test email sent using <strong>nodemailer</strong> via Gmail SMTP.</p>',
    });
  } catch (err) {
    console.error("❌ Failed to send test email:", err);
  }
})();
