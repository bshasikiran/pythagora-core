const express = require('express');
const router = express.Router();
const { getAllComplaints, updateComplaintStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

router.use(protect);
router.use(isAdmin);

router.get('/complaints', getAllComplaints);
router.put('/complaints/:id', updateComplaintStatus);

module.exports = router; 