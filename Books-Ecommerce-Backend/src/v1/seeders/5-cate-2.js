'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_2', [
      {
        cate2_sid: "thieu-nhi",
        cate2_name: "Thiếu Nhi",
        cate2_slug: "thieu-nhi",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cate2_sid: "giao-khoa-tham-khao",
        cate2_name: "Giáo khoa - Tham khảo",
        cate2_slug: "giao-khoa-tham-khao",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      }
      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_2', null, {});
  }
};
