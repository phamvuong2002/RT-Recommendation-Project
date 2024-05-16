"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_behaviour", {
      ub_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "user behaviour id",
      },
      ub_sid: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: "id from redis",
      },
      ub_user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: "user id",
      },
      ub_behaviour_type: {
        type: Sequelize.STRING,
        comment: "behaviour type",
      },
      ub_product_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "product id",
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
    await queryInterface.addIndex("user_behaviour", ["ub_id"], {
      name: "uk_ub_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_behaviour");
  },
};
