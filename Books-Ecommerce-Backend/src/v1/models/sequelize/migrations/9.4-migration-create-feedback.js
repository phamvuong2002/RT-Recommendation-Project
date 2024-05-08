"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("feedback", {
      feedback_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id",
      },
      feedback_userid: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id user",
        references: {
          model: "user",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      feedback_bookid: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id book",
        references: {
          model: "book",
          key: "book_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      feedback_orderid: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id order",
        references: {
          model: "order",
          key: "order_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      feedback_rating: {
        type: Sequelize.ENUM("0", "1", "2", "3", "4", "5"),
        allowNull: false,
        defaultValue: "0",
        comment: "rating: [1,5]",
      },
      feedback_content: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0,
        comment: "comments",
      },
      feedback_status: {
        type: Sequelize.ENUM("active", "banned"),
        allowNull: false,
        defaultValue: "active",
        comment: "status: active, banned",
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
    await queryInterface.addIndex("feedback", ["feedback_id"], {
      unique: true,
      name: "uk_feedback_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("feedback");
  },
};
