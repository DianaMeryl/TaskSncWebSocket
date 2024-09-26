/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const TaskService = require('../services/task_service');


async function addingTaskItem(req, res, next) {
  try {
    const userID =req.user.userID; 

    const {
      title, description, status 
    } = req.body;

    if (!userID || !title || !description || !status ) {
      throw new Error('all data  are required');
    }

    const taskData = await TaskService.saveTask( userID, title, description, status);
    return res.json(taskData);
  } catch (err) {

    return res.status(500).json({
      message: err.message 
    });
  }
}

async function removeTaskItem(req, res, next) {
  try {
    const { taskID } = req.params;
        
    const taskData = await TaskService.removeTask(taskID);

    return res.json(taskData);
  } catch (err) {
    next(err);
  }
}

async function findTaskItem(req, res, next) {
  try {
    const { title } = req.body;
        
    const taskData = await TaskService.findTask(title);

    return res.json(taskData);

  } catch (err) {
    next(err);
  }
}

async function findAllTaskItems(req, res, next) {
  try {
    const userID =req.user.userID; 
    
    const taskData = await TaskService.getAllTasks(userID);

    return res.json(taskData);

  } catch (err) {
    next(err);
  }
}


async function updateOneTask(req, res) {
  const { taskID } = req.params;
  const {
    title, description, status 
  } = req.body;

  try {
    const newTask = await TaskService.updateTask(taskID, {
      title,
      description,
      status
    });

    res.status(200).json(newTask);
  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Не вдалося оновити нотатку' 
    });
  }
};

module.exports = {
  addingTaskItem,
  removeTaskItem,
  findAllTaskItems,
  findTaskItem,
  updateOneTask
};