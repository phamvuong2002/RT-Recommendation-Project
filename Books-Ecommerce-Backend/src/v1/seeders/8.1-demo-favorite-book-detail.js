'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('favorite_book_detail', [
            {
                fb_fav_id: 1,
                fb_book_id: 1,
                create_time: new Date(),
                update_time: new Date()
            },
            {
                fb_fav_id: 1,
                fb_book_id: 3,
                create_time: new Date(),
                update_time: new Date()
            },
            {
                fb_fav_id: 2,
                fb_book_id: 1,
                create_time: new Date(),
                update_time: new Date()
            },
            {
                fb_fav_id: 2,
                fb_book_id: 2,
                create_time: new Date(),
                update_time: new Date()
            },
            // Thêm dữ liệu mẫu khác tùy ý
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('favorite_book_detail', null, {});
    }
};
