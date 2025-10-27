'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  measurement.init({
    measurement_name: DataTypes.STRING,
    measurement_symbol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'measurement',
  });
  return measurement;
};