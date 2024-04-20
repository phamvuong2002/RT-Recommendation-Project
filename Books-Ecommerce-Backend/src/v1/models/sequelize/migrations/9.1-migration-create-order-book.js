'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_book', {
      ob_order_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'order id',
        references: {
          model: 'order',
          key: 'order_id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      ob_book_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'book id',
        references: {
          model: 'book',
          key: 'book_id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      ob_quantity:{
        type: Sequelize.INTEGER,
        comment: 'quantity',
      },
      ob_total_price:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total price',
      },
      ob_status:{
        type: Sequelize.ENUM('PendingConfirmation', 'PendingDelivery', 'Delivered', 'Refunded', 'Cancelled'),
        comment: 'status of order book',
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
    await queryInterface.addIndex('order_book', ['ob_order_id', 'ob_book_id'], {
      unique: true,
      name: 'uk_order_book_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};
