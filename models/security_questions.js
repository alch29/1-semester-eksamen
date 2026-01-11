'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SecurityQuestion extends Model {
      static associate(models) {
    // Belongs to a user
    SecurityQuestion.belongsTo(models.user, {  
      foreignKey: 'user_id',
      as: 'user'
    });
    
    // Belongs to a question from question bank
    SecurityQuestion.belongsTo(models.QuestionBank, {  
      foreignKey: 'question_id',
      as: 'question'
    });
  }
  }
  
  SecurityQuestion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SecurityQuestion',
    tableName: 'security_questions',
    underscored: true,
    timestamps: true
  });
  
  return SecurityQuestion;
};