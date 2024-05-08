"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("address", {
      address_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id",
      },
      address_user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: "id user",
        references: {
          model: "user",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      address_user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "full name",
      },
      address_user_phone: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "user phone",
      },
      address_province_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "province id",
      },
      address_province_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "province name",
      },
      address_district_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "district id",
      },
      address_district_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "district name",
      },
      address_ward_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "ward id",
      },
      address_ward_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "ward name",
      },
      address_detail: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "detail address",
      },
      address_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: "address detail",
      },
      address_default_payment: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: "default payment address",
      },
      address_is_home: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: "is home?",
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
    await queryInterface.addIndex("address", ["address_id"], {
      unique: true,
      name: "uk_address_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("address");
  },
};
