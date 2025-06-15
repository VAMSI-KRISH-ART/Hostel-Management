// Corrected content for routes/views.js

const express = require('express');
const router = express.Router();

// Make sure you are destructuring the imported functions correctly with {}
const {
    renderSelectionPage,
    renderStudentLogin,
    renderWardenLogin,
    renderStudentDashboard,
    renderWardenDashboard,
    renderLeaveApplicationForm
} = require('../controllers/viewController');

const { protect, student, warden } = require('../middleware/authMiddleware');

// Publicly accessible routes
router.get('/', renderSelectionPage);
router.get('/student/login', renderStudentLogin);
router.get('/warden/login', renderWardenLogin);

// Protected routes that require authentication and specific roles
router.get('/student/dashboard', protect, student, renderStudentDashboard);
router.get('/warden/dashboard', protect, warden, renderWardenDashboard);
router.get('/student/apply-leave', protect, student, renderLeaveApplicationForm);

module.exports = router;