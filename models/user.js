'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.role, {foreignKey: 'role_id'});
      user.hasMany(models.station, { foreignKey: 'user_id' });
    }
  }
user.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  }, {
    sequelize,
    modelName: 'user', 
  });
  return user;
};