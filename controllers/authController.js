const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.loginUser = async (req, res) => {
    console.log('Login attempt with body:', req.body);
    const { username, password } = req.body; // 'role' might come from a hidden field or URL param

    try {
        const user = await User.findOne({ username });

        if(!user) {
            console.log('User NOT found in DB for username:', username);
            return res.status(401).send('Invalid username or password');
        }
        console.log('User found in DB:', user.username, 'Role:', user.role);

        if (await user.matchPassword(password)) {
            console.log('Password MATCHED!');
            const token = generateToken(user._id);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });

            if (user.role === 'student') {
                return res.redirect('/student/dashboard');
            } else if (user.role === 'warden') {
                return res.redirect('/warden/dashboard');
            } else {
                console.log('Password DID NOT MATCHED!');
                return res.status(400).send('Invalid role');
            }
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('--- CRITICAL ERROR DURING LOGIN ---');
        console.error(error);// This will print the full error object and stack trace
        console.error('---------------------------------');
        res.status(500).send('Server Error');
    }
};

exports.logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.redirect('/');
};