'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart', {
      cart_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      cart_status: {
        type: Sequelize.ENUM('active', 'completed', 'failed', 'pending'),
        allowNull: false,
        defaultValue:'active',
        comment: 'status: active, completed, failed, pending'
      },
      cart_userid: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id user',
        references: {
          model: 'user',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.addIndex('cart', ['cart_id'], {
      unique: true,
      name: 'uk_cart_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart');
  }
};
