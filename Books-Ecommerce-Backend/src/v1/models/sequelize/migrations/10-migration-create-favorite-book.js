'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('favorite_book', {
            favbook_userid: {
                type: Sequelize.BIGINT.UNSIGNED,
                comment: 'id user',
                references: {
                    model: 'user',
                    key: 'user_id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                primaryKey: true,
            },
            favbook_bookid: {
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
        await queryInterface.addIndex('favorite_book', ['favbook_userid', 'favbook_bookid'], {
            unique: true,
            name: 'uk_favorite_book_id'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('favorite_book');
    }
};
