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
const REQUEST_REC_SCORE = 50;

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
  const expireTime = 1000 * 60 * 60;
  const redis_key = "vector-score";
  const redis_user_key = "user-score";

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

  //Gọi retrain khi user đủ kiền kiện
  if (newScore >= REQUEST_REC_SCORE) {
    return { message: "retrain", userId: userId };
  }
  // await pexpire(redis_key, expireTime);
};

module.exports = {
  collectVector,
};
