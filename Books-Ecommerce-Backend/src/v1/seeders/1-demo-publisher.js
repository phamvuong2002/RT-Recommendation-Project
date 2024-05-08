'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('publisher', [
      {
        pub_sid: 'nxb-van-hoc',
        pub_name: 'NXB Văn Học',
        pub_img: '',
        pub_slug: 'nxb-van-hoc',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        pub_sid: 'nxb-dan-tri',
        pub_name: 'NXB Dân Trí',
        pub_img: '',
        pub_slug: 'nxb-dan-tri',
        create_time: new Date(),
        update_time: new Date(),
      },
      {
        pub_sid: 'nxb-dai-hoc-su-pham',
        pub_name: 'NXB Đại học sư phạm',
        pub_img: '',
        pub_slug: 'nxb-dai-hoc-su-pham',
        create_time: new Date(),
        update_time: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('publisher', null, {});
  }
};
