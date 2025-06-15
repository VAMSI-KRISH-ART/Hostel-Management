const twilio = require('twilio');
const nodemailer = require('nodemailer');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendSms = async (to, body) => {
    try {
        await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to // Must be a verified number in Twilio trial mode
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};

exports.sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"QuickPermit" <${process.env.EMAIL_FROM}>`,
            to: to,
            subject: subject,
            html: html
        });
        console.log(`Email sent to ${to}`);
    } catch (error)
    {
        console.error('Error sending email:', error);
    }
};