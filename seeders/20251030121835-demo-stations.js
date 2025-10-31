'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('stations', [
    {
      name: 'Circle K' ,
      address: 'Main St 1, 1000 City',
      email: 'circle@k.com',
      phone: '12345678',
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
        {
      name: '7-Elevelen' ,
      address: 'Main St 12, 1700 City',
      email: '7@elevelen.com',
      phone: '71171171',
      user_id: 3,
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
