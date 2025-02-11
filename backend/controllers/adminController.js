const Complaint = require('../models/complaintModel');
const { sendEmail } = require('../config/emailConfig');

// Get all complaints with user details
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('student', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    const complaint = await Complaint.findById(req.params.id)
      .populate('student', 'name email');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    complaint.status = status;
    complaint.adminRemarks = adminRemarks;
    await complaint.save();

    // Send email notification to student
    try {
      await sendEmail({
        to: complaint.student.email,
        subject: `Complaint Status Updated: ${complaint.complaintId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-top: 0;">Complaint Status Update</h2>
            </div>
            
            <p>Dear ${complaint.student.name},</p>
            
            <p>Your complaint has been updated:</p>
            
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
              <p><strong>Complaint ID:</strong> ${complaint.complaintId}</p>
              <p><strong>Subject:</strong> ${complaint.subject}</p>
              <p><strong>New Status:</strong> ${status}</p>
              ${adminRemarks ? `<p><strong>Admin Remarks:</strong> ${adminRemarks}</p>` : ''}
            </div>
            
            <p>You can check the details on your dashboard.</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    res.json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllComplaints,
  updateComplaintStatus
}; 