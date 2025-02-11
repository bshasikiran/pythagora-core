const mongoose = require('mongoose');

// Function to generate complaint ID
function generateComplaintId() {
  const year = new Date().getFullYear().toString().substr(-2);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GRV${year}${random}`;
}

const complaintSchema = mongoose.Schema({
  complaintId: {
    type: String,
    unique: true,
    default: generateComplaintId
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  adminRemarks: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', complaintSchema); 