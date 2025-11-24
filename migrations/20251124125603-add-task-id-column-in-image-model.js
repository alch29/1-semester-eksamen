'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('images', 'task_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{model:'tasks', key:'id'}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('images', 'task_id');
  }
};