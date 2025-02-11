const Complaint = require('../models/complaintModel');
const User = require('../models/userModel');
const { sendEmail } = require('../config/emailConfig');

const ADMIN_EMAIL = '227r1a66d6@cmrtc.ac.in'; // Admin email address

// Create new complaint
const createComplaint = async (req, res) => {
  try {
    console.log('Creating complaint for user:', req.user.email);
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create complaint
    const complaint = await Complaint.create({
      student: req.user.id,
      subject,
      description
    });

    // Format the date
    const formattedDate = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short'
    });

    // Send email notification to student
    try {
      // Email to student
      await sendEmail({
        to: req.user.email,
        subject: `Complaint Filed: ${complaint.complaintId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-top: 0;">Complaint Registration Confirmation</h2>
              <p style="color: #666;">Filed on: ${formattedDate}</p>
            </div>
            
            <p>Dear <strong>${req.user.name}</strong>,</p>
            
            <p>Your complaint has been successfully registered in our system. Here are the details:</p>
            
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">Complaint Details</h3>
              <p><strong>Complaint ID:</strong> ${complaint.complaintId}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Status:</strong> <span style="color: #e67e22;">Pending</span></p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0;"><strong>Next Steps:</strong></p>
              <ul style="margin-top: 10px;">
                <li>Your complaint will be reviewed by our team</li>
                <li>You will receive updates on any status changes</li>
                <li>You can track your complaint through the dashboard</li>
              </ul>
            </div>
            
            <p style="color: #7f8c8d; margin-top: 20px; font-size: 0.9em;">
              This is an automated message. Please do not reply to this email.
              If you need to provide additional information, please use the student dashboard.
            </p>
          </div>
        `
      });

      // Email to admin
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: `New Complaint Received: ${complaint.complaintId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-top: 0;">New Complaint Notification</h2>
              <p style="color: #666;">Received on: ${formattedDate}</p>
            </div>
            
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #e74c3c; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">Complaint Details</h3>
              <p><strong>Complaint ID:</strong> ${complaint.complaintId}</p>
              <p><strong>Student Name:</strong> ${req.user.name}</p>
              <p><strong>Student Email:</strong> ${req.user.email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Description:</strong> ${description}</p>
              <p><strong>Status:</strong> <span style="color: #e67e22;">Pending</span></p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0;"><strong>Required Action:</strong></p>
              <p>Please review and take appropriate action on this complaint.</p>
            </div>
          </div>
        `
      });

      console.log('Complaint confirmation emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send complaint email:', emailError);
      if (emailError.response) {
        console.error('Email error response:', emailError.response);
      }
    }

    // Send success response
    res.status(201).json({
      success: true,
      data: complaint,
      message: 'Complaint registered successfully. Check your email for confirmation.'
    });

  } catch (error) {
    console.error('Complaint creation error:', error);
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get user complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id })
      .sort({ createdAt: -1 }); // Most recent first
    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints
}; 