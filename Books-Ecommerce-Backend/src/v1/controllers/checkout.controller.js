"use strict";

const { SuccessResponse } = require("../core/success.response");
const CheckoutService = require("../services/checkout.service");

class CheckoutController {
  
  placeOrder = async (req, res, next) =>{
    const data = await CheckoutService.placeOrder(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  checkoutProductReview = async (req, res, next) =>{
    const data = await CheckoutService.checkoutProductReview(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  checkoutCartReview = async (req, res, next) =>{
    const data = await CheckoutService.checkoutCartReview(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
}

module.exports = new CheckoutController();
