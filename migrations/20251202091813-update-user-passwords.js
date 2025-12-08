'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash the passwords
    const hashedPassword456 = await bcrypt.hash('password456', 10);
    const hashedPassword789 = await bcrypt.hash('password789', 10);

    // Update Gwen's password
    await queryInterface.bulkUpdate('users', 
      { 
        password: hashedPassword456,
        updatedAt: new Date()
      },
      { email: 'gwen@stacy.com' }
    );

    // Update Norman's password
    await queryInterface.bulkUpdate('users', 
      { 
        password: hashedPassword789,
        updatedAt: new Date()
      },
      { email: 'norman@osborn.com' }
    );

    console.log('Passwords updated successfully!');
  },

  async down (queryInterface, Sequelize) {
    // Revert to original plain text passwords (for rollback)
    await queryInterface.bulkUpdate('users', 
      { 
        password: 'password456',
        updatedAt: new Date()
      },
      { email: 'gwen@stacy.com' }
    );

    await queryInterface.bulkUpdate('users', 
      { 
        password: 'password789',
        updatedAt: new Date()
      },
      { email: 'norman@osborn.com' }
    );

    console.log('Passwords reverted to plain text');
  }
};