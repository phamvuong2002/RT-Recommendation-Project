'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction', {
      tran_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      tran_sid: {
        type: Sequelize.STRING,
        comment: 'string id',
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tran_order_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'order_id',
        references: {
          model: 'order',
          key: 'order_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tran_user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'user_id',
        references: {
          model: 'user',
          key: 'user_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tran_status:{
        type: Sequelize.STRING,
        comment: 'status of transaction',
      },
      tran_total:{
        type: Sequelize.DECIMAL(11,2),
        comment: 'status of transaction',
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
    await queryInterface.addIndex('transaction', ['tran_id', 'tran_sid'], {
      unique: true,
      name: 'uk_transaction_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction');
  }
};
