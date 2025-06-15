const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedUsers = async () => {
    try {
        // This will delete ALL existing users before adding the new ones.
        // If you want to KEEP existing users and just ADD new ones,
        // comment out or delete the next line.
        // --- Create an array of all users to be added ---
        const usersToCreate = [
            // Original Warden
            {
                username: 'Snehith',
                email: 'msnehithbabu2007@gmail.com',
                password: 'Snehith@2007',
                role: 'warden'
            },
            // --- NEW WARDEN ---
            {
                username: 'Uday',
                email: 'Uday2006@gmail.com',
                password: 'Uday@2006',
                role: 'warden'
            },
            // Original Student
            {
                username: 'Vamsi',
                email: 'vamsionteru6885@gmail.com',
                password: 'Vamsi@2005',
                role: 'student',
                studentDetails: {
                    registrationNumber: ' 241UCS0182',
                    roomNumber: 'C-311',
                    guardianName: 'Naganjineyulu',
                    guardianPhone: '+91 9550151664' // Change to a real number for testing
                }
            },
            // --- NEW STUDENT 1 ---
            {
                username: 'Prathap',
                email: 'prathapthotti04@gmail.com',
                password: 'Prathap@2006',
                role: 'student',
                studentDetails: {
                    registrationNumber: ' 241UCS0178',
                    roomNumber: '302-A',
                    guardianName: 'Anil Kumar',
                    guardianPhone: '+91 7095223221' // Change to a real number for testing
                }
            },
            // --- NEW STUDENT 2 ---
            {
                username: 'Vijay',
                email: 'vijay2006@gmail.com',
                password: 'Vijay@2006',
                role: 'student',
                studentDetails: {
                    registrationNumber: 'STU789',
                    roomNumber: 'C-303',
                    guardianName: 'Krishna Rao',
                    guardianPhone: '+15559876543' // Change to a real number for testing
                }
            }
        ];

        for (const userData of usersToCreate) {
            const userExists = await User.findOne({ email: userData.email });
            if (!userExists) {
                await User.create(userData);
                console.log(`User created: ${userData.username}`);
            } else {
                console.log(`User already exists, skipping: ${userData.username}`);
            }
        }
        
        console.log('--- DATABASE SEEDING COMPLETE ---');
        process.exit();
    } catch (error) {
        console.error(`Error seeding database: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();