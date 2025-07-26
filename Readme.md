# universal-mailer

![npm](https://img.shields.io/npm/v/universal-mailer)
![license](https://img.shields.io/npm/l/universal-mailer)
![issues](https://img.shields.io/github/issues/utkarsh-rgb/universal-mailer)


Send emails effortlessly using Node.js and SMTP with environment configuration.  
Supports Gmail by default, with easy customization for other providers like Office365 and Zoho.

> ✅ Built with [nodemailer](https://nodemailer.com)  
> 🔒 No SMTP credentials hardcoded — everything from `.env`

---

## ✨ Features

- 📦 Easy integration into any Node.js project
- 🔐 Secure SMTP config via `.env`
- 📤 Plain text and HTML email support
- ☁️ Ready to deploy on cloud platforms
- ✅ Gmail is pre-configured — just enter your credentials

---

## 🚀 Installation

```bash
npm install universal-mailer
```

## 📦 Usage

```bash
// index.js
const sendEmail = require('universal-mailer');
require('dotenv').config();

(async () => {
  try {
    await sendEmail({
      to: 'recipient@example.com',
      subject: 'Test Email from universal-mailer 📩',
      text: 'This is a plain text test email.',
      html: '<h1>Hello from universal-mailer!</h1><p>This is a test email sent using <strong>nodemailer</strong>.</p>',
    });
  } catch (err) {
    console.error("❌ Failed to send test email:", err);
  }
})();
```
## 📧 SMTP Configuration
To send emails using this application, set the following environment variables in a .env file:
```bash

# -----------------------------------
# SMTP SETTINGS (change these values)
# -----------------------------------

# For Gmail: smtp.gmail.com | Port 587 | Secure false
# For Office365: smtp.office365.com | Port 587 | Secure false + TLS
# For Zoho: smtp.zoho.com | Port 465 | Secure true

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true

# -----------------------------------
# AUTHENTICATION
# -----------------------------------
SMTP_USER=your-email@gmail.com          # Replace with your SMTP username
SMTP_PASS=your-app-password             # For Gmail, use an App Password

# -----------------------------------
# EMAIL SENDER NAME (shown in inbox)
# -----------------------------------
MAIL_FROM_NAME=Your Name                # This name appears in the recipient's inbox
```
🔐 Note:
- Gmail requires App Passwords if 2-Step Verification is enabled.
👉 [How to generate App Passwords for Gmail](https://support.google.com/accounts/answer/185833)


- Make sure less secure apps are allowed or app password is used if applicable.

- Always keep your .env file private and never commit it to version control.

## 📜 Function Signature

```bash
sendEmail({
  to: string,
  subject: string,
  text?: string,
  html?: string,
}): Promise<Object>

```

## 📩 Output

Upon success, logs:
```bash
📨 Email sent: <message-id>

```
Error Logs:
```bash
❌ Error sending email: [error-message]
```

## 🧑‍💻 Author
Utkarsh Gupta — @utkarsh-rgb