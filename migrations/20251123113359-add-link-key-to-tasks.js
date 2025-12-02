module.exports = {
  async up(queryInterface, Sequelize) {
    // Only add column if not present
    return queryInterface.describeTable('tasks').then(table => {
      if (!table.link_key) {
        return queryInterface.addColumn('tasks', 'link_key', {
          type: Sequelize.STRING,
          allowNull: false,
        });
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('tasks', 'link_key');
  }
};
