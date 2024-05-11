"use strict";

const redis = require("redis");
const redisClient = redis.createClient({
  password: "a0JcKZ8pfS8Y7oMMO6MgUjJwbjry4KXN",
  socket: {
    host: "redis-16048.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 16048,
  },
  legacyMode: true,
});

const { promisify } = require("util");

const saveBehaviour = async (key, data) => {
  if (!redisClient.isReady) {
    await redisClient.connect();
  }
  console.log("connectRedis::Behaviour-Store:", redisClient.isReady);

  const pexpire = promisify(redisClient.pExpire).bind(redisClient);
  const setAsync = promisify(redisClient.set).bind(redisClient);

  const retryTimes = 3;
  const expireTime = 1000 * 60 * 60;

  console.log("key:", key, "data:", data);

  for (let i = 0; i < retryTimes; i++) {
    const result = await setAsync(key, data);
    console.log("result:::", result);
    if (result === "OK") {
      // await pexpire(key, expireTime);
      return result;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }
};

module.exports = {
  saveBehaviour,
};
