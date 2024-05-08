'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supplier', {
      sup_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
        comment: 'id'
      },
      sup_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'name'
      },
      sup_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'name'
      },
      sup_img: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'image'
      },
      sup_slug: {
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
    await queryInterface.addIndex('supplier', ['sup_id'], {
      unique: true,
      name: 'uk_sup_sid'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('supplier');
  }
};
