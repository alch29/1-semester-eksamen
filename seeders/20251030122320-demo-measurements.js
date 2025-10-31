'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('measurements', [
    {
      measurement_name: 'Liter' ,
      measurement_symbol: 'L',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      measurement_name: 'Milliliter' ,
      measurement_symbol: 'ml',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      measurement_name: 'Kilogram' ,
      measurement_symbol: 'Kg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      measurement_name: 'Gram' ,
      measurement_symbol: 'g',
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
