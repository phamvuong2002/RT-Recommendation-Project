'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecSession extends Model {
    static associate(models) {
      // Define associations here
      // Example:
      // this.belongsTo(models.User, { foreignKey: 'cart_userid' });
    }
  }
  RecSession.init (
     {
      rec_session_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT.UNSIGNED,
        comment: "session id",
      },
      rec_model_id: {
        type: DataTypes.STRING,
        comment: "model id",
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
    {sequelize,
    modelName: 'rec_session',
    tableName: 'rec_session',
    timestamps: false
  }
  );
  return RecSession;
};
