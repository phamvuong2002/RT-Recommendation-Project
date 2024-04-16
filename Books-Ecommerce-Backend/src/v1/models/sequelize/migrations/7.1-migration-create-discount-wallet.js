'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discount_wallet', {
      dw_discount_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'discount id',
        references: {
            model: 'discount',
            key: 'discount_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      dw_user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: 'user id',
        references: {
            model: 'user',
            key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      dw_user_status: {
        type: Sequelize.ENUM('active', 'inactive', 'outdate'),
        allowNull: false,
        defaultValue:'active',
        comment: 'status: active, inactive, outdate'
      },
      dw_user_quatity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'number of discount codes'
      },
      create_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'create_time'
      },
      update_time: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'update_time'
      }
    });
    await queryInterface.addIndex('discount_wallet', ['dw_discount_id', 'dw_user_id'], {
      unique: true,
      name: 'uk_discount_wallet_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('discount_wallet');
  }
};
