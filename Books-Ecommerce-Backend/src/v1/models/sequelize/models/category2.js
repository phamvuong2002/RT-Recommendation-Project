'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category2 extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Category2.init({
    cate2_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      comment: 'id'
    },
    cate2_sid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'id_string'
    },
    cate2_name: {
      type: DataTypes.STRING,
      defaultValue: '',
      comment: 'cate_name'
    },
    cate2_slug: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: 'cate_slug'
    },
    cate1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'cate1_id'
    },
    cate1_sid: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'cate1_sid'
    },
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'created timestamp'
    },
    update_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'updated timestamp'
    }
  }, {
    sequelize,
    modelName: 'category_2',
    tableName: 'category_2',
    timestamps: false // Set to true if you want Sequelize to handle createdAt and updatedAt columns
  });
  return Category2;
};
