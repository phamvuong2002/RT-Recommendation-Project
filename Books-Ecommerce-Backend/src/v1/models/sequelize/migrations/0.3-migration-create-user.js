"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id",
      },
      user_sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        comment: "sid",
      },
      user_username: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "username",
      },
      user_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "slug",
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "password",
      },
      user_salf: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "salf",
      },
      user_email: {
        type: Sequelize.STRING,
        comment: "email",
      },
      user_phone: {
        type: Sequelize.STRING,
        comment: "phone",
      },
      user_sex: {
        type: Sequelize.STRING,
        comment: "sex",
      },
      user_avatar: {
        type: Sequelize.STRING,
        comment: "avatar",
      },
      user_day_of_birth: {
        type: Sequelize.DATE,
        comment: "birthday",
      },
      user_status: {
        type: Sequelize.ENUM("pending", "active", "block"),
        defaultValue: "active",
        comment: "status",
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
    await queryInterface.addIndex("user", ["user_id"], {
      unique: true,
      name: "uk_user_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
