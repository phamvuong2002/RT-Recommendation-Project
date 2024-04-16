'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_book', {
      cb_cart_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id cart',
        references: {
          model: 'cart',
          key: 'cart_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      cb_book_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id book',
        references: {
          model: 'book',
          key: 'book_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      cb_book_num:{
        type: Sequelize.INTEGER,
        comment: 'number of books'
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
    await queryInterface.addIndex('cart_book', ['cb_cart_id', 'cb_book_id'], {
      unique: true,
      name: 'uk_cart_book_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_book');
  }
};
