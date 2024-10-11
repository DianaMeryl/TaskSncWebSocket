/* eslint-disable no-undef */
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Token = sequelize.define('tokens', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'userID'
    }
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { 
  timestamps: false,
  tableName: 'tokens' 
} 
);

module.exports = Token;