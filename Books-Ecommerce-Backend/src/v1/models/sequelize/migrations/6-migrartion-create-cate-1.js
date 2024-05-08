'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_1', {
      cate1_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'id'
      },
      cate1_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'id_string'
      },
      cate1_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'cate_name'
      },
      cate1_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: 'cate_slug'
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
    await queryInterface.addIndex('category_1', ['cate1_sid'], {
      unique: true,
      name: 'uk_cate1_sid'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category_1');
  }
};
