'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('question_banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Seed some default questions
    await queryInterface.bulkInsert('question_banks', [
      { question_text: 'What city were you born in?', created_at: new Date(), updated_at: new Date() },
      { question_text: 'What was your first pet\'s name?', created_at: new Date(), updated_at: new Date() },
      { question_text: 'What is your mother\'s maiden name?', created_at: new Date(), updated_at: new Date() },
      { question_text: 'What was the name of your first school?', created_at: new Date(), updated_at: new Date() },
      { question_text: 'What is your favorite book?', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question_banks');
  }
};