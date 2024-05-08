'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('layout', [
      {
        layout_name: 'Bìa mềm',
        layout_slug: 'bia-mem',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        layout_name: 'Bìa Cứng',
        layout_slug: 'bia-cung',
        create_time: new Date(),
        update_time: new Date(),
      },
      // Thêm các dòng dữ liệu khác nếu cần
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('layout', null, {});
  }
};
