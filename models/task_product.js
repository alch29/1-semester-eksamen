'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      task_product.belongsTo(models.task, { foreignKey: 'task_id', as: 'task' });
      task_product.belongsTo(models.product, { foreignKey: 'product_id', as: 'product' });
    }
  }
task_product.init({
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'task_product',
});
  return task_product;
};