/* eslint-disable no-undef */
// const sequelize = require('./database/database');
const express = require('express');
const router = require('./routers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const errorHandler = require('./middlewares/error_middlewares');
const http = require('http');
const { Task, User } = require('./models');


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

  socket.on('markTaskAsCompleted', async ({ taskID, completedBy }) => {
    
    try {
      const user = await User.findByPk(completedBy, {
        attributes: ['nickName'] 
      });

      const completedByNickName = user ? user.nickName : 'Unknown';

      await Task.update(
        {
          status: true,
          completedBy: completedBy
        },
        {
          where: {
            taskID 
          } 
        }
      );
      const allTasks = await Task.findAll(); 

      const tasksWithNickNames = allTasks.map(task => ({
        ...task.toJSON(),
        completedByNickName: task.completedBy === completedBy ? completedByNickName : 'Unknown' // використовуємо змінну
      }));

      io.emit('updateTasks', tasksWithNickNames); 
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  });

  socket.on('markTaskAsIncompleted', async ({ taskID }) => {
    await Task.update(
      {
        status: false,
        completedBy: null 
      },  
      {
        where: {
          taskID 
        } 
      }
    );

    const allTasks = await Task.findAll(); 
    io.emit('updateTasks', allTasks);
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

