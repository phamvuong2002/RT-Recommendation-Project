'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book_detail', [
      {
        book_id: 1,
        book_categories_name: 'Sách tiếng Việt, Thiếu nhi, Truyện Thiếu Nhi, Truyện Đọc Thiếu Nhi',
        book_pulisherName: 'NXB Văn Học',
        book_supplier: 'Công ty TNHH Sách Hà Giang',
        book_authors_name: 'Antoine de Saint-Exupéry',
        book_publish_year: '2023',
        book_layout: 'Bìa Mềm',
        book_avg_rating: 0,
        book_num_ratings: 0,
        book_num_pages: 200,
        book_size: '20.5 x 14 x 1 cm',
        book_des: `Hoàng tử bé được xuất bản lần đầu năm 1943 của nhà văn, phi công người Pháp Antoine de Saint-exupéry là một trong những cuốn tiểu thuyết kinh điển nổi tiếng nhất mọi thời đại. Câu chuyện ngắn gọn về cuộc gặp gỡ diệu kỳ giữa viên phi công bị rơi máy bay và Hoàng tử bé giữa sa mạc Sa-ha-ra hoang vu. Hành tinh quê hương và các mối quan hệ của hoàng tử bé dần hé lộ: Tình bạn, tình yêu thương của Hoàng tử bé dành cho bông hồng duy nhất, tình cảm sâu sắc dành cho chú cáo. ... (Nội dung mô tả sách)`,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        book_id: 2,
        book_categories_name: 'Sách tiếng Việt, Thiếu nhi, Kiến thức bách khoa, Bách Khoa Tri Thức',
        book_pulisherName: ' NXB Dân Trí ',
        book_supplier: 'Đông A',
        book_authors_name: 'DK',
        book_publish_year: '2022',
        book_layout: 'Bìa Cứng',
        book_avg_rating: 0,
        book_num_ratings: 0,
        book_num_pages: 128,
        book_size: '29 x 20.5 x 1.1 cm',
        book_des: `Bách Khoa Cho Trẻ Em - Bách Khoa Vũ Trụ
        Ban đêm, nếu ngước nhìn trời, em sẽ thấy vô vàn ngôi sao lấp lánh. Thế nhưng chúng chỉ là một phần rất nhỏ của vũ trụ bao la, rộng lớn. Vậy em có bao giờ băn khoăn trong vũ trụ kia có những gì chưa? Bách khoa vũ trụ sẽ đưa em vào cuộc du hành thám hiểm không gian rất lí thú đấy.
        `,
        create_time: new Date(),
        update_time: new Date()
      },
      {
        book_id: 3,
        book_categories_name: 'Sách tiếng Việt, Giáo khoa - Tham khảo,	Sách Tham Khảo,	Tham Khảo Lớp 1',
        book_pulisherName: 'NXB Đại học sư phạm',
        book_supplier: 'Minh Long',
        book_authors_name: 'Lê Tuệ Minh, Lê Thu Ngọc',
        book_publish_year: '2023',
        book_layout: 'Bìa Mềm',
        book_avg_rating: 0,
        book_num_ratings: 0,
        book_num_pages: 24,
        book_size: '17 x 24 cm',
        book_des:'Con bạn sắp vào lớp 1? Không chỉ bé hồi hộp mà chính bạn – những bậc làm cha mẹ cũng có tâm trạng đó. Làm sao để chuẩn bị cho bé thật tốt? Làm thế nào để bé không bỡ ngỡ khi bước vào một giai đoạn hoàn toàn mới này? Bộ sách Chuẩn bị cho bé vào lớp 1 sẽ giúp cha mẹ giải tỏa những lo lắng, băn khoăn đó. Nội dung sách gần gũi với chương trình sách giáo khoa chuẩn, bao gồm:  giúp bé luyện tay theo các nét cơ bản đầu tiên; như móc, sổ, ngang, sọc, xước, vòng, giúp bé làm quen với bảng chữ cái gồm 29 chữ theo cách viết thường và viết hoa;  ngoài ra, bé còn được làm quen với các con số và những phép tính đơn giản v.v…',
        create_time: new Date(),
        update_time: new Date()
      },
      {
        book_id: 4,
        book_categories_name: 'Sách tiếng Việt, Giáo khoa - Tham khảo,	Sách Tham Khảo,	Tham Khảo Lớp 1',
        book_pulisherName: 'NXB Dân Trí',
        book_supplier: 'Alpha Books',
        book_authors_name: 'Hannah Braun',
        book_publish_year: '2021',
        book_layout: 'Bìa Mềm',
        book_avg_rating: 0,
        book_num_ratings: 0,
        book_num_pages: 144,
        book_size: '24 x 17.5 cm',
        book_des:'Tự rèn kỹ năng đọc hiểu cho học sinh tiểu học 1-2-3 là bộ 3 cuốn sách tập hợp những bài đọc tiếng Anh đi kèm với các hoạt động tương tác giúp trẻ hiểu nội dung bài đọc, đồng thời xây dựng và phát triển các kỹ năng đọc hiểu với nhiều thể loại văn bản khác nhau.',
        create_time: new Date(),
        update_time: new Date()
      },
      // Thêm các bản ghi sách khác nếu cần
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('book_detail', null, {});
  }
};
