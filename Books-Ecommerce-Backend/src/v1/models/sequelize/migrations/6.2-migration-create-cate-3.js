'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_3', {
      cate3_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'id'
      },
      cate3_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'id_string'
      },
      cate2_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'cate2_id',
        references: {
          model: 'category_2',
          key: 'cate2_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cate2_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'cate2_sid',
        references: {
          model: 'category_2',
          key: 'cate2_sid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cate3_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'cate_name'
      },
      cate3_slug: {
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
    await queryInterface.addIndex('category_3', ['cate3_sid'], {
      unique: true,
      name: 'uk_cate3_sid'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category_3');
  }
};
