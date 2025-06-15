const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController');
const { applyForLeave, decideOnLeave } = require('../controllers/leaveController');
const { protect, student, warden } = require('../middleware/authMiddleware');

// Auth routes
router.post('/auth/login', loginUser);
router.get('/auth/logout', logoutUser);

// Leave routes
router.post('/leave/apply', protect, student, applyForLeave);
router.post('/leave/decide/:id', protect, warden, decideOnLeave);

module.exports = router;