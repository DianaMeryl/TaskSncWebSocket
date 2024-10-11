/* eslint-disable no-undef */
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Task = sequelize.define('tasks', {
  taskID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'userID'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false, 
    defaultValue: false
  },
  completedBy: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: {
      model: 'users', 
      key: 'userID'
    },
    onDelete: 'SET NULL'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  } 
},   { 
  tableName: 'tasks' 
});

module.exports = Task;