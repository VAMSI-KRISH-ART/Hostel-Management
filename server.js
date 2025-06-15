require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSockets = {}; // { userId: socketId }

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    
    // When a user connects, they will send their userId
    socket.on('register', (userId) => {
        userSockets[userId] = socket.id;
        console.log(`User registered: ${userId} with socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
        // Find and remove user from our tracking object on disconnect
        for (const userId in userSockets) {
            if (userSockets[userId] === socket.id) {
                delete userSockets[userId];
                break;
            }
        }
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected via WebSocket');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Make io accessible to our router
app.use((req, res, next) => {
    req.io = io;
    req.userSockets = userSockets;
    next();
});

// Routes
app.use('/', require('./routes/views'));
app.use('/api', require('./routes/api'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));