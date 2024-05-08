'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('favorite_book_detail', {
            fb_fav_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                comment: 'id favorite_book_detail',
                references: {
                    model: 'favorite_book',
                    key: 'fav_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                primaryKey: true,
            },
            fb_book_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                comment: 'id book',
                references: {
                    model: 'book',
                    key: 'book_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                primaryKey: true,
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
        await queryInterface.addIndex('favorite_book_detail', ['fb_fav_id', 'fb_book_id'], {
            unique: true,
            name: 'uk_favorite_book_detail_id'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('favorite_book_detail');
    }
};
