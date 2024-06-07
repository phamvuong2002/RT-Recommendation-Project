"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thay đổi kiểu dữ liệu của cột rec_model_type từ ENUM sang STRING
    await queryInterface.changeColumn("rec_model", "rec_model_type", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "type",
    });
  },

  async down(queryInterface, Sequelize) {
    // Thay đổi kiểu dữ liệu của cột rec_model_type từ STRING về ENUM
    await queryInterface.changeColumn("rec_model", "rec_model_type", {
      type: Sequelize.ENUM("content", "rating", "behaviour"),
      allowNull: true,
      comment: "type",
    });
  },
};
