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

class RecommendationService {
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
      if (book) {
        result.push({ book: book, sold });
      }
    }
    return result;
  }
}
module.exports = RecommendationService;
