// Corrected content for middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Check capitalization: uppercase 'U'

// This function checks if the user is logged in
exports.protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        try {
            // Get token from cookie
            token = req.cookies.token;

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach to the request object
            // Exclude the password from the user object
            req.user = await User.findById(decoded.id).select('-password');
            
            // If user is not found, it means the token is invalid
            if (!req.user) {
               return res.status(401).redirect('/student/login'); 
            }

            next(); // Move to the next middleware or controller
        } catch (error) {
            console.error('Authorization error, token failed:', error.message);
            res.status(401).redirect('/student/login');
        }
    }

    if (!token) {
        res.status(401).send('Not authorized, no token. Please <a href="/student/login">login</a>.');
    }
};

// This function checks if the logged-in user has the 'student' role
exports.student = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next(); // User is a student, proceed
    } else {
        res.status(403).send('Forbidden: Access is restricted to students.');
    }
};

// This function checks if the logged-in user has the 'warden' role
exports.warden = (req, res, next) => {
    if (req.user && req.user.role === 'warden') {
        next(); // User is a warden, proceed
    } else {
        res.status(403).send('Forbidden: Access is restricted to wardens.');
    }
};