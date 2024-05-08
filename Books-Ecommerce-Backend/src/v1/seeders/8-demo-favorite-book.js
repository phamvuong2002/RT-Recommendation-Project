'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('favorite_book', [
            {
                fav_id: 1,
                fav_userid: 1,
                create_time: new Date(),
                update_time: new Date()
            },
            {
                fav_id: 2,
                fav_userid: 2,
                create_time: new Date(),
                update_time: new Date()
            },
            // Thêm dữ liệu mẫu khác tùy ý
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('favorite_book', null, {});
    }
};
