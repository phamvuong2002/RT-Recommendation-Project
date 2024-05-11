"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rec_model", {
      rec_model_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        comment: "model id",
      },
      rec_model_type: {
        type: Sequelize.ENUM("content", "rating", "behaviour"),
        comment: "type",
      },
      rec_model_status: {
        type: Sequelize.ENUM("successfully", "failed"),
        defaultValue: "successfully",
        comment: "traing status",
      },
      create_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "create_time",
      },
      update_time: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "update_time",
      },
    });
    await queryInterface.addIndex("rec_model", ["rec_model_id"], {
      unique: true,
      name: "uk_rec_model_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rec_model");
  },
};
