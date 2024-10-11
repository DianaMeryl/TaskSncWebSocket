/* eslint-disable no-undef */
const {Task, User} = require('../models');

async function saveTask(userID, title, description) {
  try {

    if (!userID || !title || !description ) {
      throw new Error('all data are required');
    }

    const taskData = await Task.create({
      userID,
      title,
      description
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

async function getAllTasks(){
  try {

    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['nickName']  
        },
        {
          model: User,
          as: 'completer',
          attributes: ['nickName'] 
        }
      ]
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

async function getTask(taskID) { 
  try {
    const task = await Task.findByPk(taskID);
    return task;
  } catch (error) {
        
    console.error('Error getting task:', error);
    throw error;
  }
};



module.exports = {
  saveTask,
  removeTask,
  findTask,
  getAllTasks, 
  updateTask,
  getTask
};