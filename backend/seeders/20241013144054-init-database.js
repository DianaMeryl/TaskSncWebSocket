/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';
const createUser = require('./data/user');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const usersList = await createUser();

    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.bulkInsert('users', usersList, {
        transaction
      });
      await transaction.commit();

    } catch (error) {

      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('users', {}, {
        transaction
      });
      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }
};

