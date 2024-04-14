'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book_detail', {
      book_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        comment: 'id'
      },
      book_categories_name: {
        type: Sequelize.STRING,
        comment: 'json categories name'
      },
      book_pulisherName: {
        type: Sequelize.STRING,
        comment: 'id shop'
      },
      book_supplier: {
        type: Sequelize.STRING,
        comment: 'supplier name'
      },
      book_authors_name: {
        type: Sequelize.STRING,
        comment: 'authors name'
      },
      book_publish_year: {
        type: Sequelize.STRING,
        comment: 'publish year'
      },
      book_layout: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'layout'
      },
      book_avg_rating: {
        type: Sequelize.DECIMAL(3,1),
        defaultValue: 4.5,
        comment: 'avg rating'
      },
      book_num_ratings: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        comment: 'number of ratings'
      },
      book_num_pages: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        comment: 'number of pages'
      },
      book_size: {
        type: Sequelize.STRING,
        comment: 'book size'
      },
      book_des: {
        type: Sequelize.TEXT,
        defaultValue: '',
        comment: 'description'
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
    await queryInterface.dropTable('book_detail');
  }
};
