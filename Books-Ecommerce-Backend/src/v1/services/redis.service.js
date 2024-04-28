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

// const { getRedis } = require('../dbs/init.redis')

// const {
//     instanceConnect: redisClient
// } = getRedis()

const { promisify } = require("util");
const db = require("../models/sequelize/models");
const { BadRequestError, NotFoundError } = require("../core/error.response");

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

module.exports = {
  acquireLock,
  releaselock,
};
