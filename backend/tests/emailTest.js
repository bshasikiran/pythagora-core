require('dotenv').config({ path: './.env' });
const { sendEmail } = require('../config/emailConfig');

const testEmail = async () => {
  try {
    console.log('Starting email test...');
    console.log('Environment variables:', {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_FROM: process.env.EMAIL_FROM,
      HAS_PASSWORD: process.env.EMAIL_PASS ? 'Yes' : 'No'
    });
    
    // Try alternative email service (Gmail SMTP)
    const mailOptions = {
      to: '227r1a66d6@cmrtc.ac.in',
      subject: 'Test Email from Grievance System',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from the Student Grievance System</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `
    };

    const result = await sendEmail(mailOptions);
    console.log('Test email sent successfully:', result);
  } catch (error) {
    console.error('Test email failed:', error);
    console.error('Error details:', error.response || error.message);
  }
};

console.log('Email test script started');
testEmail(); 