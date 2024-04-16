'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book', {
      book_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      book_title: {
        type: Sequelize.STRING,
        comment: 'book name'
      },
      book_categories: {
        type: Sequelize.JSON,
        comment: 'json categories'
      },
      book_authors: {
        type: Sequelize.JSON,
        comment: 'json authors'
      },
      book_publisherId: {
        type: Sequelize.INTEGER(11),
        comment: 'id publisher',
        references: {
          model: 'publisher',
          key: 'pub_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      book_supplierId: {
        type: Sequelize.INTEGER(11),
        comment: 'id supplier',
        references: {
          model: 'supplier',
          key: 'sup_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      book_layoutId: {
        type: Sequelize.INTEGER(11),
        comment: 'id layout',
        references: {
          model: 'layout',
          key: 'layout_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      book_img: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'book thumbnail'
      },
      book_avg_rating: {
        type: Sequelize.DECIMAL(3,1),
        defaultValue: 0.0,
        comment: 'avg rating'
      },
      book_num_rating: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        comment: 'number ratings'
      },
      book_spe_price: {
        type: Sequelize.DECIMAL(11,2),
        allowNull: false,
        comment: 'special price'
      },
      book_old_price: {
        type: Sequelize.DECIMAL(11,2),
        allowNull: false,
        comment: 'old price'
      },
      book_status: {
        type: Sequelize.TINYINT,
        comment: '0: out of stock, 1: in stock'
      },
      is_deleted: {
        type: Sequelize.TINYINT.UNSIGNED,
        defaultValue: 0,
        comment: '0: null, 1: deleted'
      },
      sort: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: 'priority sort'
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
    await queryInterface.dropTable('book');
  }
};
