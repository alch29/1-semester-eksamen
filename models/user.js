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
      user.hasMany(models.SecurityQuestion, {foreignKey: 'user_id', as: 'securityQuestions'});
    }
  }
user.init({
  name: DataTypes.STRING(100),
  email: DataTypes.STRING(255),
  password: DataTypes.STRING(60),
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