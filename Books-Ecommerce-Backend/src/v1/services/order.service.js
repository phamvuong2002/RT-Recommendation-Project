"use strict";
const db = require("../models/sequelize/models");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class OrderService {
  //get order of user ID
  static getOrders = async ({ userId, status = null, page, limit }) => {
    const foundUser = await db.user.findOne({
      where: {
        user_sid: userId,
      },
    });
    if (!foundUser) throw new NotFoundError("User not found");

    let whereClause = {};
    if (status !== null) {
      whereClause.ob_status = status;
    }
    const listOrders = await db.order_book.findAll({
      include: [
        {
          model: db.order,
          attributes: ["order_id", "order_status", "order_user_id"],
          where: { order_user_id: foundUser.dataValues.user_id },
        },
        {
          model: db.book,
          attributes: ["book_title", "book_img", "book_spe_price"],
        },
      ],
      where: whereClause,
      attributes: [
        "ob_book_id",
        "ob_quantity",
        "ob_total_price",
        "ob_status",
        "create_time",
      ],
      limit: limit,
      offset: (page - 1) * limit,
    });

    const formattedListOrders = listOrders.map((order) => {
      return {
        detailBillId: order.ob_book_id + order.order.order_id,
        bookId: order.ob_book_id,
        name: order.book.book_title,
        price: order.book.book_spe_price,
        quantity: order.ob_quantity,
        imageSrc: order.book.book_img,
        billId: order.order.order_id,
        status: order.ob_status,
        billStatus: order.order.order_status,
        date: order.create_time,
      };
    });

    return formattedListOrders;
  };

  static getAllOrder = async ({ userId }) => {
    const foundOrder = await db.order.findOne({
      where: { order_user_id: userId },
    });
    if (!foundOrder) throw new NotFoundError("Order not found");

    const foundDetailOrder = await db.order_book.findAll({
      where: { ob_order_id: foundOrder.dataValues.order_id },
    });
    if (!foundDetailOrder) throw new NotFoundError("Order not found");

    return {
      order: foundOrder,
      order_book: foundDetailOrder,
    };
  };
}
module.exports = OrderService;
