'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discount', {
      discount_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      discount_supplierId: {
        type: Sequelize.INTEGER(11),
        comment: 'id supplier',
        references: {
          model: 'supplier',
          key: 'sup_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      discount_name: {
        allowNull:false,
        type: Sequelize.STRING,
        comment: 'discount name'
      },
      discount_des: {
        allowNull:false,
        type: Sequelize.TEXT,
        comment: 'description'
      },
      discount_type: {
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue: 'fixed_amount',
        comment: 'types: fixed_amount or percentage'
      },
      discount_value: {
        allowNull:false,
        type: Sequelize.DECIMAL(8,3),
        defaultValue: '0',//10.000, 10
        comment: 'values: 10.000vnd or 10%'
      },
      discount_code: {
        allowNull:false,
        type: Sequelize.STRING,
        comment: 'code'
      },
      discount_start_date: {
        allowNull:false,
        type: Sequelize.DATE,
        comment: 'start date'
      },
      discount_end_date: {
        allowNull:false,
        type: Sequelize.DATE,
        comment: 'end date'
      },
      discount_max_uses: {
        allowNull:false,
        type: Sequelize.INTEGER,
        comment: 'maximum quantity can use'
      },
      discount_count_used: {
        allowNull:false,
        type: Sequelize.INTEGER,
        comment: 'quantity used'
      },
      discount_max_uses_per_user: {
        allowNull:false,
        type: Sequelize.INTEGER,
        defaultValue:'1',
        comment: 'max discount code used per user'
      },
      discount_min_order_value: {
        allowNull:false,
        type: Sequelize.DECIMAL(8,3),
        defaultValue:'0',
        comment: 'min order value'
      },
      discount_is_active: {
        allowNull:false,
        type: Sequelize.BOOLEAN,
        comment: 'is discount active?'
      },
      discount_apply_to: {
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue: 'all',
        comment: 'all or specific'
      },
      discount_product_ids:{
        allowNull:false,
        type: Sequelize.JSON,
        defaultValue: JSON.stringify([]),
        comment: 'the books can be apply discount code'
      },
      create_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: 'created timestamp'
      },
      update_time: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        comment: 'updated timestamp'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('discount');
  }
};
