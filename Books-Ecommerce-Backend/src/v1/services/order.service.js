"use strict";
const db = require("../models/sequelize/models");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class OrderService {
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
