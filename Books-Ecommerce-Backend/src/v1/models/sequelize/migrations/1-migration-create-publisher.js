'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('publisher', {
      pub_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
        comment: 'id'
      },
      pub_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'name'
      },
      pub_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'name'
      },
      pub_img: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'image'
      },
      pub_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: 'slug'
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
    await queryInterface.addIndex('publisher', ['pub_sid'], {
      unique: true,
      name: 'uk_pub_sid'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('publisher');
  }
};
