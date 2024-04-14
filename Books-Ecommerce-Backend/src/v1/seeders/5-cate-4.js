'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_4', [
      {
        cate4_sid: "truyen-doc-thieu-nhi",
        cate4_name: "Truyện Đọc Thiếu Nhi",
        cate4_slug: "truyen-doc-thieu-nhi",
        cate3_id: 1,
        cate3_sid: "truyen-thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cate4_sid: "bach-khoa-tri-thuc",
        cate4_name: "Bách Khoa Tri Thức",
        cate4_slug: "bach-khoa-tri-thuc",
        cate3_id: 2,
        cate3_sid: "kien-thuc-bach-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {
        cate4_sid: "tham-khao-lop-1",
        cate4_name: "Tham Khảo Lớp 1",
        cate4_slug: "tham-khao-lop-1",
        cate3_id: 3,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      }
      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_4', null, {});
  }
};
