/* eslint-disable no-undef */
'use strict';
const Task = require('./task_model');
const Token =  require('./token_model');
const User =  require('./users_model');

Task.belongsTo(User, {
  foreignKey: 'userID',
  as: 'creator' 
});

Task.belongsTo(User, {
  foreignKey: 'completedBy',
  as: 'completer' 
});


User.hasMany(Task, {
  foreignKey: 'userID',
  as: 'createdTasks' 
});

User.hasMany(Task, {
  foreignKey: 'completedBy',
  as: 'completedTasks' 
});


module.exports = {
  User,
  Task,
  Token
};


