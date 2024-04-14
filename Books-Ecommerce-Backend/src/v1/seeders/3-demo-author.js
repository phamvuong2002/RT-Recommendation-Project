'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('author', [
      {
        author_sid: 'antoine-de-saint-exupery',
        author_name: 'Antoine de Saint-Exupéry	',
        author_img: '', // Thêm đường dẫn đến hình ảnh của tác giả nếu có
        author_des: '',
        author_slug: 'antoine-de-saint-exupery',
        create_time: new Date(),
        update_time: null
      },
      {
        author_sid: 'dk',
        author_name: 'DK',
        author_img: '', // Thêm đường dẫn đến hình ảnh của tác giả nếu có
        author_des: '',
        author_slug: 'dk',
        create_time: new Date(),
        update_time: null
      },
      {
        author_sid: 'le-tue-minh',
        author_name: 'Lê Tuệ Minh',
        author_img: '', // Thêm đường dẫn đến hình ảnh của tác giả nếu có
        author_des: '',
        author_slug: 'le-tue-minh',
        create_time: new Date(),
        update_time: null
      },
      {
        author_sid: 'le-thu-ngoc',
        author_name: 'Lê Thu Ngọc',
        author_img: '', // Thêm đường dẫn đến hình ảnh của tác giả nếu có
        author_des: '',
        author_slug: 'le-thu-ngoc',
        create_time: new Date(),
        update_time: null
      },
      // Thêm các bản ghi mới khác nếu cần
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    // Đảm bảo xóa bảng book trước khi xóa bảng author để tránh lỗi foreign key constraint
    await queryInterface.bulkDelete('author', null, {});
  }
};
