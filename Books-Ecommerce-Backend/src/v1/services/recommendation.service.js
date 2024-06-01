const { BadRequestError } = require("../core/error.response");
const { promisify } = require("util");
const redis = require("redis");
const db = require("../models/sequelize/models");
const { orderBy } = require("lodash");
const CategoryService = require("./category.service");
const redisClient = redis.createClient({
  password: "KYsW4siAdfAUVq6hfzrIojRT0uU9h0M1",
  socket: {
    host: "redis-14718.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14718,
  },
  legacyMode: true,
});

class RecommendationService {
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
    const topCategories = await db.rec_book.findAll({
      attributes: [
        "rec_book_categories",
        [
          db.Sequelize.fn("COUNT", db.Sequelize.col("rec_book_categories")),
          "count",
        ],
      ],
      group: "rec_book_categories",
      order: [[db.Sequelize.literal("count"), "DESC"]],
      limit: top,
      raw: true,
    });
    if (!topCategories) return [];

    // get books data for category
    const results = [];
    for (const category of topCategories) {
      const images = await db.rec_book.findAll({
        attributes: ["rec_book_img"],
        where: db.Sequelize.literal(
          `JSON_EXTRACT(rec_book_categories, '$[0]') = "${category.rec_book_categories}"`
        ),
        limit: 3,
        raw: true,
      });
      results.push({
        category: category.rec_book_categories,
        rec_times: category.count,
        images: images.map((image) => image.rec_book_img),
      });
    }

    // get categories slug
    for (let top = 0; top < results.length; top++) {
      let cate_list = JSON.parse(results[top]?.category);
      const cate = [];
      for (let i = 0; i < cate_list.length; i++) {
        const sub_cate = await CategoryService.getCateById(cate_list[i], i + 1);
        if (sub_cate) {
          cate.push(sub_cate);
        }
      }
      results[top].category = cate;
    }
    return results;
  }
}

module.exports = RecommendationService;
