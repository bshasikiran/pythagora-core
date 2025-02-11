const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { requireUser } = require('./middleware/auth');
const { sendComplaintNotification } = require('../services/mailService');

// Submit a new complaint
router.post('/submit', requireUser, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const complaint = new Complaint({
      title,
      description,
      category,
      user: req.user._id
    });

    await complaint.save();
    await sendComplaintNotification(complaint);

    res.status(201).json({ 
      success: true, 
      message: 'Complaint submitted successfully',
      complaint 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's complaints
router.get('/user', requireUser, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id });
    res.json({ complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;