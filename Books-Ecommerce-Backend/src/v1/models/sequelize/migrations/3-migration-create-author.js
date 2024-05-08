'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('author', {
      author_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
        comment: 'id'
      },
      author_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'name'
      },
      author_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'name'
      },
      author_img: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'image'
      },
      author_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: 'slug'
      },
      author_des: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
        comment: 'description'
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
    await queryInterface.addIndex('author', ['author_sid'], {
      unique: true,
      name: 'uk_author_sid'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('author');
  }
};
