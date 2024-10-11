/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const taskController = require('../controllers/task_controler');
const { userValidationRules } = require('../exceptions/userValidationRules');
const authMiddleware = require('../middlewares/auth_middleware');


router.post('/registration', userValidationRules(), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/alltasks', taskController.findAllTaskItems);
router.post('/addtask',  authMiddleware, taskController.addingTaskItem);
router.put('/tasks/:taskID', authMiddleware,taskController.updateOneTask);
router.delete('/removetask/:taskID', authMiddleware,taskController.removeTaskItem);
router.delete('/removeuser/:userID', authMiddleware, userController.removeUser);
router.post('/tasks/:taskID/complete', taskController.taskCompleted);
router.post('/tasks/:taskID/incomplete', taskController.taskIncompleted);

module.exports = router;