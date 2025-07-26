const nodemailer = require('nodemailer');
const { getSMTPSettings } = require('./automapping');

// Load environment variables (ensure it's only loaded once in your main app)
require('dotenv').config();

async function sendMail({ to, subject, text, html, fromName }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  // Basic validations
  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    throw new Error('Missing SMTP_EMAIL or SMTP_PASSWORD in .env');
  }

  if (!to || !subject || (!text && !html)) {
    throw new Error('Missing required email fields: to, subject, and text or html');
  }

  const config = await getSMTPSettings(SMTP_EMAIL);

  if (config.error) throw new Error(`SMTP Config Error: ${config.error}`);

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: fromName ? `"${fromName}" <${SMTP_EMAIL}>` : SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`❌ Email sending failed: ${err.message}`);
    throw err;
  }
}

module.exports = sendMail 
