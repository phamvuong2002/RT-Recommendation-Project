'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      // order_shipping: {
      //   type: Sequelize.BIGINT.UNSIGNED,
      //   comment: 'address shipping',
      //   references: {
      //     model: 'address',
      //     key: 'address_id'
      //   },
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
      order_user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'user_id',
        references: {
          model: 'user',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      order_tracking_code: {
        type: Sequelize.STRING,
        comment: 'shipping code',
      },
      order_discounts: {
        type: Sequelize.JSON,
        comment: 'discounts used in order',
      },
      order_status:{
        type: Sequelize.ENUM('Processing', 'Completed', 'Shipping', 'Refunded', 'Cancelled'),
        comment: 'status of order',
      },
      order_payment:{
        type: Sequelize.ENUM('cod', 'vnpay', 'momo', 'paypal', 'other'),
        comment: 'paymend method',
      },
      order_num_books:{
        type: Sequelize.INTEGER,
        comment: 'number of books in order',
      },
      order_old_total:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total order',
      },
      order_spe_total:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total order',
      },
      order_fee_service:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total order',
      },
      order_fee_shiping:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total order',
      },
      order_discount_amount:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'total discount amount',
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
    await queryInterface.addIndex('order', ['order_id'], {
      unique: true,
      name: 'uk_order_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};
