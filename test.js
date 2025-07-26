require('dotenv').config();
const sendMail = require('./index');

(async () => {
  try {
    await sendMail({
      to: 'example@example.com',
      subject: 'Test Email',
      text: 'Hello from quick-mailer!',
    });
    console.log('✅ Email sent!');
  } catch (err) {
    console.error(err);
  }
})();
