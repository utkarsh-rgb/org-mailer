require('dotenv').config();
const nodemailer = require('nodemailer');

/**
 * Sends an email using SMTP credentials from environment variables.
 * 
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Subject of the email
 * @param {string} [options.text] - Plain text version
 * @param {string} [options.html] - HTML content
 * @returns {Promise<Object>} - The result of the sendMail operation
 */
async function sendEmail({ to, subject, text = '', html = '' }) {
  if (!to || !subject) {
    throw new Error("Missing required fields: 'to' and 'subject'");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
}

module.exports = sendEmail;
