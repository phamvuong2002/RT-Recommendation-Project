'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_2', {
      cate2_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'id'
      },
      cate2_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'id_string'
      },
      cate2_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'cate_name'
      },
      cate2_slug: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        comment: 'cate_slug'
      },
      cate1_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'cate1_id',
        references: {
          model: 'category_1',
          key: 'cate1_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cate1_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'cate1_sid',
        references: {
          model: 'category_1',
          key: 'cate1_sid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.addIndex('category_2', ['cate2_sid'], {
      unique: true,
      name: 'uk_cate2_sid'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category_2');
  }
};
