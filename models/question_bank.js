'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionBank extends Model {
    static associate(models) {
      // A question can be used by many users
      QuestionBank.hasMany(models.SecurityQuestion, {  // PascalCase 'SecurityQuestion'
        foreignKey: 'question_id',
        as: 'securityQuestions'
      });
    }
  }
  
  QuestionBank.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'QuestionBank',
    tableName: 'question_banks',
    underscored: true,
    timestamps: true
  });
  
  return QuestionBank;
};