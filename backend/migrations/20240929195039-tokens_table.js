/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Додає автоматичне збільшення
        allowNull: false
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'userID'
        }
      },
      refreshToken: {
        type: Sequelize.STRING(1000),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  }
};
