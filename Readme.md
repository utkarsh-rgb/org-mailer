# smart-mailer

![npm](https://img.shields.io/npm/v/smart-mailer)
![license](https://img.shields.io/npm/l/smart-mailer)
![issues](https://img.shields.io/github/issues/utkarsh-rgb/smart-mailer)

A universal email sending utility for Node.js that auto-detects SMTP settings based on the email domain. Supports Gmail, Outlook, Office365, Zoho, Yahoo, and custom domains via MX record lookup.

> Just provide the email and password in your `.env` file — everything else is mapped automatically!

---

> Built with [nodemailer](https://nodemailer.com)  
> No SMTP credentials hardcoded — everything from `.env`

---


## Features


- **Auto-detect SMTP settings** based on sender’s domain (e.g., Gmail, Yahoo, Outlook, Zoho).
- **No manual setup** required for host, port, or security.
- Uses `.env` for secure credentials.
- Works with most public mail services and custom domains (if MX records are configured).
- Lightweight and easy to integrate into any backend Node.js app.
---

## Installation

```bash
npm install smart-mailer
```

## Usage

```bash
// index.js
const sendEmail = require('smart-mailer');
require('dotenv').config();

(async () => {
  try {
    await sendEmail({
      to: 'recipient@example.com',
      subject: 'Test Email from smart-mailer 📩',
      text: 'This is a plain text test email.',
      html: '<h1>Hello from smart-mailer!</h1><p>This is a test email sent using <strong>nodemailer</strong>.</p>',
    });
  } catch (err) {
    console.error("❌ Failed to send test email:", err);
  }
})();
```
## Setup

Create a .env file in your project root:
```bash
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password_or_app_password

```
Note:
- Gmail requires App Passwords if 2-Step Verification is enabled.
[How to generate App Passwords for Gmail](https://support.google.com/accounts/answer/185833)


- Make sure less secure apps are allowed or app password is used if applicable.

- Always keep your .env file private and never commit it to version control.
## How It Works
The package uses your email domain to auto-map the correct SMTP settings by:

Checking a predefined list for common providers (Gmail, Outlook, etc.)

Falling back to MX record lookup for custom domains

## Sending an Email
```bash
const  sendEmail  = require('smart-mailer');

sendEmail({
  to: 'recipient@example.com',
  subject: 'Welcome to Quick Mailer',
  text: 'Hello from the smart-mailer package!',
})
  .then(() => console.log('✅ Email sent successfully!'))
  .catch((err) => console.error('❌ Failed to send email:', err));

```

## Author
[Utkarsh Gupta](https://github.com/utkarsh-rgb)