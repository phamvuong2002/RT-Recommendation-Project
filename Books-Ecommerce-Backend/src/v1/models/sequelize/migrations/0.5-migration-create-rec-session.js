"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rec_session", {
      rec_session_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "session id",
      },
      rec_model_id: {
        type: Sequelize.STRING,
        comment: "model id",
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
    await queryInterface.addIndex("rec_session", ["rec_session_id"], {
      unique: true,
      name: "uk_rec_session_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rec_session");
  },
};
