"use strict";

const { SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
    getAllOrder = async (req, res, next) => {
        const data = await OrderService.getAllOrder(req.body);
        new SuccessResponse({
            metadata: data,
        }).send(res);
    };


}

module.exports = new OrderController();
