const { BadRequestError } = require("../core/error.response");
const { promisify } = require("util");
const redis = require("redis");
const db = require("../models/sequelize/models");
const _ = require("lodash");
const CategoryService = require("./category.service");
const ContentBaseRecommendationService = require("./recommendation.contentbase.service");
const redisClient = redis.createClient({
  password: "KYsW4siAdfAUVq6hfzrIojRT0uU9h0M1",
  socket: {
    host: "redis-14718.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14718,
  },
  legacyMode: true,
});

const redisRecResult = redis.createClient({
  password: "SsgwktV1sE5C4chZ6NwvfsskYRsjdZbb",
  socket: {
    host: "redis-14987.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14987,
  },
  legacyMode: true,
});

class RecommendationService {
  //check is enough recommended books
  static getRecBooks = async (userId) => {
    if (!userId) return null;

    if (!redisRecResult.isReady) {
      await redisRecResult.connect();
    }
    const zRangeAsync = promisify(redisRecResult.ZRANGE).bind(redisRecResult);

    const sortedSetName = `${userId}`;
    const membersWithScores = await zRangeAsync(
      sortedSetName,
      0,
      -1,
      "WITHSCORES"
    );
    return membersWithScores;
  };

  //get contents based rec books
  static getConBasRecBooks = async ({ userId, page, limit = 12 }) => {
    const recbooks = await RecommendationService.getRecBooks(userId);
    //check user đã có đề xuất hay chưa
    //1.0 nếu đã có đề xuất
    if (recbooks.length > page * 12 - 1) {
      return null;
    }
    //get best seller product ID
    if (!redisClient.isReady) {
      await redisClient.connect();
    }
    const zrevrangeAsync = promisify(redisClient.zRange).bind(redisClient);
    const zcardAsync = promisify(redisClient.zCard).bind(redisClient);

    const keysInRange = await zrevrangeAsync(
      "popular-products",
      page - 1,
      page - 1,
      "WITHSCORES",
      "REV"
    );
    // const productId = keysInRange[0].split(":")[1];
    // return await ContentBaseRecommendationService.getRecommendByContentBaseID({
    //   bookId: productId,
    //   userId,
    //   quantity: limit,
    //   model_type: "online",
    // });

    const length = await zcardAsync("popular-products");
    return {
      books: await RecommendationService.getPopularBooks({
        pageNumber: page,
        pageSize: limit,
      }),
      totalPages: Math.ceil(length / limit),
    };
  };

  //search rec books
  static async searchRecBooks({
    userId,
    page = 1,
    limit = 24,
    model_type = "online",
  }) {
    // return empty if userId is null
    if (!userId)
      return {
        books: [],
        totalBooks: 0,
        totalPages: 0,
      };

    //find rec books
    const recBooks = await db.rec_book.findAll({
      attributes: [
        [
          db.Sequelize.fn("DISTINCT", db.Sequelize.col("rec_book_id")),
          "book_id",
        ],
        // ["rec_book_id", "book_id"],
        ["rec_book_title", "book_title"],
        ["rec_book_img", "book_img"],
        ["rec_book_categories", "book_categories"],
        ["rec_book_spe_price", "book_spe_price"],
        ["rec_book_old_price", "book_old_price"],
        ["rec_book_is_recommadation", "book_is_recommendation"],
        ["create_time", "create_time"],
      ],
      where: { rec_user_sid: userId },
      limit: limit,
      offset: (page - 1) * limit,
      order: [["create_time", "DESC"]],
    });

    const formattedBooks = recBooks.map((recbook) => ({
      book: {
        book_id: recbook.dataValues.book_id,
        book_title: recbook.dataValues.book_title,
        book_categories: recbook.dataValues.book_categories,
        book_img: recbook.dataValues.book_img,
        book_spe_price: recbook.dataValues.book_spe_price,
        book_old_price: recbook.dataValues.book_old_price,
      },
      isPersonal: recbook.dataValues.book_is_recommendation,
    }));

    return {
      books: formattedBooks,
      totalBooks: 1,
      totalPages: 1,
    };
  }

  static searchRecBooks_v1 = async ({
    page = 1,
    limit = 24,
    categories = "sach-tieng-viet",
    query = "",
    price = "",
    sortBy,
    userId = "",
  }) => {
    if (!categories) {
      categories = "sach-tieng-viet";
    }
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
        `JSON_EXTRACT(rec_book_categories, '$[${index}]') = ${cateId}`
      )
    );

    // Xây dựng điều kiện tìm kiếm cơ bản
    const searchConditions = {
      rec_book_is_recommadation: 1,
      [db.Sequelize.Op.and]: categoryConditions,
    };

    // Thêm điều kiện tìm kiếm theo query nếu có
    if (query) {
      searchConditions.book_title = { [db.Sequelize.Op.like]: `%${query}%` };
    }

    //Thêm tìm kiếm theo userId nếu có
    if (userId) {
      searchConditions.rec_user_sid = userId;
    }

    // Thêm điều kiện tìm kiếm theo price nếu có
    if (price) {
      const [minPrice, maxPrice] = price.split(",").map(Number);
      searchConditions.book_spe_price = {
        [db.Sequelize.Op.between]: [minPrice, maxPrice],
      };
    }

    // Sắp xếp theo sortBy nếu có
    const order = [];
    if (sortBy) {
      switch (sortBy) {
        case "name_asc":
          order.push(["rec_book_title", "ASC"]);
          break;
        case "name_desc":
          order.push(["rec_book_title", "DESC"]);
          break;
        case "price_asc":
          order.push(["rec_book_spe_price", "ASC"]);
          break;
        case "price_desc":
          order.push(["rec_book_spe_price", "DESC"]);
          break;
        default:
          order.push(["create_time", "DESC"]);
          break;
      }
    } else {
      order.push(["rec_session_id", "DESC"]);
    }

    // Tìm tổng số sách phù hợp
    const totalBooks = await db.rec_book.count({
      // distinct: true,
      where: searchConditions,
    });

    // Tìm sách theo điều kiện và phân trang
    const books = await db.rec_book.findAll({
      // distinct: true,
      where: searchConditions,
      offset: (page - 1) * limit,
      limit: limit,
      order: order,
    });

    //format lại theo form dữ liệu
    const formattedBooks = books.map((book) => ({
      book: {
        book_id: book.rec_book_id,
        book_title: book.rec_book_title,
        book_categories: book.rec_book_categories,
        book_img: book.rec_book_img,
        book_spe_price: book.rec_book_spe_price,
        book_old_price: book.rec_book_old_price,
      },
    }));

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalBooks / limit);

    return {
      books: formattedBooks,
      totalBooks,
      totalPages,
    };
  };

  //get top Personal category
  static async getPersonalCategory({ userId, top }) {
    if (!userId) return null;

    if (!redisRecResult.isReady) {
      await redisRecResult.connect();
    }

    const zRangeAsync = promisify(redisRecResult.ZRANGE).bind(redisRecResult);

    const sortedSetName = `${userId}`;
    const membersWithScores = await zRangeAsync(
      sortedSetName,
      0,
      -1,
      "WITHSCORES"
    );

    const categoryScores = {};
    const categoryImages = {};

    for (let i = 0; i < membersWithScores.length; i += 2) {
      const member = membersWithScores[i];
      const score = parseFloat(membersWithScores[i + 1]);

      const book = JSON.parse(member);
      const categoriesKey = book.bookCategory;

      // Cộng dồn điểm vào từng loại
      if (!categoryScores[categoriesKey]) {
        categoryScores[categoriesKey] = 0;
        categoryImages[categoriesKey] = [];
      }
      categoryScores[categoriesKey] += score;

      // Lưu trữ hình ảnh, tối đa 3 hình ảnh
      if (categoryImages[categoriesKey].length < 3) {
        categoryImages[categoriesKey].push(book.bookImg);
      }
    }

    // Sắp xếp và lấy top N kết quả
    const sortedCategories = _.orderBy(
      Object.keys(categoryScores).map((category) => ({
        category,
        score: categoryScores[category],
        images: categoryImages[category],
      })),
      ["score"],
      ["desc"]
    );

    //lấy slug thể loại
    let cate_sorted = sortedCategories.slice(0, top);
    for (let index = 0; index < cate_sorted.length; index++) {
      let cate_list = JSON.parse(cate_sorted[index]?.category);

      const cate = [];
      for (let i = 0; i < cate_list.length; i++) {
        const sub_cate = await CategoryService.getCateById(cate_list[i], i + 1);
        if (sub_cate) {
          cate.push(sub_cate);
        }
      }
      cate_sorted[index].category = cate;
    }

    return cate_sorted;
  }

  //get popular Books
  static async getPopularBooks({ pageNumber, pageSize }) {
    if (!redisClient.isReady) {
      await redisClient.connect();
    }
    console.log("connectRedis::Most-Purchase-Store:", redisClient.isReady);

    if (pageNumber < 0 || pageSize < 0) {
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
            book_title: book.book_title,
            book_img: book.book_img,
            book_spe_price: book.book_spe_price,
            book_old_price: book.book_old_price,
          },
          sold,
        });
      }
    }
    return result;
  }

  //get popular Rec_book category
  static async getPopularRecCategories({ top = 5 }) {
    // const topCategories = await db.rec_book.findAll({
    //   attributes: [
    //     "rec_book_categories",
    //     [
    //       db.Sequelize.fn("COUNT", db.Sequelize.col("rec_book_categories")),
    //       "count",
    //     ],
    //   ],
    //   group: "rec_book_categories",
    //   order: [[db.Sequelize.literal("count"), "DESC"]],
    //   limit: top,
    //   raw: true,
    // });
    // if (!topCategories) return [];

    // // get books data for category
    // const results = [];
    // for (const category of topCategories) {
    //   const images = await db.rec_book.findAll({
    //     attributes: ["rec_book_img"],
    //     where: db.Sequelize.literal(
    //       `JSON_EXTRACT(rec_book_categories, '$[0]') = "${category.rec_book_categories}"`
    //     ),
    //     limit: 3,
    //     raw: true,
    //   });
    //   results.push({
    //     category: category.rec_book_categories,
    //     rec_times: category.count,
    //     images: images.map((image) => image.rec_book_img),
    //   });
    // }

    // Ngày hôm nay
    const today = new Date();
    // Ngày 7 ngày trước
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const query = `
        SELECT 
        rec_book_categories AS category, 
        COUNT(DISTINCT rec_book_id) AS totalrec,
        SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT rec_book_img), ',', 3) AS images
        FROM rec_book
        WHERE create_time BETWEEN :sevenDaysAgo AND :today
        GROUP BY rec_book_categories
        ORDER BY totalrec DESC
        LIMIT :top
    `;

    const results = await db.sequelize.query(query, {
      replacements: { sevenDaysAgo, today, top },
      type: db.Sequelize.QueryTypes.SELECT,
    });

    // return results;

    // get categories slug
    for (let index = 0; index < results.length; index++) {
      let cate_list = results[index]?.category;
      const cate = [];
      for (let i = 0; i < cate_list.length; i++) {
        const sub_cate = await CategoryService.getCateById(cate_list[i], i + 1);
        if (sub_cate) {
          cate.push(sub_cate);
        }
      }
      results[index].category = cate;
      results[index].images = results[index]?.images?.split(",");
    }
    return results;
  }
}

module.exports = RecommendationService;
