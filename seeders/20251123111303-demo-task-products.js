'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('task_products', [
    {
      task_id: 1,
      product_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      task_id: 2,
      product_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      task_id: 2,
      product_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('task_products');
  }
};
