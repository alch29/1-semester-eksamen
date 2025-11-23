'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('tasks', [
    {
      stations_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      link_key: 'uuid-link-1-test',
      completed_date: new Date(),
    },
    {
      stations_id: 2,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      link_key: 'uuid-link-2-test',
      completed_date: new Date(),
    },
    {
      stations_id: 2,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      link_key: 'uuid-link-3-test',
      completed_date: new Date(),
    },

  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
