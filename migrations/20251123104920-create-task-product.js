'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_products', {
      task_id: {
        allowNull: false,
        references: { model: 'tasks', key: 'id' },
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        references: { model: 'products', key: 'id' },
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
      await queryInterface.addConstraint('task_products', {
        fields: ['task_id', 'product_id'],
        name: 'task_product_composite_pk',
        type: 'primary key',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task_products');
  },
};