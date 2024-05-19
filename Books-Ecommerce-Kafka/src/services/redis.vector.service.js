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

  const key_member = `${userId}:${productId}`;
  console.log("key:", key_member);

  // Kiểm tra xem phần tử có tồn tại trong sorted set không
  const existingScore = await zscoreAsync(redis_key, key_member);

  if (existingScore !== null) {
    await zincrbyAsync(redis_key, score, key_member);
  } else {
    await zaddAsync(redis_key, score, key_member);
  }
  // await pexpire(redis_key, expireTime);
};

module.exports = {
  collectVector,
};
