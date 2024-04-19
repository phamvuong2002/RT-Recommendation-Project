'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_3', [
      // cate2: 1
      {//[1,1,1,0]
        cate3_sid: "truyen-thieu-nhi",
        cate3_name: "Truyện Thiếu Nhi",
        cate3_slug: "truyen-thieu-nhi",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,2,0]
        cate3_sid: "kien-thuc-bach-khoa",
        cate3_name: "Kiến thức bách khoa",
        cate3_slug: "kien-thuc-bach-khoa",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,3,0]
        cate3_sid: "kien-thuc-ky-nang-song-cho-tre",
        cate3_name: "Kiến thức - Kỹ năng sống cho trẻ",
        cate3_slug: "kien-thuc-ky-nang-song-cho-tre",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,4,0]
        cate3_sid: "to-mau-luyen-chu",
        cate3_name: "Tô màu, luyện chữ",
        cate3_slug: "to-mau-luyen-chu",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,5,0]
        cate3_sid: "tu-dien-thieu-nhi",
        cate3_name: "Từ điển thiếu nhi",
        cate3_slug: "tu-dien-thieu-nhi",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,6,0]
        cate3_sid: "flashcard-the-hoc-thong-minh",
        cate3_name: "Flashcard - Thẻ học thông minh",
        cate3_slug: "flashcard-the-hoc-thong-minh",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,1,7,0]
        cate3_sid: "sach-noi",
        cate3_name: "Sách nói",
        cate3_slug: "sach-noi",
        cate2_id: 1,
        cate2_sid: "thieu-nhi",
        create_time: new Date(),
        update_time: new Date()
      },

      //cate2: 2
      {//[1,2,1,0]
        cate3_sid: "sach-tham-khao",
        cate3_name: "Sách Tham Khảo",
        cate3_slug: "sach-tham-khao",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,2,0]
        cate3_sid: "mau-giao",
        cate3_name: "Mẫu giáo",
        cate3_slug: "mau-giao",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,3,0]
        cate3_sid: "sach-giao-khoa",
        cate3_name: "Sách giáo khoa",
        cate3_slug: "sach-giao-khoa",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,4,0]
        cate3_sid: "sach-giao-vien",
        cate3_name: "Sách giáo viên",
        cate3_slug: "sach-giao-vien",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,2,5,0]
        cate3_sid: "dai-hoc",
        cate3_name: "Đại học",
        cate3_slug: "dai-hoc",
        cate2_id: 2,
        cate2_sid: "giao-khoa-tham-khao",
        create_time: new Date(),
        update_time: new Date()
      },
      //cate2: 3
      {//[1,3,1,0]
        cate3_sid: "tieu-thuyet",
        cate3_name: "Tiểu thuyết",
        cate3_slug: "tieu-thuyet",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,2,0]
        cate3_sid: "truyen-ngan-tan-van",
        cate3_name: "Truyện ngắn - Tản văn",
        cate3_slug: "truyen-ngan-tan-van",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,3,0]
        cate3_sid: "light-novel",
        cate3_name: "Light Novel",
        cate3_slug: "light-novel",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,4,0]
        cate3_sid: "truyen-trinh-tham-kiem-hiep",
        cate3_name: "Truyện trinh thám - Kiếm hiệp",
        cate3_slug: "truyen-trinh-tham-kiem-hiep",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,5,0]
        cate3_sid: "huyen-bi-gia-tuong-kinh-di",
        cate3_name: "Huyền bí - Giả tưởng - Kinh dị",
        cate3_slug: "huyen-bi-gia-tuong-kinh-di",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,6,0]
        cate3_sid: "tac-pham-kinh-dien",
        cate3_name: "Tác phẩm kinh điển",
        cate3_slug: "tac-pham-kinh-dien",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,7,0]
        cate3_sid: "ngon-tinh",
        cate3_name: "Ngôn tình",
        cate3_slug: "ngon-tinh",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,8,0]
        cate3_sid: "phong-su-ky-su-phe-binh-van-hoc",
        cate3_name: "Phóng sự - Ký sự - Phê bình văn học",
        cate3_slug: "phong-su-ky-su-phe-binh-van-hoc",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,9,0]
        cate3_sid: "tho-ca-tuc-ngu-ca-dao-thanh-ngu",
        cate3_name: "Thơ ca, tục ngữ, ca dao, thành ngữ",
        cate3_slug: "tho-ca-tuc-ngu-ca-dao-thanh-ngu",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,10,0]
        cate3_sid: "du-ky",
        cate3_name: "Du ký",
        cate3_slug: "du-ky",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,11,0]
        cate3_sid: "tac-gia-tac-pham",
        cate3_name: "Tác giả - Tác phẩm",
        cate3_slug: "tac-gia-tac-pham",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,12,0]
        cate3_sid: "12-cung-hoang-dao",
        cate3_name: "12 Cung hoàng đạo",
        cate3_slug: "12-cung-hoang-dao",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,13,0]
        cate3_sid: "sach-to-mau-danh-cho-nguoi-lon",
        cate3_name: "Sách tô màu dành cho người lớn",
        cate3_slug: "sach-to-mau-danh-cho-nguoi-lon",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,14,0]
        cate3_sid: "tuoi-teen",
        cate3_name: "Tuổi teen",
        cate3_slug: "tuoi-teen",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,15,0]
        cate3_sid: "hai-huoc-truyen-cuoi",
        cate3_name: "Hài hước - Truyện cười",
        cate3_slug: "hai-huoc-truyen-cuoi",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,16,0]
        cate3_sid: "sach-anh",
        cate3_name: "Sách ảnh",
        cate3_slug: "sach-anh",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,17,0]
        cate3_sid: "combo-van-hoc",
        cate3_name: "Combo văn học",
        cate3_slug: "combo-van-hoc",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,18,0]
        cate3_sid: "truyen-tranh",
        cate3_name: "Truyện tranh",
        cate3_slug: "truyen-tranh",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,3,19,0]
        cate3_sid: "the-loai-khac",
        cate3_name: "Thể loại khác",
        cate3_slug: "the-loai-khac",
        cate2_id: 3,
        cate2_sid: "van-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      //4
      {//[1,4,1,0]
        cate3_sid: "ky-nang-song",
        cate3_name: "Kỹ năng sống",
        cate3_slug: "ky-nang-song",
        cate2_id: 4,
        cate2_sid: "tam-ly-ky-nang-song",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,4,2,0]
        cate3_sid: "tam-ly",
        cate3_name: "Tâm lý",
        cate3_slug: "tam-ly",
        cate2_id: 4,
        cate2_sid: "tam-ly-ky-nang-song",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,4,3,0]
        cate3_sid: "sach-cho-tuoi-moi-lon",
        cate3_name: "Sách cho tuổi mới lớn",
        cate3_slug: "sach-cho-tuoi-moi-lon",
        cate2_id: 4,
        cate2_sid: "tam-ly-ky-nang-song",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,4,4,0]
        cate3_sid: "chicken-soup-hat-giong-tam-hon",
        cate3_name: "Chicken Soup - Hạt giống tâm hồn",
        cate3_slug: "chicken-soup-hat-giong-tam-hon",
        cate2_id: 4,
        cate2_sid: "tam-ly-ky-nang-song",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,4,5,0]
        cate3_sid: "ren-luyen-nhan-cach",
        cate3_name: "Rèn luyện nhân cách",
        cate3_slug: "ren-luyen-nhan-cach",
        cate2_id: 4,
        cate2_sid: "tam-ly-ky-nang-song",
        create_time: new Date(),
        update_time: new Date()
      },
      //5
      {//[1,5,1,0]
        cate3_sid: "manga",
        cate3_name: "Manga",
        cate3_slug: "manga",
        cate2_id: 5,
        cate2_sid: "manga-comic",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,5,2,0]
        cate3_sid: "comic-truyen-tranh",
        cate3_name: "Comic - Truyện tranh",
        cate3_slug: "comic-truyen-tranh",
        cate2_id: 5,
        cate2_sid: "manga-comic",
        create_time: new Date(),
        update_time: new Date()
      },

      //6
      {//[1,6,1,0]
        cate3_sid: "tieng-anh",
        cate3_name: "Tiếng Anh",
        cate3_slug: "tieng-anh",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,2,0]
        cate3_sid: "tieng-hoa",
        cate3_name: "Tiếng Hoa",
        cate3_slug: "tieng-hoa",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,3,0]
        cate3_sid: "tieng-nhat",
        cate3_name: "Tiếng Nhật",
        cate3_slug: "tieng-nhat",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,4,0]
        cate3_sid: "tieng-han",
        cate3_name: "Tiếng Hàn",
        cate3_slug: "tieng-han",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,5,0]
        cate3_sid: "tieng-viet-cho-nguoi-nuoc-ngoai",
        cate3_name: "Tiếng Việt cho người nước ngoài",
        cate3_slug: "tieng-viet-cho-nguoi-nuoc-ngoai",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,6,0]
        cate3_sid: "tieng-phap",
        cate3_name: "Tiếng Pháp",
        cate3_slug: "tieng-phap",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,7,0]
        cate3_sid: "ngoai-ngu-khac",
        cate3_name: "Ngoại ngữ khác",
        cate3_slug: "ngoai-ngu-khac",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,8,0]
        cate3_sid: "tieng-duc",
        cate3_name: "Tiếng Đức",
        cate3_slug: "tieng-duc",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6,9,0]
        cate3_sid: "flashcard",
        cate3_name: "Flashcard",
        cate3_slug: "flashcard",
        cate2_id: 6,
        cate2_sid: "sach-hoc-ngoai-ngu",
        create_time: new Date(),
        update_time: new Date()
      },

      //7
      {//[1,7,1,0]
        cate3_sid: "quan-tri-lanh-dao",
        cate3_name: "Quản trị - Lãnh đạo",
        cate3_slug: "quan-tri-lanh-dao",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,2,0]
        cate3_sid: "nhan-vat-bai-hoc-kinh-doanh",
        cate3_name: "Nhân vật - Bài học kinh doanh",
        cate3_slug: "nhan-vat-bai-hoc-kinh-doanh",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,3,0]
        cate3_sid: "marketing-ban-hang",
        cate3_name: "Marketing - Bán hàng",
        cate3_slug: "marketing-ban-hang",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,4,0]
        cate3_sid: "khoi-nghiep-lam-giau",
        cate3_name: "Khởi nghiệp - Làm giàu",
        cate3_slug: "khoi-nghiep-lam-giau",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,5,0]
        cate3_sid: "phan-tich-kinh-te",
        cate3_name: "Phân tích kinh tế",
        cate3_slug: "phan-tich-kinh-te",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,6,0]
        cate3_sid: "chung-khoan-bat-dong-san-dau-tu",
        cate3_name: "Chứng khoán - Bất động sản - Đầu tư",
        cate3_slug: "chung-khoan-bat-dong-san-dau-tu",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,7,0]
        cate3_sid: "tai-chinh-ngan-hang",
        cate3_name: "Tài chính - Ngân hàng",
        cate3_slug: "tai-chinh-ngan-hang",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,8,0]
        cate3_sid: "nhan-su-viec-lam",
        cate3_name: "Nhân sự - Việc làm",
        cate3_slug: "nhan-su-viec-lam",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7,9,0]
        cate3_sid: "ke-toan-kiem-toan-thue",
        cate3_name: "Kế toán - Kiểm toán - Thuế",
        cate3_slug: "ke-toan-kiem-toan-thue",
        cate2_id: 7,
        cate2_sid: "kinh-te",
        create_time: new Date(),
        update_time: new Date()
      },

      //8
      {//[1,8,1,0]
        cate3_sid: "y-hoc",
        cate3_name: "Y học",
        cate3_slug: "y-hoc",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,2,0]
        cate3_sid: "khoa-hoc-khac",
        cate3_name: "Khoa học khác",
        cate3_slug: "khoa-hoc-khac",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,3,0]
        cate3_sid: "tin-hoc",
        cate3_name: "Tin học",
        cate3_slug: "tin-hoc",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,4,0]
        cate3_sid: "nong-lam-ngu-nghiep",
        cate3_name: "Nông, Lâm, Ngư nghiệp",
        cate3_slug: "nong-lam-ngu-nghiep",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,5,0]
        cate3_sid: "giao-duc",
        cate3_name: "Giáo dục",
        cate3_slug: "giao-duc",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,6,0]
        cate3_sid: "khoa-hoc-vu-tru",
        cate3_name: "Khoa học vũ trụ",
        cate3_slug: "khoa-hoc-vu-tru",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,7,0]
        cate3_sid: "thiet-ke-kien-truc-xay-dung",
        cate3_name: "Thiết kế - Kiến trúc - Xây dựng",
        cate3_slug: "thiet-ke-kien-truc-xay-dung",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,8,0]
        cate3_sid: "toan-hoc",
        cate3_name: "Toán học",
        cate3_slug: "toan-hoc",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,9,0]
        cate3_sid: "dien-dien-tu",
        cate3_name: "Điện, Điện tử",
        cate3_slug: "dien-dien-tu",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,10,0]
        cate3_sid: "co-khi",
        cate3_name: "Cơ khí",
        cate3_slug: "co-khi",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8,11,0]
        cate3_sid: "moi-truong-khoang-san-hoa-chat",
        cate3_name: "Môi trường, Khoáng sản, Hóa chất",
        cate3_slug: "moi-truong-khoang-san-hoa-chat",
        cate2_id: 8,
        cate2_sid: "khoa-hoc-ky-thuat",
        create_time: new Date(),
        update_time: new Date()
      },

      //9 
      {//[1,9,1,0]
        cate3_sid: "lich-su",
        cate3_name: "Lịch sử",
        cate3_slug: "lich-su",
        cate2_id: 9,
        cate2_sid: "lich-su-dia-ly-ton-giao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,9,2,0]
        cate3_sid: "ton-giao",
        cate3_name: "Tôn giáo",
        cate3_slug: "ton-giao",
        cate2_id: 9,
        cate2_sid: "lich-su-dia-ly-ton-giao",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,9,3,0]
        cate3_sid: "dia-ly",
        cate3_name: "Địa lý",
        cate3_slug: "dia-ly",
        cate2_id: 9,
        cate2_sid: "lich-su-dia-ly-ton-giao",
        create_time: new Date(),
        update_time: new Date()
      },

      //10
      {//[1,10,1,0]
        cate3_sid: "cam-nang-lam-cha-me",
        cate3_name: "Cẩm nang làm cha mẹ",
        cate3_slug: "cam-nang-lam-cha-me",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10,2,0]
        cate3_sid: "phat-trien-ky-nang-tri-tue-cho-tre",
        cate3_name: "Phát triển kỹ năng - Trí tuệ cho trẻ",
        cate3_slug: "phat-trien-ky-nang-tri-tue-cho-tre",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10,3,0]
        cate3_sid: "phuong-phap-giao-duc-tre-cac-nuoc",
        cate3_name: "Phương pháp giáo dục trẻ các nước",
        cate3_slug: "phuong-phap-giao-duc-tre-cac-nuoc",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10,4,0]
        cate3_sid: "dinh-duong-suc-khoe-cho-tre",
        cate3_name: "Dinh dưỡng - Sức khỏe cho trẻ",
        cate3_slug: "dinh-duong-suc-khoe-cho-tre",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10,5,0]
        cate3_sid: "giao-duc-tre-tuoi-teen",
        cate3_name: "Giáo dục trẻ tuổi teen",
        cate3_slug: "giao-duc-tre-tuoi-teen",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10,6,0]
        cate3_sid: "danh-cho-me-bau",
        cate3_name: "Dành cho mẹ bầu",
        cate3_slug: "danh-cho-me-bau",
        cate2_id: 10,
        cate2_sid: "nuoi-day-con",
        create_time: new Date(),
        update_time: new Date()
      },


      //11
      {//[1,11,1,0]
        cate3_sid: "triet-hoc-ly-luan-chinh-tri",
        cate3_name: "Triết học - Lý luận chính trị",
        cate3_slug: "triet-hoc-ly-luan-chinh-tri",
        cate2_id: 11,
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,11,2,0]
        cate3_sid: "luat-van-ban-duoi-luat",
        cate3_name: "Luật - Văn bản dưới luật",
        cate3_slug: "luat-van-ban-duoi-luat",
        cate2_id: 11,
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,11,3,0]
        cate3_sid: "nhan-vat-va-su-kien",
        cate3_name: "Nhân vật và sự kiện",
        cate3_slug: "nhan-vat-va-su-kien",
        cate2_id: 11,
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,11,4,0]
        cate3_sid: "doi-doan-dang",
        cate3_name: "Đội - Đoàn - Đảng",
        cate3_slug: "doi-doan-dang",
        cate2_id: 11,
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,11,5,0]
        cate3_sid: "van-kien",
        cate3_name: "Văn kiện",
        cate3_slug: "van-kien",
        cate2_id: 11,
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        create_time: new Date(),
        update_time: new Date()
      },

      //12
      {//[1,12,1,0]
        cate3_sid: "cau-chuyen-cuoc-doi",
        cate3_name: "Câu chuyện cuộc đời",
        cate3_slug: "cau-chuyen-cuoc-doi",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12,2,0]
        cate3_sid: "lich-su-tieu-su",
        cate3_name: "Lịch sử",
        cate3_slug: "lich-su-tieu-su",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12,3,0]
        cate3_sid: "nghe-thuat-giai-tri",
        cate3_name: "Nghệ thuật - Giải trí",
        cate3_slug: "nghe-thuat-giai-tri",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12,4,0]
        cate3_sid: "chinh-tri",
        cate3_name: "Chính trị",
        cate3_slug: "chinh-tri",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12,5,0]
        cate3_sid: "kinh-te-tieu-su",
        cate3_name: "Kinh tế",
        cate3_slug: "kinh-te-tieu-su",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12,6,0]
        cate3_sid: "the-thao",
        cate3_name: "Thể thao",
        cate3_slug: "the-thao",
        cate2_id: 12,
        cate2_sid: "tieu-su-hoi-ky",
        create_time: new Date(),
        update_time: new Date()
      },

      //13 NO SUBMENU

      //14
      {//[1,14,1,0]
        cate3_sid: "nau-an",
        cate3_name: "Nấu ăn",
        cate3_slug: "nau-an",
        cate2_id: 14,
        cate2_sid: "nu-cong-gia-chanh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,14,2,0]
        cate3_sid: "kheo-tay",
        cate3_name: "Khéo tay",
        cate3_slug: "kheo-tay",
        cate2_id: 14,
        cate2_sid: "nu-cong-gia-chanh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,14,3,0]
        cate3_sid: "lam-dep",
        cate3_name: "Làm đẹp",
        cate3_slug: "lam-dep",
        cate2_id: 14,
        cate2_sid: "nu-cong-gia-chanh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,14,4,0]
        cate3_sid: "mon-an-bai-thuoc",
        cate3_name: "Món ăn bài thuốc",
        cate3_slug: "mon-an-bai-thuoc",
        cate2_id: 14,
        cate2_sid: "nu-cong-gia-chanh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,14,5,0]
        cate3_sid: "meo-vat-cam-nang",
        cate3_name: "Mẹo vặt - Cẩm nang",
        cate3_slug: "meo-vat-cam-nang",
        cate2_id: 14,
        cate2_sid: "nu-cong-gia-chanh",
        create_time: new Date(),
        update_time: new Date()
      },

      //15 NO SUBMENU
      //16 NO SUBMENU

      //17
      {//[1,17,1,0]
        cate3_sid: "tu-dien-tieng-anh-anh-anh-viet-viet-anh",
        cate3_name: "Từ điển Tiếng Anh-Anh, Anh-Việt, Việt-Anh",
        cate3_slug: "tu-dien-tieng-anh-anh-anh-viet-viet-anh",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,2,0]
        cate3_sid: "tu-dien-tieng-viet",
        cate3_name: "Từ điển Tiếng Việt",
        cate3_slug: "tu-dien-tieng-viet",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,3,0]
        cate3_sid: "tu-dien-tieng-nhat-viet-viet-nhat",
        cate3_name: "Từ điển Tiếng NHật-Việt, Việt-Nhật",
        cate3_slug: "tu-dien-tieng-nhat-viet-viet-nhat",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,4,0]
        cate3_sid: "tu-dien-han-viet",
        cate3_name: "Từ điển Hán Việt",
        cate3_slug: "tu-dien-han-viet",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,5,0]
        cate3_sid: "tu-dien-tieng-han-viet-viet-han",
        cate3_name: "Từ điển Tiếng Hàn-Việt, Việt-Hàn",
        cate3_slug: "tu-dien-tieng-han-viet-viet-han",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,6,0]
        cate3_sid: "tu-dien-chuyen-nganh",
        cate3_name: "Từ điển chuyên ngành",
        cate3_slug: "tu-dien-chuyen-nganh",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,7,0]
        cate3_sid: "tu-dien-khac",
        cate3_name: "Từ điển khác",
        cate3_slug: "tu-dien-khac",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,8,0]
        cate3_sid: "tu-dien-tieng-phap-viet-viet-phap",
        cate3_name: "Từ điển Tiếng Pháp-Việt, Việt-Pháp",
        cate3_slug: "tu-dien-tieng-phap-viet-viet-phap",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17,9,0]
        cate3_sid: "tu-dien-tieng-phap-duc-viet-viet-duc",
        cate3_name: "Từ điển Tiếng Đức-Việt, Việt-Đức",
        cate3_slug: "tu-dien-tieng-phap-duc-viet-viet-duc",
        cate2_id: 17,
        cate2_sid: "tu-dien",
        create_time: new Date(),
        update_time: new Date()
      },

      //18 NO SUBMENU

      //19 
      {//[1,19,1,0]
        cate3_sid: "am-nhac",
        cate3_name: "Âm nhạc",
        cate3_slug: "am-nhac",
        cate2_id: 19,
        cate2_sid: "am-nhac-my-thuat-thoi-trang",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,19,2,0]
        cate3_sid: "my-thuat",
        cate3_name: "Mỹ thuật",
        cate3_slug: "my-thuat",
        cate2_id: 19,
        cate2_sid: "am-nhac-my-thuat-thoi-trang",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,19,3,0]
        cate3_sid: "thoi-trang",
        cate3_name: "Thời trang",
        cate3_slug: "thoi-trang",
        cate2_id: 19,
        cate2_sid: "am-nhac-my-thuat-thoi-trang",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,19,4,0]
        cate3_sid: "thu-cong-tao-hinh",
        cate3_name: "Thủ công tạo hình",
        cate3_slug: "thu-cong-tao-hinh",
        cate2_id: 19,
        cate2_sid: "am-nhac-my-thuat-thoi-trang",
        create_time: new Date(),
        update_time: new Date()
      },

      //20 No submenu
      //21
      {//[1,21,1,0]
        cate3_sid: "giao-trinh-dh-cd-thcn",
        cate3_name: "Giáo trình ĐH, CĐ, THCN",
        cate3_slug: "giao-trinh-dh-cd-thcn",
        cate2_id: 21,
        cate2_sid: "giao-trinh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,21,2,0]
        cate3_sid: "the-loai-khac-gt",
        cate3_name: "Thể loại khác",
        cate3_slug: "the-loai-khac-gt",
        cate2_id: 21,
        cate2_sid: "giao-trinh",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,21,3,0]
        cate3_sid: "day-nghe",
        cate3_name: "Dạy nghề",
        cate3_slug: "day-nghe",
        cate2_id: 21,
        cate2_sid: "giao-trinh",
        create_time: new Date(),
        update_time: new Date()
      },

      //22, 23 No submenu

      //2
      {//[2,1,1,0]
        cate3_sid: "picture-and-activity-books",
        cate3_name: "Picture and activity books",
        cate3_slug: "picture-and-activity-books",
        cate2_id: 1,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,24,2,0]
        cate3_sid: "fiction-for-teen",
        cate3_name: "Fiction for teen",
        cate3_slug: "fiction-for-teen",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,3,0]
        cate3_sid: "non-fiction",
        cate3_name: "Non fiction",
        cate3_slug: "non-fiction",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,4,0]
        cate3_sid: "education",
        cate3_name: "Education",
        cate3_slug: "education",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,5,0]
        cate3_sid: "society-and-social-issues",
        cate3_name: "Society and social issues",
        cate3_slug: "society-and-social-issues",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,6,0]
        cate3_sid: "reference",
        cate3_name: "Reference",
        cate3_slug: "reference",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,7,0]
        cate3_sid: "annuals-anthologies-poetry",
        cate3_name: "Annuals, Anthologies and poetry",
        cate3_slug: "annuals-anthologies-poetry",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,1,8,0]
        cate3_sid: "children's stationery",
        cate3_name: "children's stationery",
        cate3_slug: "children's stationery",
        cate2_id: 24,
        cate2_sid: "childrens-books",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,25]
      {//[2,25,1,0]
        cate3_sid: "elt-learning-material-and-coursework",
        cate3_name: "Elt: Learning material and coursework",
        cate3_slug: "elt-learning-material-and-coursework",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,2,0]
        cate3_sid: "language-teaching-and-learning-other-than-elt",
        cate3_name: "Language teaching and learning (other than ELT)",
        cate3_slug: "language-teaching-and-learning-other-than-elt",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,3,0]
        cate3_sid: "thesauri",
        cate3_name: "Thesauri",
        cate3_slug: "thesauri",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,4,0]
        cate3_sid: "elt-background-and-reference-material",
        cate3_name: "ELT background and Reference material",
        cate3_slug: "elt-background-and-reference-material",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,5,0]
        cate3_sid: "elt-english-for-specific-purposes",
        cate3_name: "Elt English for specific purposes",
        cate3_slug: "elt-english-for-specific-purposes",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,6,0]
        cate3_sid: "dictionaries",
        cate3_name: "Dictionaries",
        cate3_slug: "dictionaries",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,7,0]
        cate3_sid: "linguistics",
        cate3_name: "Linguistics",
        cate3_slug: "linguistics",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,8,0]
        cate3_sid: "language-reference-and-general",
        cate3_name: "Language: Reference and general",
        cate3_slug: "language-reference-and-general",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,9,0]
        cate3_sid: "usage-and-grammar-guides",
        cate3_name: "Usage and grammar guides",
        cate3_slug: "usage-and-grammar-guides",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,10,0]
        cate3_sid: "public-speaking-guides",
        cate3_name: "Public speaking guides",
        cate3_slug: "public-speaking-guides",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,2,11,0]
        cate3_sid: "language-phrasebooks",
        cate3_name: "Language phrasebooks",
        cate3_slug: "language-phrasebooks",
        cate2_id: 25,
        cate2_sid: "dictionaries-and-languages",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,3]
      {//[2,3,1,0]
        cate3_sid: "japanese-books",
        cate3_name: "Japanese books",
        cate3_slug: "japanese-books",
        cate2_id: 26,
        cate2_sid: "other-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,3,2,0]
        cate3_sid: "german-books",
        cate3_name: "German books",
        cate3_slug: "german-books",
        cate2_id: 26,
        cate2_sid: "other-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,3,3,0]
        cate3_sid: "french-books",
        cate3_name: "French books",
        cate3_slug: "french-books",
        cate2_id: 26,
        cate2_sid: "other-languages",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,3,4,0]
        cate3_sid: "korean-books",
        cate3_name: "Korean books",
        cate3_slug: "korean-books",
        cate2_id: 26,
        cate2_sid: "other-languages",
        create_time: new Date(),
        update_time: new Date()
      },

      //4
      {//[2,4,1,0]
        cate3_sid: "graphic-novels-anime-and-manga",
        cate3_name: "Graphic novels, anime and manga",
        cate3_slug: "graphic-novels-anime-and-manga",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,2,0]
        cate3_sid: "romance",
        cate3_name: "Romance",
        cate3_slug: "romance",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,3,0]
        cate3_sid: "fantasy",
        cate3_name: "Fantasy",
        cate3_slug: "fantasy",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,4,0]
        cate3_sid: "thirllers",
        cate3_name: "Thirllers",
        cate3_slug: "thirllers",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,5,0]
        cate3_sid: "contemporary-fiction",
        cate3_name: "Contemporary fiction",
        cate3_slug: "contemporary-fiction",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,6,0]
        cate3_sid: "classics",
        cate3_name: "Classics",
        cate3_slug: "classics",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,7,0]
        cate3_sid: "science-fiction",
        cate3_name: "Science fiction",
        cate3_slug: "science-fiction",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,8,0]
        cate3_sid: "historical-fiction",
        cate3_name: "Historical fiction",
        cate3_slug: "historical-fiction",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,9,0]
        cate3_sid: "crime",
        cate3_name: "Crime",
        cate3_slug: "crime",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,10,0]
        cate3_sid: "horror",
        cate3_name: "Horror",
        cate3_slug: "horror",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,11,0]
        cate3_sid: "adventure",
        cate3_name: "Adventure",
        cate3_slug: "adventure",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,12,0]
        cate3_sid: "fiction-special-feature",
        cate3_name: "Fiction special feature",
        cate3_slug: "fiction-special-feature",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,13,0]
        cate3_sid: "religious-and-spiritual-fiction",
        cate3_name: "Religious and spiritual fiction",
        cate3_slug: "religious-and-spiritual-fiction",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,14,0]
        cate3_sid: " myth-and-legend-told-as-fiction",
        cate3_name: " Myth and legend told as fiction",
        cate3_slug: " myth-and-legend-told-as-fiction",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,4,15,0]
        cate3_sid: "sagas",
        cate3_name: "Sagas",
        cate3_slug: "sagas",
        cate2_id: 27,
        cate2_sid: "fiction",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,5]
      {//[2,5,1,0]
        cate3_sid: "business-and-management",
        cate3_name: "business-and-management",
        cate3_slug: "business-and-management",
        cate2_id: 28,
        cate2_sid: "business-finance-and-management",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,5,2,0]
        cate3_sid: "economics",
        cate3_name: "Economics",
        cate3_slug: "economics",
        cate2_id: 28,
        cate2_sid: "business-finance-and-management",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,5,3,0]
        cate3_sid: "industry-and-industrial-studies",
        cate3_name: "Industry and industrial studies",
        cate3_slug: "industry-and-industrial-studies",
        cate2_id: 28,
        cate2_sid: "business-finance-and-management",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,5,4,0]
        cate3_sid: "finance-and-accounting",
        cate3_name: "Finance and accounting",
        cate3_slug: "finance-and-accounting",
        cate2_id: 28,
        cate2_sid: "business-finance-and-management",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,5,5,0]
        cate3_sid: "law",
        cate3_name: "Law",
        cate3_slug: "law",
        cate2_id: 28,
        cate2_sid: "business-finance-and-management",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,6]
      {//[2,6,1,0]
        cate3_sid: "business-finance-and-management",
        cate3_name: "business-finance-and-management",
        cate3_slug: "business-finance-and-management",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,1,0]
        cate3_sid: "popular-psychology",
        cate3_name: "Popular psychology",
        cate3_slug: "popular-psychology",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,2,0]
        cate3_sid: "advice-on-careers-and-achieving-sucess",
        cate3_name: "Advice on careers and achieving sucess",
        cate3_slug: "advice-on-careers-and-achieving-sucess",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,3,0]
        cate3_sid: "personal-finance",
        cate3_name: "Personal finance",
        cate3_slug: "personal-finance",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,4,0]
        cate3_sid: "adult-literacy-guides-and-handbooks",
        cate3_name: "Adult literacy guides and handbooks",
        cate3_slug: "adult-literacy-guides-and-handbooks",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,5,0]
        cate3_sid: "advice-on-education",
        cate3_name: "Advice on education",
        cate3_slug: "advice-on-education",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,6,0]
        cate3_sid: "retirement",
        cate3_name: "Retirement",
        cate3_slug: "retirement",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,7,0]
        cate3_sid: "self-sufficiency",
        cate3_name: "Self-sufficiency",
        cate3_slug: "self-sufficiency",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,6,8,0]
        cate3_sid: "consumer-advice",
        cate3_name: "Consumer advice",
        cate3_slug: "consumer-advice",
        cate2_id: 29,
        cate2_sid: "personal-development",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,7]
      {//[2,7,1,0]
        cate3_sid: "biography-general",
        cate3_name: "Biography: General",
        cate3_slug: "biography-general",
        cate2_id: 30,
        cate2_sid: "biography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,7,2,0]
        cate3_sid: "memoirs",
        cate3_name: "Memoirs",
        cate3_slug: "memoirs",
        cate2_id: 30,
        cate2_sid: "biography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,7,3,0]
        cate3_sid: "true-stories",
        cate3_name: "True stories",
        cate3_slug: "true-stories",
        cate2_id: 30,
        cate2_sid: "biography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,7,4,0]
        cate3_sid: "diaries-letter-and-journals",
        cate3_name: "Diaries letter and journals",
        cate3_slug: "diaries-letter-and-journals",
        cate2_id: 30,
        cate2_sid: "biography",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,8]
      {//[2,8,1,0]
        cate3_sid: "higher-and-further-education-tertiary-education",
        cate3_name: "Higher and further education tertiary education",
        cate3_slug: "higher-and-further-education-tertiary-education",
        cate2_id: 31,
        cate2_sid: "education-and-reference",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,8,2,0]
        cate3_sid: "schools",
        cate3_name: "Schools",
        cate3_slug: "schools",
        cate2_id: 31,
        cate2_sid: "education-and-reference",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,8,3,0]
        cate3_sid: "foreign-languages",
        cate3_name: "Foreign languages",
        cate3_slug: "foreign-languages",
        cate2_id: 31,
        cate2_sid: "education-and-reference",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,8,4,0]
        cate3_sid: "teaching-resources-and-education",
        cate3_name: "Teaching resources and education",
        cate3_slug: "teaching-resources-and-education",
        cate2_id: 31,
        cate2_sid: "education-and-reference",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,9]
      {//[2,9,1,0]
        cate3_sid: "philosophy",
        cate3_name: "Philosophy",
        cate3_slug: "philosophy",
        cate2_id: 32,
        cate2_sid: "society-and-social-sciences",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,9,2,0]
        cate3_sid: "economics-society",
        cate3_name: "Economics",
        cate3_slug: "economics-society",
        cate2_id: 32,
        cate2_sid: "society-and-social-sciences",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,9,3,0]
        cate3_sid: "interdisciplinary-studies",
        cate3_name: "Interdisciplinary studies",
        cate3_slug: "interdisciplinary-studies",
        cate2_id: 32,
        cate2_sid: "society-and-social-sciences",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,10]
      {//[2,10,1,0]
        cate3_sid: "mind-body-spirit-thought-and-practice",
        cate3_name: "Mind body spirit: Thought and practice",
        cate3_slug: "mind-body-spirit-thought-and-practice",
        cate2_id: 33,
        cate2_sid: "mind-body-and-spirit",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,10,2,0]
        cate3_sid: "mind-body-spirit-mediation-and-visualization",
        cate3_name: "Mind body spirit mediation and visualization",
        cate3_slug: "mind-body-spirit-mediation-and-visualization",
        cate2_id: 33,
        cate2_sid: "mind-body-and-spirit",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,10,3,0]
        cate3_sid: "complementary-therapies-healing-health",
        cate3_name: "Complementary Therapies, Healing & health",
        cate3_slug: "complementary-therapies-healing-health",
        cate2_id: 33,
        cate2_sid: "mind-body-and-spirit",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,10,4,0]
        cate3_sid: "psychic-powers-psychic-phenomena",
        cate3_name: "Psychic powers psychic phenomena",
        cate3_slug: "psychic-powers-psychic-phenomena",
        cate2_id: 33,
        cate2_sid: "mind-body-and-spirit",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,10,5,0]
        cate3_sid: "dreams-and-their-interpretation",
        cate3_name: "Dreams & their interpretation",
        cate3_slug: "dreams-and-their-interpretation",
        cate2_id: 33,
        cate2_sid: "mind-body-and-spirit",
        create_time: new Date(),
        update_time: new Date()
      },

      //
      {//[2,11,1,0]
        cate3_sid: "hobbies-and-games",
        cate3_name: "Hobbies and games",
        cate3_slug: "hobbies-and-games",
        cate2_id: 34,
        cate2_sid: "crafts-and-hobbies",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,11,2,0]
        cate3_sid: "book-paper-crafts",
        cate3_name: "Book paper crafts",
        cate3_slug: "book-paper-crafts",
        cate2_id: 34,
        cate2_sid: "crafts-and-hobbies",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,11,3,0]
        cate3_sid: "toys-making-decorating",
        cate3_name: "Toys: Making & decorating",
        cate3_slug: "toys-making-decorating",
        cate2_id: 34,
        cate2_sid: "crafts-and-hobbies",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,11,4,0]
        cate3_sid: "needlework-and-fabric-crafts",
        cate3_name: "Needlework and fabric crafts",
        cate3_slug: "needlework-and-fabric-crafts",
        cate2_id: 34,
        cate2_sid: "crafts-and-hobbies",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,11,5,0]
        cate3_sid: "painting-art-manuals",
        cate3_name: "Painting art manuals",
        cate3_slug: "painting-art-manuals",
        cate2_id: 34,
        cate2_sid: "crafts-and-hobbies",
        create_time: new Date(),
        update_time: new Date()
      },

      ////[2,12]
      {//[2,12,1,0]
        cate3_sid: "coping-with-personal-problems",
        cate3_name: "Coping with personal problems",
        cate3_slug: "coping-with-personal-problems",
        cate2_id: 35,
        cate2_sid: "health",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,12,2,0]
        cate3_sid: "advice-on-parenting",
        cate3_name: "Advice on parenting",
        cate3_slug: "advice-on-parenting",
        cate2_id: 35,
        cate2_sid: "health",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,12,3,0]
        cate3_sid: "fitness-diet",
        cate3_name: "Fitness & diet",
        cate3_slug: "fitness-diet",
        cate2_id: 35,
        cate2_sid: "health",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,12,4,0]
        cate3_sid: "family-relationships",
        cate3_name: "Family & relationships",
        cate3_slug: "family-relationships",
        cate2_id: 35,
        cate2_sid: "health",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,12,5,0]
        cate3_sid: "popular-medicine-health",
        cate3_name: "Popular medicine & health",
        cate3_slug: "popular-medicine-health",
        cate2_id: 35,
        cate2_sid: "health",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,13]
      {//[2,13,1,0]
        cate3_sid: "national-regional-cuisine",
        cate3_name: "National & Regional cuisine",
        cate3_slug: "national-regional-cuisine",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,2,0]
        cate3_sid: "beverages",
        cate3_name: "Beverages",
        cate3_slug: "beverages",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,3,0]
        cate3_sid: "health-and-wholefood-cookery",
        cate3_name: "Health & wholefood cookery",
        cate3_slug: "health-and-wholefood-cookery",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,4,0]
        cate3_sid: "cookery-dishes-and-courses",
        cate3_name: "Cookery dishes and courses",
        cate3_slug: "cookery-dishes-and-courses",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,5,0]
        cate3_sid: "cookery-by-ingredient",
        cate3_name: "Cookery by ingredient",
        cate3_slug: "cookery-by-ingredient",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,6,0]
        cate3_sid: "quick-and-easy-cooking",
        cate3_name: "Quick and easy cooking",
        cate3_slug: "quick-and-easy-cooking",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,7,0]
        cate3_sid: "general-cookery",
        cate3_name: "General cookery",
        cate3_slug: "general-cookery",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,8,0]
        cate3_sid: "preserving-and-freezing",
        cate3_name: "Preserving and freezing",
        cate3_slug: "preserving-and-freezing",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,9,0]
        cate3_sid: "cooking-for-with-children",
        cate3_name: "Cooking for with children",
        cate3_slug: "cooking-for-with-children",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,13,10,0]
        cate3_sid: "celebrity-chefs",
        cate3_name: "Celebrity chefs",
        cate3_slug: "celebrity-chefs",
        cate2_id: 36,
        cate2_sid: "food-and-drink",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,14]
      {//[2,14,1,0]
        cate3_sid: "biology-life-sciences",
        cate3_name: "Biology, Life sciences",
        cate3_slug: "biology-life-sciences",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,2,0]
        cate3_sid: "science-general-issues",
        cate3_name: "Science: general issues",
        cate3_slug: "science-general-issues",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,3,0]
        cate3_sid: "earth-sciences-geography-enviroment-planning",
        cate3_name: "Earth sciences, geography, enviroment, planning",
        cate3_slug: "earth-sciences-geography-enviroment-planning",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,4,0]
        cate3_sid: "mathematics",
        cate3_name: "Mathematics",
        cate3_slug: "mathematics",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,5,0]
        cate3_sid: "chemistry",
        cate3_name: "Chemistry",
        cate3_slug: "chemistry",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,6,0]
        cate3_sid: "astronomy-space-time",
        cate3_name: "Astronomy, Space & time",
        cate3_slug: "astronomy-space-time",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,14,7,0]
        cate3_sid: "physics",
        cate3_name: "Physics",
        cate3_slug: "physics",
        cate2_id: 37,
        cate2_sid: "science-and-geography",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,15]
      {//[2,15,1,0]
        cate3_sid: "poetry",
        cate3_name: "Poetry",
        cate3_slug: "poetry",
        cate2_id: 38,
        cate2_sid: "poetry-and-drama",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,15,2,0]
        cate3_sid: "plays-playscripts",
        cate3_name: "Plays, playscripts",
        cate3_slug: "plays-playscripts",
        cate2_id: 38,
        cate2_sid: "poetry-and-drama",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,15,3,0]
        cate3_sid: "literature-history-criticism",
        cate3_name: "Literature: History & criticism",
        cate3_slug: "literature-history-criticism",
        cate2_id: 38,
        cate2_sid: "poetry-and-drama",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,16]
      {//[2,16,1,0]
        cate3_sid: "buddhism",
        cate3_name: "Buddhism",
        cate3_slug: "buddhism",
        cate2_id: 39,
        cate2_sid: "religion",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,16,2,0]
        cate3_sid: "christianity",
        cate3_name: "Christianity",
        cate3_slug: "christianity",
        cate2_id: 39,
        cate2_sid: "religion",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,16,3,0]
        cate3_sid: "other-non-christian-religion",
        cate3_name: "Other non-christian religion",
        cate3_slug: "other-non-christian-religion",
        cate2_id: 39,
        cate2_sid: "religion",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,16,4,0]
        cate3_sid: "alternative-belief-systems",
        cate3_name: "Alternative belief systems",
        cate3_slug: "alternative-belief-systems",
        cate2_id: 39,
        cate2_sid: "religion",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,17]
      {//[2,17,1,0]
        cate3_sid: "religional-and-national-history",
        cate3_name: "Religional and national history",
        cate3_slug: "religional-and-national-history",
        cate2_id: 40,
        cate2_sid: "history-and-archaeology",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,17,2,0]
        cate3_sid: "history-earliest-times-to-present-day",
        cate3_name: "History: Earliest times to present day",
        cate3_slug: "history-earliest-times-to-present-day",
        cate2_id: 40,
        cate2_sid: "history-and-archaeology",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,17,3,0]
        cate3_sid: "general-world-history",
        cate3_name: "General & world history",
        cate3_slug: "general-world-history",
        cate2_id: 40,
        cate2_sid: "history-and-archaeology",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,17,4,0]
        cate3_sid: "history-specific-events-topics",
        cate3_name: "History: Specific events & topics",
        cate3_slug: "history-specific-events-topics",
        cate2_id: 40,
        cate2_sid: "history-and-archaeology",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,18]
      {//[2,18,1,0]
        cate3_sid: "photography",
        cate3_name: "Photography",
        cate3_slug: "photography",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,18,2,0]
        cate3_sid: "entertainment",
        cate3_name: "Entertainment",
        cate3_slug: "entertainment",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,18,3,0]
        cate3_sid: "architecture",
        cate3_name: "Architecture",
        cate3_slug: "architecture",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,18,4,0]
        cate3_sid: "industrial-commercial-art-design",
        cate3_name: "Industrial - Commercial art & design",
        cate3_slug: "industrial-commercial-art-design",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,18,5,0]
        cate3_sid: "music",
        cate3_name: "Music",
        cate3_slug: "music",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,18,6,0]
        cate3_sid: "art-forms",
        cate3_name: "Art forms",
        cate3_slug: "art-forms",
        cate2_id: 41,
        cate2_sid: "art-and-photography",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,19]
      {//[2,19,1,0]
        cate3_sid: "electronics-communications-engineering",
        cate3_name: "Electronics & communications & engineering",
        cate3_slug: "electronics-communications-engineering",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,2,0]
        cate3_sid: "technology-general-issues",
        cate3_name: "Technology: general issues",
        cate3_slug: "technology-general-issues",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,3,0]
        cate3_sid: "enviromental-science-engineering-technology",
        cate3_name: "Enviromental science, engineering & technology",
        cate3_slug: "enviromental-science-engineering-technology",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,4,0]
        cate3_sid: "transport-technology-trades",
        cate3_name: "Transport technology & trades",
        cate3_slug: "transport-technology-trades",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,5,0]
        cate3_sid: "industrial-chemistry-manufacturing-technologies",
        cate3_name: "Industrial chemistry & manufacturing technologies",
        cate3_slug: "industrial-chemistry-manufacturing-technologies",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,6,0]
        cate3_sid: "energy-technology-engineering",
        cate3_name: "Energy technology & engineering",
        cate3_slug: "energy-technology-engineering",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,19,7,0]
        cate3_sid: "other-technologies-applied-sciences",
        cate3_name: "Other technologies & applied sciences",
        cate3_slug: "other-technologies-applied-sciences",
        cate2_id: 42,
        cate2_sid: "technology-and-engineering",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,20]
      {//[2,20,1,0]
        cate3_sid: "graphic-novels-manga",
        cate3_name: "Graphic Novels: Manga",
        cate3_slug: "graphic-novels-manga",
        cate2_id: 43,
        cate2_sid: "graphic-novels-anime-and-manga",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,20,2,0]
        cate3_sid: "graphic-novels-literary-memoirs",
        cate3_name: "Graphic Novels: Literary-memoirs",
        cate3_slug: "graphic-novels-literary-memoirs",
        cate2_id: 43,
        cate2_sid: "graphic-novels-anime-and-manga",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,20,3,0]
        cate3_sid: "graphic-novels-superheroes",
        cate3_name: "Graphic Novels: Superheroes",
        cate3_slug: "graphic-novels-superheroes",
        cate2_id: 43,
        cate2_sid: "graphic-novels-anime-and-manga",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,20,4,0]
        cate3_sid: "graphic-novels-true-stories-non-fiction",
        cate3_name: "Graphic Novels: True stories non-fiction",
        cate3_slug: "graphic-novels-true-stories-non-fiction",
        cate2_id: 43,
        cate2_sid: "graphic-novels-anime-and-manga",
        create_time: new Date(),
        update_time: new Date()
      },

      {//[2,21,4,0]
        cate3_sid: "adult-contemporary-romance",
        cate3_name: "Adult & contemporary romance",
        cate3_slug: "adult-contemporary-romance",
        cate2_id: 44,
        cate2_sid: "romance",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,22]
      {//[2,22,1,0]
        cate3_sid: "digital-lifestyle",
        cate3_name: "Digital lifestyle",
        cate3_slug: "digital-lifestyle",
        cate2_id: 45,
        cate2_sid: "computing",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,22,2,0]
        cate3_sid: "database",
        cate3_name: "Database",
        cate3_slug: "database",
        cate2_id: 45,
        cate2_sid: "computing",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,22,3,0]
        cate3_sid: "computer-science",
        cate3_name: "Computer science",
        cate3_slug: "computer-science",
        cate2_id: 45,
        cate2_sid: "computing",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,22,4,0]
        cate3_sid: "computing-general",
        cate3_name: "Computing general",
        cate3_slug: "computing-general",
        cate2_id: 45,
        cate2_sid: "computing",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,22,5,0]
        cate3_sid: "computer-programming-software-development",
        cate3_name: "Computer programming- software development",
        cate3_slug: "computer-programming-software-development",
        cate2_id: 45,
        cate2_sid: "computing",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,23]
      {//[2,23,1,0]
        cate3_sid: "style-guides",
        cate3_name: "Style guides",
        cate3_slug: "style-guides",
        cate2_id: 46,
        cate2_sid: "home-and-garden",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,23,2,0]
        cate3_sid: "antiques-collectables",
        cate3_name: "Antiques & collectables",
        cate3_slug: "antiques-collectables",
        cate2_id: 46,
        cate2_sid: "home-and-garden",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,23,3,0]
        cate3_sid: "gardening",
        cate3_name: "Gardening",
        cate3_slug: "gardening",
        cate2_id: 46,
        cate2_sid: "home-and-garden",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,24]
      {//[2,24,1,0]
        cate3_sid: "films-cinema",
        cate3_name: "Films, cinema",
        cate3_slug: "films-cinema",
        cate2_id: 47,
        cate2_sid: "entertaiment",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,25]
      {//[2,25,1,0]
        cate3_sid: "other-branches-of-medicine",
        cate3_name: "Other branches of medicine",
        cate3_slug: "other-branches-of-medicine",
        cate2_id: 48,
        cate2_sid: "medical",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,25,2,0]
        cate3_sid: "medicine",
        cate3_name: "Medicine",
        cate3_slug: "medicine",
        cate2_id: 48,
        cate2_sid: "medical",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,25,3,0]
        cate3_sid: "clinical-internal-medicine",
        cate3_name: "Clinical & internal medicine",
        cate3_slug: "clinical-internal-medicine",
        cate2_id: 48,
        cate2_sid: "medical",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,25,4,0]
        cate3_sid: "nursing-ancillary-services",
        cate3_name: "Nursing & ancillary services",
        cate3_slug: "nursing-ancillary-services",
        cate2_id: 48,
        cate2_sid: "medical",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,26]
      {//[2,26,1,0]
        cate3_sid: "encyclopaedias-reference-works",
        cate3_name: "Encyclopaedias & reference works",
        cate3_slug: "encyclopaedias-reference-works",
        cate2_id: 49,
        cate2_sid: "reference",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,26,2,0]
        cate3_sid: "research-information-general",
        cate3_name: "Research & information: General",
        cate3_slug: "research-information-general",
        cate2_id: 49,
        cate2_sid: "reference",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,26,3,0]
        cate3_sid: "interdisciplinary-studies-reference",
        cate3_name: "Interdisciplinary studies",
        cate3_slug: "interdisciplinary-studies-reference",
        cate2_id: 49,
        cate2_sid: "reference",
        create_time: new Date(),
        update_time: new Date()
      },
      //[2,27]
      {//[2,27,1,0]
        cate3_sid: "miscellaneous-items",
        cate3_name: "Miscellaneous items",
        cate3_slug: "miscellaneous-items",
        cate2_id: 50,
        cate2_sid: "stationery",
        create_time: new Date(),
        update_time: new Date()
      },
      //[2,28]
      {//[2,28,1,0]
        cate3_sid: "domestic-animals-pets",
        cate3_name: "Domestic animals & pets",
        cate3_slug: "domestic-animals-pets",
        cate2_id: 51,
        cate2_sid: "natural-history",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,28,2,0]
        cate3_sid: "earth-natural-history-general",
        cate3_name: "Earth: Natural history general",
        cate3_slug: "earth-natural-history-general",
        cate2_id: 51,
        cate2_sid: "natural-history",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,28,3,0]
        cate3_sid: "dinosaurs-the-prehistoric-world",
        cate3_name: "Dinosaurs & the prehistoric world",
        cate3_slug: "dinosaurs-the-prehistoric-world",
        cate2_id: 51,
        cate2_sid: "natural-history",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,28,4,0]
        cate3_sid: "trees-wildflowers-plants",
        cate3_name: "Trees, wildflowers and plants",
        cate3_slug: "trees-wildflowers-plants",
        cate2_id: 51,
        cate2_sid: "natural-history",
        create_time: new Date(),
        update_time: new Date()
      },

      //[2,29]
      {//[2,29,1,0]
        cate3_sid: "travel-writing",
        cate3_name: "Travel writing",
        cate3_slug: "travel-writing",
        cate2_id: 52,
        cate2_sid: "travel-and-holiday-guide",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,29,2,0]
        cate3_sid: "travel-maps-atlases",
        cate3_name: "Travel maps & atlases",
        cate3_slug: "travel-maps-atlases",
        cate2_id: 52,
        cate2_sid: "travel-and-holiday-guide",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,29,3,0]
        cate3_sid: "language-phrasebooks-travel",
        cate3_name: "Language phrasebooks",
        cate3_slug: "language-phrasebooks-travel",
        cate2_id: 52,
        cate2_sid: "travel-and-holiday-guide",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,29,4,0]
        cate3_sid: "guidebooks",
        cate3_name: "Guidebooks",
        cate3_slug: "guidebooks",
        cate2_id: 52,
        cate2_sid: "travel-and-holiday-guide",
        create_time: new Date(),
        update_time: new Date()
      },
      //[2,30]
      {//[2,30,1,0]
        cate3_sid: "thrillers",
        cate3_name: "Thrillers",
        cate3_slug: "thrillers",
        cate2_id: 53,
        cate2_sid: "crime-and-thriller",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,30,2,0]
        cate3_sid: "true-crime",
        cate3_name: "True crime",
        cate3_slug: "true-crime",
        cate2_id: 53,
        cate2_sid: "crime-and-thriller",
        create_time: new Date(),
        update_time: new Date()
      },
      //[2,31]
      {//[2,31,1,0]
        cate3_sid: "science-fiction-science",
        cate3_name: "Science fiction",
        cate3_slug: "science-fiction-science",
        cate2_id: 54,
        cate2_sid: "science-fiction-fantasy-and-horror",
        create_time: new Date(),
        update_time: new Date()
      },
      //[2,32]
      {//[2,32,1,0]
        cate3_sid: "active-outdoor-pursuits",
        cate3_name: "Active outdoor pursuits",
        cate3_slug: "active-outdoor-pursuits",
        cate2_id: 55,
        cate2_sid: "sport",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,32,2,0]
        cate3_sid: "ball-games",
        cate3_name: "Ball games",
        cate3_slug: "ball-games",
        cate2_id: 55  ,
        cate2_sid: "sport",
        create_time: new Date(),
        update_time: new Date()
      },

      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_3', null, {});
  }
};
