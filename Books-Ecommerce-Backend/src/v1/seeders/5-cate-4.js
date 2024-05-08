'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_4', [
      //[1,1]
      {//[1,1,1,1]
        cate4_sid: "truyen-doc-thieu-nhi",
        cate4_name: "Truyện Đọc Thiếu Nhi",
        cate4_slug: "truyen-doc-thieu-nhi",
        cate3_id: 1,
        cate3_sid: "truyen-thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,1,2]
        cate4_sid: "truyen-tranh-thieu-nhi",
        cate4_name: "Truyện tranh thiếu nhi",
        cate4_slug: "truyen-tranh-thieu-nhi",
        cate3_id: 1,
        cate3_sid: "truyen-thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,1,3]
        cate4_sid: "truyen-tranh-ehon-nhat-ban",
        cate4_name: "Truyện tranh Ehon Nhật Bản",
        cate4_slug: "truyen-tranh-ehon-nhat-ban",
        cate3_id: 1,
        cate3_sid: "truyen-thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },

      {//[1,1,2,1]
        cate4_sid: "bach-khoa-tri-thuc-cau-hoi-vi-sao",
        cate4_name: "Bách Khoa Tri Thức - Câu hỏi vì sao",
        cate4_slug: "bach-khoa-tri-thuc-cau-hoi-vi-sao",
        cate3_id: 2,
        cate3_sid: "kien-thuc-bach-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,2,2]
        cate4_sid: "kien-thuc-khoa-hoc-tu-nhien",
        cate4_name: "Kiến thức khoa học - Tự nhiên",
        cate4_slug: "kien-thuc-khoa-hoc-tu-nhien",
        cate3_id: 2,
        cate3_sid: "kien-thuc-bach-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,2,3]
        cate4_sid: "cau-chuyen-danh-nhan-noi-tieng-the-gioi",
        cate4_name: "Câu chuyện danh nhân nổi tiếng thế giới",
        cate4_slug: "cau-chuyen-danh-nhan-noi-tieng-the-gioi",
        cate3_id: 2,
        cate3_sid: "kien-thuc-bach-khoa",
        create_time: new Date(),
        update_time: new Date()
      },

      {////[1,1,3,1]
        cate4_sid: "sach-tranh-ky-nang-song-cho-tre",
        cate4_name: "Sách tranh kỹ năng sống cho trẻ",
        cate4_slug: "sach-tranh-ky-nang-song-cho-tre",
        cate3_id: 3,
        cate3_sid: "kien-thuc-ky-nang-song-cho-tre",
        create_time: new Date(),
        update_time: new Date()
      },
      {////[1,1,3,2]
        cate4_sid: "vua-hoc-vua-choi-voi-tre",
        cate4_name: "Vừa học vừa chơi với trẻ",
        cate4_slug: "vua-hoc-vua-choi-voi-tre",
        cate3_id: 3,
        cate3_sid: "kien-thuc-ky-nang-song-cho-tre",
        create_time: new Date(),
        update_time: new Date()
      },
      {////[1,1,3,3]
        cate4_sid: "sach-tranh-kien-thuc-song-cho-tre",
        cate4_name: "Sách tranh kiến thức sống cho trẻ",
        cate4_slug: "sach-tranh-kien-thuc-song-cho-tre",
        cate3_id: 3,
        cate3_sid: "kien-thuc-ky-nang-song-cho-tre",
        create_time: new Date(),
        update_time: new Date()
      },
      {////[1,1,3,4]
        cate4_sid: "hoi-dap-cau-do-tro-choi",
        cate4_name: "Hỏi đáp - Câu đố - Trò chơi",
        cate4_slug: "hoi-dap-cau-do-tro-choi",
        cate3_id: 3,
        cate3_sid: "kien-thuc-ky-nang-song-cho-tre",
        create_time: new Date(),
        update_time: new Date()
      },
      //[1,1,4,0] No submenu
      //[1,1,5,0] No submenu
      //[1,1,6,0] No submenu
      //[1,1,7,9] No submenu

      //[1,2]
      {//[1,2,1,1]
        cate4_sid: "tham-khao-lop-1",
        cate4_name: "Tham Khảo Lớp 1",
        cate4_slug: "tham-khao-lop-1",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,2]
        cate4_sid: "tham-khao-lop-2",
        cate4_name: "Tham Khảo Lớp 2",
        cate4_slug: "tham-khao-lop-2",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,3]
        cate4_sid: "tham-khao-lop-3",
        cate4_name: "Tham Khảo Lớp 3",
        cate4_slug: "tham-khao-lop-3",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,4]
        cate4_sid: "tham-khao-lop-4",
        cate4_name: "Tham Khảo Lớp 4",
        cate4_slug: "tham-khao-lop-4",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,5]
        cate4_sid: "tham-khao-lop-5",
        cate4_name: "Tham Khảo Lớp 5",
        cate4_slug: "tham-khao-lop-5",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,6]
        cate4_sid: "tham-khao-lop-6",
        cate4_name: "Tham Khảo Lớp 6",
        cate4_slug: "tham-khao-lop-6",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,7]
        cate4_sid: "tham-khao-lop-7",
        cate4_name: "Tham Khảo Lớp 7",
        cate4_slug: "tham-khao-lop-7",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,8]
        cate4_sid: "tham-khao-lop-8",
        cate4_name: "Tham Khảo Lớp 8",
        cate4_slug: "tham-khao-lop-8",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,9]
        cate4_sid: "tham-khao-lop-9",
        cate4_name: "Tham Khảo Lớp 9",
        cate4_slug: "tham-khao-lop-9",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,10]
        cate4_sid: "tham-khao-lop-10",
        cate4_name: "Tham Khảo Lớp 10",
        cate4_slug: "tham-khao-lop-10",
        cate3_id: 1,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,11]
        cate4_sid: "tham-khao-lop-11",
        cate4_name: "Tham Khảo Lớp 11",
        cate4_slug: "tham-khao-lop-11",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },
      {//[1,2,1,12]
        cate4_sid: "tham-khao-lop-12",
        cate4_name: "Tham Khảo Lớp 12",
        cate4_slug: "tham-khao-lop-12",
        cate3_id: 8,
        cate3_sid: "sach-tham-khao",
        create_time: new Date(),
        update_time: null
      },

      //[1,2,2,0] No submenu
      {//[1,2,3,1]
        cate4_sid: "giao-khoa-lop-1",
        cate4_name: "Giáo khoa lớp 1",
        cate4_slug: "giao-khoa-lop-1",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,2]
        cate4_sid: "giao-khoa-lop-2",
        cate4_name: "Giáo khoa lớp 2",
        cate4_slug: "giao-khoa-lop-2",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,3]
        cate4_sid: "giao-khoa-lop-3",
        cate4_name: "Giáo khoa lớp 3",
        cate4_slug: "giao-khoa-lop-3",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,4]
        cate4_sid: "giao-khoa-lop-4",
        cate4_name: "Giáo khoa lớp 4",
        cate4_slug: "giao-khoa-lop-4",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,5]
        cate4_sid: "giao-khoa-lop-5",
        cate4_name: "Giáo khoa lớp 5",
        cate4_slug: "giao-khoa-lop-5",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,6]
        cate4_sid: "giao-khoa-lop-6",
        cate4_name: "Giáo khoa lớp 6",
        cate4_slug: "giao-khoa-lop-6",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,7]
        cate4_sid: "giao-khoa-lop-7",
        cate4_name: "Giáo khoa lớp 7",
        cate4_slug: "giao-khoa-lop-7",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,8]
        cate4_sid: "giao-khoa-lop-8",
        cate4_name: "Giáo khoa lớp 8",
        cate4_slug: "giao-khoa-lop-8",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,9]
        cate4_sid: "giao-khoa-lop-9",
        cate4_name: "Giáo khoa lớp 9",
        cate4_slug: "giao-khoa-lop-9",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,10]
        cate4_sid: "giao-khoa-lop-10",
        cate4_name: "Giáo khoa lớp 10",
        cate4_slug: "giao-khoa-lop-10",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,11]
        cate4_sid: "giao-khoa-lop-11",
        cate4_name: "Giáo khoa lớp 11",
        cate4_slug: "giao-khoa-lop-11",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,12]
        cate4_sid: "giao-khoa-lop-12",
        cate4_name: "Giáo khoa lớp 12",
        cate4_slug: "giao-khoa-lop-12",
        cate3_id: 10,
        cate3_sid: "sach-giao-khoa",
        create_time: new Date(),
        update_time: new Date()
      },
      //[1,2,4,0] No submenu
      //[1,2,5,0] No submenu
      // Add more categories as needed

      //[1,3]
      //[1,3,x,0] (x: [1,19]) : No submenu

      //[1,4]
      //[1,4,x,0] (x: [1,5]) : No submenu

      //[1,5]
      {//[1,5,1,1]
        cate4_sid: "manga-khac",
        cate4_name: "Manga khác",
        cate4_slug: "manga-khac",
        cate3_id: 37,
        cate3_sid: "manga",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,5,1,2]
        cate4_sid: "series-manga",
        cate4_name: "Series manga",
        cate4_slug: "series-manga",
        cate3_id: 37,
        cate3_sid: "manga",
        create_time: new Date(),
        update_time: new Date()
      },

      {//[1,5,2,1]
        cate4_sid: "truyen-tranh-viet-nam",
        cate4_name: "Truyện tranh Việt Nam",
        cate4_slug: "truyen-tranh-viet-nam",
        cate3_id: 38,
        cate3_sid: "comic-truyen-tranh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,5,2,2]
        cate4_sid: "truyen-tranh-nuoc-ngoai",
        cate4_name: "Truyện tranh nước ngoài",
        cate4_slug: "truyen-tranh-nuoc-ngoai",
        cate3_id: 38,
        cate3_sid: "comic-truyen-tranh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,5,2,3]
        cate4_sid: "comic",
        cate4_name: "Comic",
        cate4_slug: "comic",
        cate3_id: 38,
        cate3_sid: "comic-truyen-tranh",
        create_time: new Date(),
        update_time: new Date()
      },

      //[1,6]
      {//[1,6,1,1]
        cate4_sid: "ngu-phap",
        cate4_name: "Ngữ pháp",
        cate4_slug: "ngu-phap",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,2]
        cate4_sid: "tieng-anh-thieu-nhi",
        cate4_name: "Tiếng anh thiếu nhi",
        cate4_slug: "tieng-anh-thieu-nhi",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,3]
        cate4_sid: "luyen-thi-ielts",
        cate4_name: "Luyện thi IELTS",
        cate4_slug: "luyen-thi-ielts",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,4]
        cate4_sid: "luyen-thi-toeic",
        cate4_name: "Luyện thi TOEIC",
        cate4_slug: "luyen-thi-toeic",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,5]
        cate4_sid: "dam-thoai-giao-tiep",
        cate4_name: "Đàm thoại -Giao tiếp",
        cate4_slug: "dam-thoai-giao-tiep",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,6]
        cate4_sid: "tu-vung",
        cate4_name: "Từ vựng",
        cate4_slug: "tu-vung",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,7]
        cate4_sid: "luyen-thi-toefl",
        cate4_name: "Luyện thi TOEFL",
        cate4_slug: "luyen-thi-toefl",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,8]
        cate4_sid: "flashcard-the-hoc-tieng-anh",
        cate4_name: "Flashcard - Thẻ học tiếng anh",
        cate4_slug: "flashcard-the-hoc-tieng-anh",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,9]
        cate4_sid: "luyen-thi-chung-chi-ABC",
        cate4_name: "Luyện thi chứng chỉ A,B,C",
        cate4_slug: "luyen-thi-chung-chi-ABC",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,1,10]
        cate4_sid: "luyen-nghe",
        cate4_name: "Luyện nghe",
        cate4_slug: "luyen-nghe",
        cate3_id: 39,
        cate3_sid: "tieng-anh",
        create_time: new Date(),
        update_time: new Date()
      },

      //[1,6,x,0] (x:[2,9]) No submenu
      //[1,7,x,0] (x:[1,9]) No submenu
      //[1,8,x,0] (x:[1,11]) No submenu
      //[1,9,x,0] (x:[1,3]) No submenu
      //[1,10,x,0] (x:[1,6]) No submenu
      //[1,11,x,0] (x:[1,5]) No submenu
      // còn lại không có submenu
    
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_4', null, {});
  }
};
