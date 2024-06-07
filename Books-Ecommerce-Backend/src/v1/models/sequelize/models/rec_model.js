'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecModel extends Model {
    static associate(models) {
      // Define associations here
      // Example:
      // this.belongsTo(models.User, { foreignKey: 'cart_userid' });
    }
  }
  RecModel.init({
    rec_model_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      comment: "model id",
    },
    rec_model_type: {
      type: DataTypes.ENUM("content", "rating", "behaviour"),
      comment: "type",
    },
    rec_model_status: {
      type: DataTypes.ENUM("successfully", "failed"),
      defaultValue: "successfully",
      comment: "traing status",
    },
    create_time: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:DataTypes.NOW,
      comment: "create_time",
    },
    update_time: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
      onUpdate:DataTypes.NOW,
      comment: "update_time",
    },
  },
    {
      sequelize,
      modelName: 'rec_model',
      tableName: 'rec_model',
      timestamps: false
    }
  );
  return RecModel;
};
