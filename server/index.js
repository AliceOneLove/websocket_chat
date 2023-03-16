const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET'],
    },
});

io.on('connection', (socket) => {
    socket.emit('set_nickname', {user: socket.id});
    socket.broadcast.emit('meet_user', {text: `The ${socket.id} connected, greet a newcomer!`});
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('meet_user', {text: `The ${socket.id} disconnected!`});
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});