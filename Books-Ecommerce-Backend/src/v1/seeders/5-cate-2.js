'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('category_2', [
      {
        // [1,1]
        cate2_sid: "thieu-nhi",
        cate2_name: "Thiếu Nhi",
        cate2_slug: "thieu-nhi",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {// [1,2]
        cate2_sid: "giao-khoa-tham-khao",
        cate2_name: "Giáo khoa - Tham khảo",
        cate2_slug: "giao-khoa-tham-khao",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },

      {//[1,3]
        cate2_sid: "van-hoc",
        cate2_name: "Văn học",
        cate2_slug: "van-hoc",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,4]
        cate2_sid: "tam-ly-ky-nang-song",
        cate2_name: "Tâm lý - Kỹ năng sống",
        cate2_slug: "tam-ly-ky-nang-song",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,5]
        cate2_sid: "manga-comic",
        cate2_name: "Manga - Comic",
        cate2_slug: "manga-comic",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,6]
        cate2_sid: "sach-hoc-ngoai-ngu",
        cate2_name: "Sách học ngoại ngữ",
        cate2_slug: "sach-hoc-ngoai-ngu",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,7]
        cate2_sid: "kinh-te",
        cate2_name: "Kinh tế",
        cate2_slug: "kinh-te",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,8]
        cate2_sid: "khoa-hoc-ky-thuat",
        cate2_name: "Khoa học kỹ thuật",
        cate2_slug: "khoa-hoc-ky-thuat",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,9]
        cate2_sid: "lich-su-dia-ly-ton-giao",
        cate2_name: "Lịch sử - Địa lý - Tôn giáo",
        cate2_slug: "lich-su-dia-ly-ton-giao",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,10]
        cate2_sid: "nuoi-day-con",
        cate2_name: "Nuôi dạy con",
        cate2_slug: "nuoi-day-con",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,11]
        cate2_sid: "chinh-tri-phap-ly-triet-hoc",
        cate2_name: "Chính trị - Pháp lý - Triết học",
        cate2_slug: "chinh-tri-phap-ly-triet-hoc",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,12]
        cate2_sid: "tieu-su-hoi-ky",
        cate2_name: "Tiểu sử - Hồi ký",
        cate2_slug: "tieu-su-hoi-ky",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,13]
        cate2_sid: "dam-my",
        cate2_name: "Đam mỹ",
        cate2_slug: "dam-my",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,14]
        cate2_sid: "nu-cong-gia-chanh",
        cate2_name: "Nữ công gia chánh",
        cate2_slug: "nu-cong-gia-chanh",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,15]
        cate2_sid: "van-hoa-nghe-thuat-du-lich",
        cate2_name: "Văn hóa - Nghệ thuật - Du lịch",
        cate2_slug: "van-hoa-nghe-thuat-du-lich",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,16]
        cate2_sid: "phong-thuy-kinh-dich",
        cate2_name: "Phong thủy - Kinh dịch",
        cate2_slug: "phong-thuy-kinh-dich",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,17]
        cate2_sid: "tu-dien",
        cate2_name: "Từ điển",
        cate2_slug: "tu-dien",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,18]
        cate2_sid: "the-duc-the-thao-giai-tri",
        cate2_name: "Thể dục thể thao - Giải trí",
        cate2_slug: "the-duc-the-thao-giai-tri",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,19]
        cate2_sid: "am-nhac-my-thuat-thoi-trang",
        cate2_name: "Âm nhạc - Mỹ thuật - Thời trang",
        cate2_slug: "am-nhac-my-thuat-thoi-trang",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,20]
        cate2_sid: "bao-tap-chi",
        cate2_name: "Báo - Tạp chí",
        cate2_slug: "bao-tap-chi",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,21]
        cate2_sid: "giao-trinh",
        cate2_name: "Giáo trình",
        cate2_slug: "giao-trinh",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,22]
        cate2_sid: "lam-vuon-thu-nuoi",
        cate2_name: "Làm vườn - Thú nuôi",
        cate2_slug: "lam-vuon-thu-nuoi",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[1,23]
        cate2_sid: "mystery-box",
        cate2_name: "Mystery box",
        cate2_slug: "mystery-box",
        cate1_id: 1,
        cate1_sid: "sach-tieng-viet",
        create_time: new Date(),
        update_time: new Date()
      },

      //2
      {//[2,24]
        cate2_sid: "childrens-books",
        cate2_name: "Children's books",
        cate2_slug: "childrens-books",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,25]
        cate2_sid: "dictionaries-and-languages",
        cate2_name: "Dictionaries and Languages",
        cate2_slug: "dictionaries-and-languages",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,26]
        cate2_sid: "other-languages",
        cate2_name: "Other languages",
        cate2_slug: "other-languages",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,27]
        cate2_sid: "fiction",
        cate2_name: "Fiction",
        cate2_slug: "fiction",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,28]
        cate2_sid: "business-finance-and-management",
        cate2_name: "Business, Finance and Management",
        cate2_slug: "business-finance-and-management",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,29]
        cate2_sid: "personal-development",
        cate2_name: "Personal development",
        cate2_slug: "personal-development",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,30]
        cate2_sid: "biography",
        cate2_name: "Biography",
        cate2_slug: "biography",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,31]
        cate2_sid: "education-and-reference",
        cate2_name: "Education reference",
        cate2_slug: "education-and-reference",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,32]
        cate2_sid: "society-and-social-sciences",
        cate2_name: "Society and social sciences",
        cate2_slug: "society-and-social-sciences",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,33]
        cate2_sid: "mind-body-and-spirit",
        cate2_name: "Mind, Body and Spirit",
        cate2_slug: "mind-body-and-spirit",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,34]
        cate2_sid: "crafts-and-hobbies",
        cate2_name: "Crafts and hobbies",
        cate2_slug: "crafts-and-hobbies",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,35]
        cate2_sid: "health",
        cate2_name: "Health",
        cate2_slug: "health",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,36]
        cate2_sid: "food-and-drink",
        cate2_name: "Food and Drink",
        cate2_slug: "food-and-drink",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,37]
        cate2_sid: "science-and-geography",
        cate2_name: "Science and Geography",
        cate2_slug: "science-and-geography",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,38]
        cate2_sid: "poetry-and-drama",
        cate2_name: "Poetry and drama",
        cate2_slug: "poetry-and-drama",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,39]
        cate2_sid: "religion",
        cate2_name: "Religion",
        cate2_slug: "religion",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,40]
        cate2_sid: "history-and-archaeology",
        cate2_name: "History and Archaeology",
        cate2_slug: "history-and-archaeology",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,41]
        cate2_sid: "art-and-photography",
        cate2_name: "Art and Photography",
        cate2_slug: "art-and-photography",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,42]
        cate2_sid: "technology-and-engineering",
        cate2_name: "Technology and Engineering",
        cate2_slug: "technology-and-engineering",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,43]
        cate2_sid: "graphic-novels-anime-and-manga",
        cate2_name: "Graphic novels, Anime and manga",
        cate2_slug: "graphic-novels-anime-and-manga",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,44]
        cate2_sid: "romance",
        cate2_name: "Romance",
        cate2_slug: "romance",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,45]
        cate2_sid: "computing",
        cate2_name: "Computing",
        cate2_slug: "computing",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,46]
        cate2_sid: "home-and-garden",
        cate2_name: "Home and garden",
        cate2_slug: "home-and-garden",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,47]
        cate2_sid: "entertaiment",
        cate2_name: "Entertaiment",
        cate2_slug: "entertaiment",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,48]
        cate2_sid: "medical",
        cate2_name: "Medical",
        cate2_slug: "medical",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,49]
        cate2_sid: "reference",
        cate2_name: "Reference",
        cate2_slug: "reference",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,50]
        cate2_sid: "stationery",
        cate2_name: "Stationery",
        cate2_slug: "stationery",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,51]
        cate2_sid: "natural-history",
        cate2_name: "Natural history",
        cate2_slug: "natural-history",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,52]
        cate2_sid: "travel-and-holiday-guide",
        cate2_name: "Travel and holiday guide",
        cate2_slug: "travel-and-holiday-guide",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,53]
        cate2_sid: "crime-and-thriller",
        cate2_name: "Crime and thriller",
        cate2_slug: "crime-and-thriller",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,54]
        cate2_sid: "science-fiction-fantasy-and-horror",
        cate2_name: "Science fiction, fantasy and horror",
        cate2_slug: "science-fiction-fantasy-and-horror",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,55]
        cate2_sid: "sport",
        cate2_name: "Sport",
        cate2_slug: "sport",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },
      {//[2,56]
        cate2_sid: "humour",
        cate2_name: "Humour",
        cate2_slug: "humour",
        cate1_id: 2,
        cate1_sid: "foreign-books",
        create_time: new Date(),
        update_time: new Date()
      },

      // Add more categories as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('category_2', null, {});
  }
};
