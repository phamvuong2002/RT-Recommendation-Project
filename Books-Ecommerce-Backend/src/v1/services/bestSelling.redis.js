const { BadRequestError } = require("../core/error.response");
const { promisify } = require("util");
const redis = require("redis");
const db = require("../models/sequelize/models");
const CategoryService = require("./category.service");
const redisClient = redis.createClient({
  password: "KYsW4siAdfAUVq6hfzrIojRT0uU9h0M1",
  socket: {
    host: "redis-14718.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14718,
  },
  legacyMode: true,
});

// const getTopCate = (categories, top) => {
//   const categorySoldMap = new Map(); // Sử dụng Map thay vì object để tối ưu hiệu suất

//   // Tính tổng số lượng sold cho từng danh mục
//   categories.forEach((item) => {
//     const { category, sold, book_img } = item;
//     const categoryKey = category.join("|"); // Tạo key từ mảng category
//     const totalSold = categorySoldMap.get(categoryKey) || 0;
//     categorySoldMap.set(categoryKey, totalSold + sold);
//   });

//   // Sắp xếp danh sách các danh mục theo tổng số sold giảm dần
//   const sortedCategories = Array.from(
//     categorySoldMap,
//     ([categoryKey, totalSold]) => ({
//       category: categoryKey.split("|"), // Chuyển key thành mảng
//       totalSold,
//     })
//   ).sort((a, b) => b.totalSold - a.totalSold);

//   // Chọn ra top n danh mục
//   return sortedCategories.slice(0, top);
// };

const getTopCate = (categories, top) => {
  const categorySoldMap = new Map(); // Sử dụng Map thay vì object để tối ưu hiệu suất

  categories.forEach((item) => {
    const { category, sold, book_img } = item;
    const categoryKey = category.join("|");

    // Kiểm tra xem categoryKey đã tồn tại trong Map chưa
    if (!categorySoldMap.has(categoryKey)) {
      categorySoldMap.set(categoryKey, { totalSold: 0, images: [] });
    }

    // Lấy giá trị hiện tại và cập nhật
    const categoryData = categorySoldMap.get(categoryKey);
    categoryData.totalSold += sold;
    categoryData.images.push(book_img);
  });

  // Chuyển đổi Map thành mảng và sắp xếp danh sách các danh mục theo tổng số sold giảm dần
  const sortedCategories = Array.from(
    categorySoldMap,
    ([categoryKey, value]) => ({
      category: categoryKey.split("|"),
      totalSold: value.totalSold,
      images: value.images.slice(0, 3),
    })
  ).sort((a, b) => b.totalSold - a.totalSold);

  // Chọn ra top n danh mục
  return sortedCategories.slice(0, top);
};

class BestSellingService {
  //get best selling categories
  static async getBestSellingCategories({ top = 5 }) {
    const keysInRange = await BestSellingService.getBestSellingBooksRedis({
      pageNumber: -1,
      pageSize: -1,
    });
    //Collect cate data
    const cate_ids = [];
    for (let i = 0; i < keysInRange.length; i += 2) {
      const productId = parseInt(keysInRange[i].split(":")[1]);
      const sold = parseInt(keysInRange[i + 1]);
      const book = await db.book.findByPk(productId);
      if (book) {
        cate_ids.push({
          category: book.book_categories,
          book_img: book.book_img,
          sold,
        });
      }
    }

    let cate_sorted = getTopCate(cate_ids, top);
    for (let top = 0; top < cate_sorted.length; top++) {
      let cate_list = cate_sorted[top]?.category;
      const cate = [];
      for (let i = 0; i < cate_list.length; i++) {
        const sub_cate = await CategoryService.getCateById(cate_list[i], i + 1);
        if (sub_cate) {
          cate.push(sub_cate);
        }
      }
      cate_sorted[top].category = cate;
    }

    return cate_sorted;
  }

  //get best selling books from redis
  static async getBestSellingBooksRedis({ pageNumber = -1, pageSize = -1 }) {
    if (!redisClient.isReady) {
      await redisClient.connect();
    }

    if (pageNumber < 0 || pageSize < 0) {
      // Nếu pageNumber hoặc pageSize là -1, lấy toàn bộ danh sách
      const zrevrangeAsync = promisify(redisClient.zRange).bind(redisClient);
      const keysInRange = await zrevrangeAsync(
        "popular-products",
        0,
        -1,
        "WITHSCORES",
        "REV"
      );
      return keysInRange;
    } else {
      if (pageNumber <= 0 || pageSize <= 0) {
        throw new BadRequestError("Invalid page number");
      }
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize - 1;

      const zrevrangeAsync = promisify(redisClient.zRange).bind(redisClient);
      const keysInRange = await zrevrangeAsync(
        "popular-products",
        start,
        end,
        "WITHSCORES",
        "REV"
      );
      return keysInRange;
    }
  }

  //check book is in top selling
  static async isTopSelling({ bookId, top }) {
    if (!bookId) return false;
    const topBestSeller = await BestSellingService.getBestSellingBooksRedis({
      pageNumber: 1,
      pageSize: top,
    });

    return topBestSeller.includes(`product:${parseInt(bookId)}`);
  }

  //get best selling Books from mysql
  static async getBestSellingBooks({ pageNumber, pageSize }) {
    const keysInRange = await BestSellingService.getBestSellingBooksRedis({
      pageNumber,
      pageSize,
    });

    //Collect book data
    const result = [];
    for (let i = 0; i < keysInRange.length; i += 2) {
      const productId = parseInt(keysInRange[i].split(":")[1]);
      const sold = parseInt(keysInRange[i + 1]);
      //getBook
      const book = await db.book.findByPk(productId);
      if (book && book.book_status === 1) {
        result.push({
          book: {
            book_id: book.book_id,
            book_img: book.book_img,
            book_title: book.book_title,
            book_categories: book.book_categories,
            book_spe_price: book.book_spe_price,
            book_old_price: book.book_old_price,
          },
          sold,
        });
      }
    }
    return { books: result, totalBooks: result.length };
  }

  //search best selling Books from mysql with query parameters
  static async searchBestSellingBooks({
    categories,
    price,
    query,
    pageNumber,
    pageSize,
    sortBy,
  }) {
    // Lấy tất cả sách từ Redis
    const keysInRange = await BestSellingService.getBestSellingBooksRedis({
      pageNumber: -1,
      pageSize: -1,
    });

    // Chuyển đổi chuỗi categories thành mảng
    const cateIds = [];
    const categoryArray = categories ? categories.split(",") : [];

    // Tìm cateId theo slug từ các bảng category_1, category_2, category_3, category_4
    for (let i = 0; i < categoryArray.length; i++) {
      const cateSlug = categoryArray[i];
      if (cateSlug.length > 0) {
        const cateId = await db[`category_${i + 1}`].findOne({
          where: { [`cate${i + 1}_sid`]: cateSlug },
          attributes: [`cate${i + 1}_id`],
        });

        if (cateId) {
          cateIds.push(cateId.dataValues[`cate${i + 1}_id`]);
        }
      }
    }

    //Điều kiện thể loại
    const categoryConditions = cateIds.map((cateId, index) =>
      db.Sequelize.literal(
        `JSON_EXTRACT(book_categories, '$[${index}]') = ${cateId}`
      )
    );

    // Xây dựng điều kiện tìm kiếm cơ bản
    const searchConditions = {
      book_status: 1,
      [db.Sequelize.Op.and]: categoryConditions,
    };

    // Thêm điều kiện tìm kiếm theo query nếu có
    if (query) {
      searchConditions.book_title = { [db.Sequelize.Op.like]: `%${query}%` };
    }

    // Thêm điều kiện tìm kiếm theo price nếu có
    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      searchConditions.book_spe_price = {
        [db.Sequelize.Op.between]: [minPrice, maxPrice],
      };
    }

    // Thu thập dữ liệu sách
    const books = [];
    for (let i = 0; i < keysInRange.length; i += 2) {
      const productId = parseInt(keysInRange[i].split(":")[1]);
      const sold = parseInt(keysInRange[i + 1]);
      searchConditions.book_id = productId;
      const book = await db.book.findOne({
        where: searchConditions,
      });
      if (book) {
        books.push({
          book: {
            book_id: book.dataValues.book_id,
            book_img: book.dataValues.book_img,
            book_title: book.dataValues.book_title,
            book_categories: book.dataValues.book_categories,
            book_spe_price: book.dataValues.book_spe_price,
            book_old_price: book.dataValues.book_old_price,
          },
          sold,
        });
      }
    }

    // Lọc sách theo điều kiện sortBy
    if (sortBy) {
      books.sort((a, b) => {
        switch (sortBy) {
          case "name_asc":
            return a.book.book_title.localeCompare(b.book.book_title);
          case "name_desc":
            return b.book.book_title.localeCompare(a.book.book_title);
          case "price_asc":
            return a.book.book_spe_price - b.book.book_spe_price;
          case "price_desc":
            return b.book.book_spe_price - a.book.book_spe_price;
          default:
            return 0;
        }
      });
    }

    // Phân trang kết quả
    const totalBooks = books.length;
    const totalPages = Math.ceil(totalBooks / pageSize);
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const paginatedBooks = books.slice(start, end);

    // Trả về kết quả phân trang và tổng số sách
    return {
      totalPages,
      totalBooks,
      books: paginatedBooks,
      categories: cateIds,
      start,
      end,
      pageNumber,
      pageSize,
    };
  }
}

module.exports = BestSellingService;
