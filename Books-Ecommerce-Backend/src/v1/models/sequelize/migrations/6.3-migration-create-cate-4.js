'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_4', {
      cate4_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'id'
      },
      cate4_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'id_string'
      },
      cate3_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'cate3_id',
        references: {
          model: 'category_3',
          key: 'cate3_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cate3_sid: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'cate3_sid',
        references: {
          model: 'category_3',
          key: 'cate3_sid'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cate4_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        comment: 'cate_name'
      },
      cate4_slug: {
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
    await queryInterface.addIndex('category_4', ['cate4_sid'], {
      unique: true,
      name: 'uk_cate4_sid'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category_4');
  }
};
