'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('layout', {
      layout_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
        comment: 'id'
      },
      layout_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'name'
      },
      layout_slug: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('layout');
  }
};
