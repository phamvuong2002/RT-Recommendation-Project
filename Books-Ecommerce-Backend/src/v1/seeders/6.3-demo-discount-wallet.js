'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm dữ liệu vào bảng discount_wallet
    await queryInterface.bulkInsert('discount_wallet', [
      {
        dw_discount_id: 1,
        dw_user_id: 1,
        dw_user_status: 'active',
        dw_user_quatity: 2,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        dw_discount_id: 2,
        dw_user_id: 2,
        dw_user_status: 'active',
        dw_user_quatity: 3,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        dw_discount_id: 3,
        dw_user_id: 1,
        dw_user_status: 'active',
        dw_user_quatity: 1,
        create_time: new Date(),
        update_time: new Date()
      }
      // Thêm dữ liệu khác nếu cần
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa dữ liệu từ bảng discount_wallet
    await queryInterface.bulkDelete('discount_wallet', null, {});
  }
};
