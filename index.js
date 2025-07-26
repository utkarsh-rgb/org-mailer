// index.js
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Send an email using SMTP credentials from .env
 *
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Subject line
 * @param {string} [options.text] - Plain text content
 * @param {string} [options.html] - HTML content
 * @returns {Promise<Object>} - Result from nodemailer
 */
async function sendEmail({ to, subject, text = '', html = '' }) {
  if (!to || !subject) {
    throw new Error("Missing required fields: 'to' and 'subject'");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465
    requireTLS: process.env.SMTP_REQUIRE_TLS === 'true',
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
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
