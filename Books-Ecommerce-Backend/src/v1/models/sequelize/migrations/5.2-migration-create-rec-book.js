"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rec_book", {
      rec_session_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "session id",
        references: {
          model: "rec_session",
          key: "rec_session_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      rec_user_sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        comment: "user sid",
      },
      rec_book_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id",
      },
      rec_book_title: {
        type: Sequelize.STRING,
        comment: "spu name",
      },
      rec_book_img: {
        type: Sequelize.STRING,
        defaultValue: "",
        comment: "book thumbnail",
      },
      rec_book_categories: {
        type: Sequelize.JSON,
        comment: "book categories",
      },
      rec_book_spe_price: {
        type: Sequelize.DECIMAL(11, 2),
        allowNull: false,
        comment: "special price",
      },
      rec_book_old_price: {
        type: Sequelize.DECIMAL(11, 2),
        allowNull: false,
        comment: "old price",
      },
      rec_book_is_recommadation: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "is recommenddation product",
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
    await queryInterface.addIndex("rec_book", ["rec_session_id"], {
      name: "uk_session_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rec_book");
  },
};
