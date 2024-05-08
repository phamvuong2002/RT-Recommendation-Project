'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('supplier', [
      {
        sup_sid: 'cong-ty-tnhh-sach-ha-giang',
        sup_name: 'Công ty TNHH Sách Hà Giang',
        sup_img: 'https://cdn0.fahasa.com/media/catalog/product/b/i/bia-1_6_6.jpg',
        sup_slug: 'cong-ty-tnhh-sach-ha-giang',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        sup_sid: 'dong-a',
        sup_name: 'Đông A',
        sup_img: 'https://cdn0.fahasa.com/media/catalog/product/z/3/z3464650008231_6d8dfb6cae98446b17c84271b53edc38.jpg',
        sup_slug: 'dong-a',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        sup_sid: 'minh-long',
        sup_name: 'Minh Long',
        sup_img: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_29257.jpg',
        sup_slug: 'minh-long',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        sup_sid: 'alpha-books',
        sup_name: 'Alpha Books',
        sup_img: '',
        sup_slug: 'alpha-books',
        create_time: new Date(),
        update_time: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('supplier', null, {});
  }
};
