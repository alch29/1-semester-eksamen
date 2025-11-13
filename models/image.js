'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      image.belongsTo(models.user, {foreignKey: 'user_id'});
    }
  }
  image.init({
    filename: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    size: DataTypes.INTEGER,
    data: DataTypes.BLOB('long'),
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};