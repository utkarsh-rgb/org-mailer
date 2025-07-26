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
```bash
❌ Error sending email: [error-message]
```

## 🧑‍💻 Author
Utkarsh Gupta — @utkarsh-rgb