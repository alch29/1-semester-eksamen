'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      station.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
    }
  }
  station.init({
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(255),
    address: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    user_id: DataTypes.INTEGER,
    cleaning_of_forecourt: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'station',
  });
  return station;
};