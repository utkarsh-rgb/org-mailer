# org-mailer 📬

A simple Node.js email sending package using Nodemailer. Supports Gmail, Outlook, and any custom SMTP provider.

## Installation

```bash
npm install org-mailer

```

## 🚀 Usage

```bash
const sendEmail = require('org-mailer');

sendEmail({
  to: 'recipient@example.com',
  subject: 'Hello from your custom mailer!',
  html: '<h1>Welcome!</h1>',
    });

```
Make sure to create a .env file with your SMTP settings:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM_NAME=MyApp

```