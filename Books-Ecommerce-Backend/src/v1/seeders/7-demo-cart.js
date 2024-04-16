'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cart', [
      {
        cart_status: 'active',
        cart_count_products: 2,
        cart_userid: 1,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cart_status: 'active',
        cart_count_products: 1,
        cart_userid: 2,
        create_time: new Date(),
        update_time: new Date()
      },
      // Thêm dữ liệu mẫu khác tùy ý
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cart', null, {});
  }
};
