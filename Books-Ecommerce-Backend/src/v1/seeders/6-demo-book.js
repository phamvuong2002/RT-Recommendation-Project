'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book', [
      {
        book_title: "Hoàng Tử Bé (Song Ngữ Việt-Anh)",
        book_categories: JSON.stringify([1, 1, 1, 1]),
        book_authors: JSON.stringify([1]),
        book_publisherId: 1,
        book_supplierId: 1,
        book_layoutId: 1,
        book_img: "https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_6_6.jpg",
        book_avg_rating: 0,
        book_num_rating: 0,
        book_spe_price: 55300,
        book_old_price: 79000,
        book_status: 1,
        is_deleted: 0,
        sort: 0
      },
      {
        book_title: "Bách Khoa Cho Trẻ Em - Bách Khoa Vũ Trụ",
        book_categories: JSON.stringify([1, 1, 2, 2]),
        book_authors: JSON.stringify([2]),
        book_publisherId: 2, 
        book_supplierId: 2,
        book_layoutId: 2, 
        book_img: "https://cdn0.fahasa.com/media/catalog/product/z/3/z3464650008231_6d8dfb6cae98446b17c84271b53edc38.jpg",
        book_avg_rating: 0,
        book_num_rating: 0,
        book_spe_price: 129600,
        book_old_price: 180000,
        book_status: 1,
        is_deleted: 0,
        sort: 0
      },
      {
        book_title: "Tập Tô Chữ Mẫu Giáo - Tủ Sách Bé Vào Lớp 1",
        book_categories: JSON.stringify([1, 2, 3, 3]),
        book_authors: JSON.stringify([3,4]),
        book_publisherId: 3,
        book_supplierId: 3,
        book_layoutId: 1, 
        book_img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29257.jpg",
        book_avg_rating: 0,
        book_num_rating: 0,
        book_spe_price: 6700,
        book_old_price: 10000,
        book_status: 1,
        is_deleted: 0,
        sort: 0
      },
      {
        book_title: "Tự Rèn Kỹ Năng Đọc Hiểu Cho Học Sinh Tiểu Học - Tập 1",
        book_categories: JSON.stringify([1, 2, 3, 3]),
        book_authors: JSON.stringify([5]),
        book_publisherId: 2,
        book_supplierId: 3,
        book_layoutId: 1,
        book_img: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_237615.jpg",
        book_avg_rating: 0,
        book_num_rating: 0,
        book_spe_price: 100620,
        book_old_price: 129000,
        book_status: 1,
        is_deleted: 0,
        sort: 0
      },
      // Add more books as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('book', null, {});
  }
};
