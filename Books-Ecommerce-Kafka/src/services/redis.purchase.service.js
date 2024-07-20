"use strict";

const redis = require("redis");
const redisClient = redis.createClient({
  password: "KYsW4siAdfAUVq6hfzrIojRT0uU9h0M1",
  socket: {
    host: "redis-14718.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 14718,
  },
  legacyMode: true,
});

const { promisify } = require("util");

const collectPurchase = async (key, score = 1) => {
  if (!redisClient.isReady) {
    await redisClient.connect();
  }
  console.log("connectRedis::Most-Purchase-Store:", redisClient.isReady);

  const pexpire = promisify(redisClient.pExpire).bind(redisClient);
  const zscoreAsync = promisify(redisClient.zScore).bind(redisClient);
  const zincrbyAsync = promisify(redisClient.zIncrBy).bind(redisClient);
  const zaddAsync = promisify(redisClient.zAdd).bind(redisClient);
  // const publish = promisify(redisClient.publish).bind(redisClient);
  const expireTime = 1000 * 60 * 60 * 24 * 7;
  const redis_key = "popular-products";

  const key_member = `product:${key}`;
  console.log("key:", key_member);

  // Kiểm tra xem phần tử có tồn tại trong sorted set không
  const existingScore = await zscoreAsync(redis_key, key_member);

  if (existingScore !== null) {
    await zincrbyAsync(redis_key, score, key_member);
  } else {
    await zaddAsync(redis_key, score, key_member);
  }
  // await pexpire(redis_key, expireTime);

  //Publish a notification to the server
  // await publish("most-purchase", JSON.stringify(key_member));
};

module.exports = {
  collectPurchase,
};
