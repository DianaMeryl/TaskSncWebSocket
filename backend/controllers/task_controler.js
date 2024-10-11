/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const TaskService = require('../services/task_service');

async function addingTaskItem(req, res, next) {
  try {
    console.log('Adding task: ', req.body);
    
    const userID =req.user.userID; 

    console.log('userID: ', userID);

    const {title, description} = req.body;

    if (!userID || !title || !description ) {
      throw new Error('all data  are required');
    }

    const taskData = await TaskService.saveTask( userID, title, description);

    return res.json(taskData);
  } catch (err) {
    console.error('Error in addingTaskItem:', err);
    return res.status(500).json({
      message: err.message 
    });
  }
}

async function removeTaskItem(req, res, next) {
  try {
    const { taskID } = req.params;
    console.log(taskID);
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
    
    const taskData = await TaskService.getAllTasks();

    return res.json(taskData);

  } catch (err) {
    next(err);
  }
}


async function updateOneTask(req, res) {
  const { taskID } = req.params;
  const {title, description} = req.body;

  try {
    const newTask = await TaskService.updateTask(taskID, {
      title,
      description
    });

    res.status(200).json(newTask);
  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: 'Не вдалося оновити нотатку' 
    });
  }
};

async function taskCompleted(req, res) {
  const { completedBy } = req.body;
  const { taskID } = req.params;

  try {
    const task = await TaskService.getTask(taskID);

    if (task) {
      task.status = true;
      task.completedBy = completedBy;
      await task.save();
      
      res.status(200).json({
        message: 'Task marked as completed' 
      });
    } else {
      res.status(404).json({
        message: 'Task not found' 
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task' 
    });
  }
};

async function taskIncompleted(req, res) {
  const { taskID } = req.params;
  try {
    const task = await TaskService.getTask(taskID);
    if (task) {
      task.status = false;
      task.completedBy = null;
      await task.save();
      res.status(200).json({
        message: 'Task marked as incomplete' 
      });
    } else {
      res.status(404).json({
        message: 'Task not found' 
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task' 
    });
  }
};

module.exports = {
  addingTaskItem,
  removeTaskItem,
  findAllTaskItems,
  findTaskItem,
  updateOneTask,
  taskCompleted,
  taskIncompleted
};