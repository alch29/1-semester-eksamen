'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add new columns for storing image data
    await queryInterface.addColumn('images', 'filename', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'unknown'
    });
    
    await queryInterface.addColumn('images', 'mimetype', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'image/jpeg'
    });
    
    await queryInterface.addColumn('images', 'size', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    
    await queryInterface.addColumn('images', 'data', {
      type: Sequelize.BLOB('long'),
      allowNull: false
    });
    
    // Remove the old file_path column
    await queryInterface.removeColumn('images', 'file_path');
  },

  async down(queryInterface, Sequelize) {
    // Restore file_path column
    await queryInterface.addColumn('images', 'file_path', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    // Remove the new columns
    await queryInterface.removeColumn('images', 'filename');
    await queryInterface.removeColumn('images', 'mimetype');
    await queryInterface.removeColumn('images', 'size');
    await queryInterface.removeColumn('images', 'data');
  }
};