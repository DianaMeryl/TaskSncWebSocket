/* eslint-disable no-undef */
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Token = sequelize.define('Token', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'userId'
    }
  },
  refreshToken: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
});

module.exports = Token;