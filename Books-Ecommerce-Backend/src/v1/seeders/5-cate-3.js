'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_3', [
      {
        cate3_sid: "truyen-thieu-nhi",
        cate3_name: "Truyện Thiếu Nhi",
        cate3_slug: "truyen-thieu-nhi",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cate3_sid: "kien-thuc-bach-khoa",
        cate3_name: "Kiến thức bách khoa",
        cate3_slug: "kien-thuc-bach-khoa",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cate3_sid: "sach-tham-khao",
        cate3_name: "Sách Tham Khảo",
        cate3_slug: "sach-tham-khao",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_3', null, {});
  }
};
