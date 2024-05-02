"use strict";

const { SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
  getOneOrder = async (req, res, next) => {
    const data = await OrderService.getOneOrder(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getOrders = async (req, res, next) => {
    const data = await OrderService.getOrders(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getAllOrder = async (req, res, next) => {
    const data = await OrderService.getAllOrder(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new OrderController();
