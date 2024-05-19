const { BadRequestError } = require("../core/error.response");
const { promisify } = require("util");
const redis = require("redis");
const db = require("../models/sequelize/models");
const redisClient = redis.createClient({
  password: "KYsW4siAdfAUVq6hfzrIojRT0uU9h0M1",
  socket: {
    host: "redis-14718.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14718,
  },
  legacyMode: true,
});

class BestSellingService {
  //get best selling books from redis
  // static async getBestSellingBooksRedis({ pageNumber, pageSize }) {
  //   if (!redisClient.isReady) {
  //     await redisClient.connect();
  //   }
  //   console.log("connectRedis::Most-Purchase-Store:", redisClient.isReady);

  //   if (pageNumber < 0 || pageSize < 0) {
  //     throw new BadRequestError("Invalid page number");
  //   }
  //   const start = (pageNumber - 1) * pageSize;
  //   const end = start + pageSize - 1;

  //   const zrevrangeAsync = promisify(redisClient.zRange).bind(redisClient);

  //   const keysInRange = await zrevrangeAsync(
  //     "popular-products",
  //     start,
  //     end,
  //     "WITHSCORES",
  //     "REV"
  //   );
  //   return keysInRange;
  // }
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
    return result;
  }

  //get best selling Books from mysql with query parameters
  // static async searchBestSellingBooks({
  //   categories,
  //   price,
  //   pageNumber,
  //   pageSize,
  // }) {
  //   const keysInRange = await BestSellingService.getBestSellingBooksRedis({
  //     pageNumber: -1,
  //     pageSize: -1,
  //   });

  //   //Collect book data
  //   const result = [];
  //   for (let i = 0; i < keysInRange.length; i += 2) {
  //     const productId = parseInt(keysInRange[i].split(":")[1]);
  //     const sold = parseInt(keysInRange[i + 1]);
  //     //getBook
  //     const book = await db.book.findByPk(productId);
  //     if (book && book.book_status === 1) {
  //       result.push({
  //         book: {
  //           book_id: book.book_id,
  //           book_img: book.book_img,
  //           book_title: book.book_title,
  //           book_categories: book.book_categories,
  //           book_spe_price: book.book_spe_price,
  //           book_old_price: book.book_old_price,
  //         },
  //         sold,
  //       });
  //     }
  //   }
  //   return result;
  // }
  static async searchBestSellingBooks({
    categories,
    price,
    pageNumber,
    pageSize,
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

    // Thu thập dữ liệu sách
    const books = [];
    for (let i = 0; i < keysInRange.length; i += 2) {
      const productId = parseInt(keysInRange[i].split(":")[1]);
      const sold = parseInt(keysInRange[i + 1]);
      // Lấy thông tin sách từ MySQL
      // const book = await db.book.findByPk(productId);
      // if (book && book.book_status === 1) {
      //   books.push({
      //     book: {
      //       book_id: book.book_id,
      //       book_img: book.book_img,
      //       book_title: book.book_title,
      //       book_categories: book.book_categories,
      //       book_spe_price: book.book_spe_price,
      //       book_old_price: book.book_old_price,
      //     },
      //     sold,
      //   });
      // }
      // Xây dựng điều kiện JSON_EXTRACT động cho n phần tử đầu tiên
      const categoryConditions = cateIds.map((cateId, index) =>
        db.Sequelize.literal(
          `JSON_EXTRACT(book_categories, '$[${index}]') = ${cateId}`
        )
      );
      const book = await db.book.findOne({
        where: {
          book_id: productId,
          book_status: 1,
          [db.Sequelize.Op.and]: categoryConditions,
        },
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

    // Lọc sách theo danh mục và giá
    // const filteredBooks = books.filter(({ book }) => {
    //   const matchesCategory = categories
    //     ? categories.includes(book.book_categories)
    //     : true;
    //   const matchesPrice = price
    //     ? book.book_spe_price >= price.min && book.book_spe_price <= price.max
    //     : true;
    //   return matchesCategory && matchesPrice;
    // });

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
    };
  }
}

module.exports = BestSellingService;
