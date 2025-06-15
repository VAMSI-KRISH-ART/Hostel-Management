// Correct and complete content for controllers/viewController.js

const User = require('../models/User');
const LeaveRequest = require('../models/LeaveRequest');

// --- Functions for rendering simple pages ---
exports.renderSelectionPage = (req, res) => res.render('selectionpage');
exports.renderStudentLogin = (req, res) => res.render('studentlogin');
exports.renderWardenLogin = (req, res) => res.render('wardenlogin');
exports.renderLeaveApplicationForm = (req, res) => res.render('leaveapplication', { user: req.user });

// --- Robust function for rendering the Student Dashboard ---
// This was missing from the code you provided, so it's important to add it.
exports.renderStudentDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            return res.redirect('/student/login');
        }
        const leaveHistory = await LeaveRequest.find({ student: user._id }).sort({ createdAt: -1 });
        res.render('student_dashboard', { user: user, leaveHistory });
    } catch (error) {
        console.error('Error rendering student dashboard:', error);
        res.status(500).send('Server Error');
    }
};

// --- Robust function for rendering the Warden Dashboard ---
// This is the single, correct version. The duplicate has been removed.
exports.renderWardenDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user || user.role !== 'warden') {
            res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            return res.redirect('/warden/login');
        }
        const leaveRequests = await LeaveRequest.find()
            .populate('student', 'username studentDetails.registrationNumber studentDetails.roomNumber')
            .sort({ createdAt: -1 });
        res.render('warden_dashboard', { user: user, leaveRequests });
    } catch (error) {
        console.error('Error rendering warden dashboard:', error);
        res.status(500).send('Server Error');
    }
};