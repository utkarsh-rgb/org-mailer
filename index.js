const nodemailer = require('nodemailer');
const {getSMTPSettings} = require('./automapping');

async function sendMail({ to, subject, text, html }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const config = await getSMTPSettings(SMTP_EMAIL);

  if (config.error) throw new Error(config.error);

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
    from: SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
