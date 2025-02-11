const nodemailer = require('nodemailer');

const createTransporter = async () => {
  // For Gmail
  const config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    debug: true,
    logger: true
  };

  console.log('Creating transport with config:', {
    ...config,
    auth: {
      ...config.auth,
      pass: config.auth.pass ? '[HIDDEN]' : undefined
    }
  });

  const transporter = nodemailer.createTransport(config);

  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return transporter;
  } catch (error) {
    console.error('SMTP connection error:', error);
    
    // Try alternative configuration
    const altConfig = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    
    console.log('Trying alternative config');
    const altTransporter = nodemailer.createTransport(altConfig);
    await altTransporter.verify();
    return altTransporter;
  }
};

let transporter = null;

const getTransporter = async () => {
  if (!transporter) {
    transporter = await createTransporter();
  }
  return transporter;
};

const sendEmail = async (options) => {
  try {
    const emailTransporter = await getTransporter();
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      ...options,
    };

    console.log('Sending email with options:', {
      ...mailOptions,
      html: mailOptions.html ? '[HTML Content]' : undefined
    });

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = { sendEmail }; 