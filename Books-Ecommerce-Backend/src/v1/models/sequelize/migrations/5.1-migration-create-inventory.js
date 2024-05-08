'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      inven_book_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      inven_supplierId: {
        type: Sequelize.INTEGER(11),
        comment: 'id supplier',
        references: {
          model: 'supplier',
          key: 'sup_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      inven_location: {
        type: Sequelize.STRING,
        defaultValue: 'unknown',
        comment: 'location'
      },
      inven_stock: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        comment: 'stock'
      },
      inven_reservations: {
        type: Sequelize.JSON,
        defaultValue: {},
        comment: 'reservations'
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
    await queryInterface.addIndex('inventory', ['inven_book_id', 'inven_supplierId'], {
      unique: true,
      name: 'uk_inven_sid'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventory');
  }
};
