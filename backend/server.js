/* eslint-disable no-undef */
const sequelize = require('./database/database');
const express = require('express');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const errorHandler = require('./middlewares/error_middlewares');
const http = require('http');

const PORT = process.env.SERVER_PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

sequelize.sync({
  force: false 
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Unable to connect to the database:', error);
  });
