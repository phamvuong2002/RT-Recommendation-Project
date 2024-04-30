'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        user_sid: '6630a41666faa0310b92d563',
        user_username: 'Nguyễn Văn A',
        user_slug:'nguyen-van-a',
        user_password: 'matkhau123',
        user_salf: 'salf',
        user_email: 'nguyenvana@example.com',
        user_phone: '0987654321',
        user_sex: 'Nam',
        user_avatar: 'path/to/avatar.png',
        user_day_of_birth: new Date('01/01/1990'),
        user_status: 'active',
        create_time: new Date(),
        update_time: new Date()
      },
      {
        user_sid: '123a34',
        user_username: 'Trần Văn B',
       
        user_slug:'tran-van-b',
        user_password: 'mk123456',
        user_salf: 'salf2',
        user_email: 'tranvanb@example.com',
        user_phone: '0976543210',
        user_sex: 'Nữ',
        user_avatar: 'path/to/avatar2.png',
        user_day_of_birth: new Date('05/05/1995'),
        user_status: 'active',
        create_time: new Date(),
        update_time: new Date()
      },
      // Thêm dữ liệu mẫu khác tùy ý
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
