/* eslint-disable no-undef */
// const sequelize = require('./database/database');
const express = require('express');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const errorHandler = require('./middlewares/error_middlewares');
const http = require('http');
const { Task } = require('./models');



const PORT = process.env.SERVER_PORT || 3001; 
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

io.on('connection', async (socket) => {
  // console.log('User connected', socket.id);

  const tasks = await Task.findAll();
  
  socket.emit('tasksList', tasks);

  socket.on('markTaskAsCompleted', async ({ taskID, userID }) => {
    const task = await Task.findByPk(taskID);
    if (task) {
      task.completed = true;
      task.completedBy = userID;
      await task.save(); 

      io.emit('taskCompleted', {
        taskID,
        userID 
      });
    }
  });

  socket.on('markTaskAsIncompleted', async ({ taskID }) => {
    const task = await Task.findByPk(taskID);
    if (task) {
      task.completed = false;
      task.completedBy = null;
      await task.save(); 

      io.emit('taskIncompleted', {
        taskID
      });
    }
  });

  socket.on('newTask', async (newTaskData) => {
    const newTask = await Task.create(newTaskData);
    io.emit('newTask', newTask);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

