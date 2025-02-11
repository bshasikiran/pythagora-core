const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createComplaint);
router.get('/', protect, getComplaints);

module.exports = router; 