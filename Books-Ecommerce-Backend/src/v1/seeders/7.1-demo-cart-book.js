'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart_book', [
      {
        cb_cart_id: 1,
        cb_book_id: 1,
        cb_book_num: 4,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cb_cart_id: 1,
        cb_book_id: 2,
        cb_book_num: 10,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cb_cart_id: 2,
        cb_book_id: 3,
        cb_book_num: 1,
        create_time: new Date(),
        update_time: new Date()
      },
      // Thêm dữ liệu mẫu khác tùy ý
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart_book', null, {});
  }
};
