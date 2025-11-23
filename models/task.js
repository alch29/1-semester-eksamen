'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      task.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
      task.belongsTo(models.station, { foreignKey: 'stations_id', as: 'station' });
      task.hasMany(models.task_product, { foreignKey: 'task_id', as: 'taskProducts' });
    }
  }
  task.init({
    completed_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    stations_id: DataTypes.INTEGER,
    // UUID Link
    link_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};