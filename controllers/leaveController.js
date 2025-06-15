const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/user');
const { sendSms, sendEmail } = require('../services/notificationService');

exports.applyForLeave = async (req, res) => {
    const { leaveType, startDate, endDate, reason, addressDuringLeave } = req.body;
    
    try {
        const student = await User.findById(req.user._id);

        const leaveRequest = new LeaveRequest({
            student: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason,
            addressDuringLeave,
            guardianContact: student.studentDetails.guardianPhone
        });

        const createdLeaveRequest = await leaveRequest.save();

        // 1. Send SMS to Parent on Application
        const parentPhone = student.studentDetails.guardianPhone;
        const smsBody = `Dear Parent, your child ${student.username} has applied for leave from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}. Status: Pending. - QuickPermit`;
        if (parentPhone) {
            await sendSms(parentPhone, smsBody);
        }

        // 2. Notify Warden via WebSocket
        const populatedRequest = await LeaveRequest.findById(createdLeaveRequest._id).populate('student', 'username studentDetails.roomNumber');
        req.io.emit('new_leave_request', populatedRequest);

        res.redirect('/student/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.decideOnLeave = async (req, res) => {
    const { status, wardenComment } = req.body;
    const { id } = req.params;

    try {
        const leaveRequest = await LeaveRequest.findById(id).populate('student');
        if (!leaveRequest) {
            return res.status(404).send('Leave Request not found');
        }

        leaveRequest.status = status;
        leaveRequest.wardenComment = wardenComment;
        await leaveRequest.save();

        const student = leaveRequest.student;
        const parentPhone = student.studentDetails.guardianPhone;
        // ... (existing SMS and Email logic) ...
        const notificationSubject = `Leave Request ${status}`;
        const notificationBody = `Dear ${student.username}, your leave request from ${new Date(leaveRequest.startDate).toLocaleDateString()} to ${new Date(leaveRequest.endDate).toLocaleDateString()} has been ${status}.`;
        const parentSmsBody = `Dear Parent, your child ${student.username}'s leave request has been ${status}. - QuickPermit`;
        await sendEmail(student.email, notificationSubject, `<p>${notificationBody}</p>`);
        if (parentPhone) { await sendSms(parentPhone, parentSmsBody); }
        

        // --- ADD THIS REAL-TIME UPDATE LOGIC ---
        const studentSocketId = req.userSockets[student._id.toString()];
        if (studentSocketId) {
            req.io.to(studentSocketId).emit('leave_status_update', {
                leaveId: leaveRequest._id,
                status: leaveRequest.status
            });
        }
        // --- END OF ADDED LOGIC ---

        res.redirect('/warden/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};