const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io');
const http = require('http');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const aiRoutes = require('./routes/ai');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: '*' }
});

const SECRET_KEY = 'birdiesecret';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://natashakippur:Jazminrox11@birdiebot.tdwu1bt.mongodb.net/')
  .then(() => console.log('MongoDB connected 🌸'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

io.on('connection', socket => {
    console.log('New WebSocket connection');
    socket.on('taskUpdate', data => {
        socket.broadcast.emit('taskUpdate', data);
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));