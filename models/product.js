'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(user, {foreignKey: 'user_id'});
      product.hasOne(measurement, {foreignKey: 'measurement_id'});
    }
  }
  product.init({
    name: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,
    measurement_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};