"use strict";

const redis = require("redis");
const redisClient = redis.createClient({
  password: "BPCJVK6TcHKjsliR97SBnFp3BtsZcGWB",
  socket: {
    host: "redis-18188.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 18188,
  },
  legacyMode: true,
});
const REQUEST_REC_SCORE = 20;
const REQUEST_RATING_SCORE = 20;

const { promisify } = require("util");

const collectVector = async (userId, productId, score = 1) => {
  if (!redisClient.isReady) {
    await redisClient.connect();
  }

  console.log("connectRedis::Most-Vector-Store:", redisClient.isReady);

  const pexpire = promisify(redisClient.pExpire).bind(redisClient);
  const zscoreAsync = promisify(redisClient.zScore).bind(redisClient);
  const zincrbyAsync = promisify(redisClient.zIncrBy).bind(redisClient);
  const zaddAsync = promisify(redisClient.zAdd).bind(redisClient);
  const zcardAsync = promisify(redisClient.zCard).bind(redisClient);
  const expireTime = 1000 * 60 * 60;
  const redis_key = "vector-score";
  const redis_user_key = "user-score";
  const redis_product_key = "product-score";
  const redis_rating_key = "rating-score";
  const redis_timestamp_key = "user-product";

  //collect timestamp behavior
  const key_user_product = `${userId}:${productId}`;
  const existing_timestamp = await zscoreAsync(
    redis_timestamp_key,
    key_user_product
  );
  const timestamp = Date.now();
  const options = ["XX"];
  if (existing_timestamp != null) {
    await zaddAsync(
      redis_timestamp_key,
      ...options,
      timestamp,
      key_user_product
    );
  } else {
    await zaddAsync(redis_timestamp_key, timestamp, key_user_product);
  }

  // await zaddAsync(redis_timestamp_key, timestamp, key_user_product);

  //Tính số lượng sản phẩm được ratings
  if (score === 0) {
    const key_rating = `${userId}:${productId}`;
    const existingRtingScore = await zscoreAsync(redis_rating_key, key_rating);
    if (existingRtingScore !== null) {
      await zincrbyAsync(redis_rating_key, 1, key_rating);
    } else {
      //thêm sản sản phẩm được rating
      const add_rating = await zaddAsync(redis_rating_key, 1, key_rating);
      //đếm chiều dài của sorte-set
      const memberCount = await zcardAsync(redis_rating_key);
      if (memberCount >= REQUEST_RATING_SCORE) {
        return {
          message: "retrain-rating",
          sorted_set: redis_rating_key,
          count_member: memberCount,
        };
      }

      return null;
    }
  }

  //Tính điểm vector
  const key_member = `${userId}:${productId}`;
  const existingScore = await zscoreAsync(redis_key, key_member);
  if (existingScore !== null) {
    await zincrbyAsync(redis_key, score, key_member);
  } else {
    await zaddAsync(redis_key, score, key_member);
  }

  // Tính điểm tương tác của mỗi user
  const user_key_member = `${userId}`;
  const user_existingScore = await zscoreAsync(redis_user_key, user_key_member);
  let newScore;
  if (user_existingScore !== null) {
    newScore = await zincrbyAsync(redis_user_key, score, user_key_member);
  } else {
    await zaddAsync(redis_user_key, score, user_key_member);
  }

  // Tính điểm tương tác cho mỗi sản phẩm
  const product_key_member = `${productId}`;
  const procduct_existingScore = await zscoreAsync(
    redis_product_key,
    product_key_member
  );
  let newProductScore;
  if (procduct_existingScore !== null) {
    newProductScore = await zincrbyAsync(
      redis_product_key,
      score,
      product_key_member
    );
  } else {
    await zaddAsync(redis_product_key, score, product_key_member);
  }

  //Schedule
  //Gọi retrain khi user đủ kiền kiện
  if (newScore >= REQUEST_REC_SCORE) {
    return { message: "retrain-behaviour", userId: userId, score: newScore };
  }
  // await pexpire(redis_key, expireTime);
};

module.exports = {
  collectVector,
};
