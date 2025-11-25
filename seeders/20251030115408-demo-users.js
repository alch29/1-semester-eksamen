'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [
    {
      name: 'Peter Parker',
      email:'spidey@man.com',
      password: '$2b$10$vHXTtgdx2t/oteID4bGKE.1aje460bhwmRsxf5taU02TyC8nIb3p2', // hashed version of 'password123'
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gwen Stacy',
      email:'gwen@stacy.com',
      password: 'password456',
      role_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Norman Osborn',
      email:'norman@osborn.com',
      password: 'password789',
      role_id: 2,
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
