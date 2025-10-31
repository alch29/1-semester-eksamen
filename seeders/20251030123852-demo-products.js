'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('products', [
    {
      name: 'Shampoo',
      is_deleted: false,
      measurement_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Detergent',
      is_deleted: false,
      measurement_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Window Cleaner',
      is_deleted: false,
      measurement_id: 2,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
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
