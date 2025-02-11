const nodemailer = require('nodemailer');

// Create reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',  // Using Brevo (formerly Sendinblue) as alternative
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '227r1a66d6@cmrtc.ac.in', // your email
    pass: process.env.EMAIL_PASS // your password
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Student Grievance System" <227r1a66d6@cmrtc.ac.in>',
      to,
      subject,
      text,
      html
    });
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail }; 