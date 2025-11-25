'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop foreign key first
    await queryInterface.removeConstraint('stations', 'stations_ibfk_1'); // or actual FK name

    // Alter the column to allow null
    await queryInterface.changeColumn('stations', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Re-add the foreign key
    await queryInterface.addConstraint('stations', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'stations_user_id_fkey',
      references: { table: 'users', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop new FK
    await queryInterface.removeConstraint('stations', 'stations_user_id_fkey');

    // Make column NOT NULL again
    await queryInterface.changeColumn('stations', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    // Re-add original FK (adjust name as needed)
    await queryInterface.addConstraint('stations', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'stations_ibfk_1',
      references: { table: 'users', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  }
};
