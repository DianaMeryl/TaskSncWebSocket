/* eslint-disable no-undef */
const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
  userID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash:{
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'user'
  }
},   { 
  tableName: 'users' 
});

module.exports = User;