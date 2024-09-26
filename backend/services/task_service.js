/* eslint-disable no-undef */
const Task = require('../models/task_model');

async function saveTask(userID, title, description, status) {
  try {

    if (!userID || !title || !description || !status ) {
      throw new Error('all data are required');
    }

    const taskData = await Task.create({
      userID,
      title,
      description,
      status
    });

    return taskData;

  } catch (error) {

    console.error('Помилка при збереженні нотатки:', error.message);
    throw error;
  }
}


async function removeTask(taskID){
  try {
    const taskData = await Task.destroy({
      where: {
        taskID
      }
    });

    if (!taskData) {
      throw new Error('Task not found');
    }

    return {
      message: 'Task successfully deleted' 
    };
  } catch (error) {
    console.error('Помилка при видаленні нотатки:', error.message);
    throw error;
  }
}

async function findTask(title){

  const taskData = await Task.findOne({
    title
  });

  return taskData;
}

async function getAllTasks(userID){
  try {

    const tasks = await Task.findAll({
      where: {
        userID: userID
      }
    });
    return tasks;
  } catch (error) {
        
    console.error('Помилка при отриманні завдань:', error);
    throw error;
  }
}

async function updateTask(taskID, task) {

  await Task.update(task, {
    where: {
      taskID: taskID
    } 
  });

}

module.exports = {
  saveTask,
  removeTask,
  findTask,
  getAllTasks, 
  updateTask
};