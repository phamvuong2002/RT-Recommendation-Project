"use strict";

const redis = require("redis");
// const redisClient = redis.createClient({
//     host: "redis-19046.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
//     port: 19046,
//     legacyMode: true
// });
const redisClient = redis.createClient({
  password: "yhcad6Y0q3ZoslwqHanUJN4K6H1dAgSo",
  socket: {
    host: "redis-19046.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 19046,
  },
  legacyMode: true,
});

//vector-user-score
const redisVectorUserScore = redis.createClient({
  password: "BPCJVK6TcHKjsliR97SBnFp3BtsZcGWB",
  socket: {
    host: "redis-18188.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    port: 18188,
  },
  legacyMode: true,
});

const { promisify } = require("util");
const db = require("../models/sequelize/models");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const KeyTokenService = require("./keyToken.service");

//lock for purchase
const acquireLock = async (productId, quantity) => {
  if (!redisClient.isReady) {
    await redisClient.connect();
  }
  console.log("connectRedis:", redisClient.isReady);

  const pexpire = promisify(redisClient.pExpire).bind(redisClient);
  const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

  const key = `lock_v2024_${productId}`;
  const retryTimes = 10;
  const expireTime = 3000;

  for (let i = 0; i < retryTimes; i++) {
    const result = await setnxAsync(key, expireTime);
    console.log("result::", result);
    if (result === 1) {
      //check quantity of products in inventory
      const inventory = await db.inventory.findByPk(productId);
      if (!inventory || inventory?.dataValues?.inven_stock < quantity) {
        await releaselock(key);
        throw new BadRequestError("Number of products is out of bounds");
      } else {
        //lock
        await pexpire(key, expireTime);
        //update book status if inven stock = 0
        if (inventory.dataValues.inven_stock - quantity === 0) {
          const book = await db.book.findByPk(productId);
          await book.set({
            book_status: 0,
          });
          await book.save();
        }
        //update inventory
        await inventory.set({
          inven_stock: inventory.dataValues.inven_stock - quantity,
          update_time: new Date(),
        });
        await inventory.save();

        return key;
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }
};

const releaselock = async (keylock) => {
  if (!keylock) {
    throw new NotFoundError("Not found keylock");
  }
  console.log("releaselock");
  const delAsync = promisify(redisClient.del).bind(redisClient);
  return await delAsync(keylock);
};

//Lock for online training
const acquireLockOnlineReTrain = async (model = "behavior", min_score = 50) => {
  //1.Tạo và kiểm tra khoá trong cache ecommerce
  if (!redisClient.isReady) {
    await redisClient.connect();
  }

  const pexpire = promisify(redisClient.pExpire).bind(redisClient);
  const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

  const key = `lock_v2024_online_retrain_${model}`;
  const expireTime = 1000 * 60;
  //kiểm tra khoá đã có hay chưa nếu có rồi thì trả về 0 chưa thì tạo và trả về 1
  const result = await setnxAsync(key, expireTime);
  await pexpire(key, expireTime); //Hết hạn sau 1 phút
  console.log("result online:::::::", result);
  if (result === 1) {
    //Nếu tạo khoá thành công thì tìm tất cả user hợp lệ
    const key_user_vector = "user-score";
    // const min_score = 50;
    //check user score
    //connect to redis vector
    if (!redisVectorUserScore.isReady) {
      await redisVectorUserScore.connect();
    }
    // Lấy các khóa có điểm số lớn hơn hoặc bằng 50 từ sorted set
    const zrangebyscoreAsync = promisify(
      redisVectorUserScore.zRangeByScore
    ).bind(redisVectorUserScore);
    console.log("min score accquire lock:::", min_score);
    const listUsers = await zrangebyscoreAsync(
      key_user_vector,
      min_score,
      "+inf"
    );
    if (listUsers.length === 0) {
      //Nếu không có user nào hợp lệ thì trả về null
      return null;
    } else {
      // Nếu user đủ điều kiện tất cả user hợp lệ
      //lọc những user hợp lệ đã đăng nhập
      if (min_score < 50) {
        const verifyUsers = [];

        for (const user in listUsers) {
          const userKey = await KeyTokenService.findByUserId(listUsers[user]);
          if (userKey) {
            verifyUsers.push(listUsers[user]);
          }
        }
        return { listUsers: verifyUsers, key };
      }
      return { listUsers, key };
    }
  } else {
    //Nếu khoá đã có thì trả về null
    return null;
  }
};

//reset user score
const resetUserScore = async (userId, key_user_vector = "user-score") => {
  const resetScore = 0;
  if (!redisVectorUserScore.isReady) {
    await redisVectorUserScore.connect();
  }
  const zAddAsync = promisify(redisVectorUserScore.ZADD).bind(
    redisVectorUserScore
  );
  const result = await zAddAsync(key_user_vector, resetScore, userId);
};

module.exports = {
  acquireLock,
  releaselock,
  acquireLockOnlineReTrain,
  resetUserScore,
};
