'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_1', [
      {//1
        cate1_sid: "sach-tieng-viet",
        cate1_name: "Sách tiếng Việt",
        cate1_slug: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//2
        cate1_sid: "foreign-books",
        cate1_name: "Foreign books",
        cate1_slug: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },

      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_1', null, {});
  }
};
