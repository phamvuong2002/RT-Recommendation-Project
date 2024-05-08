"use strict";

const { SuccessResponse } = require("../core/success.response");
const DiscountService = require("../services/discount.service");

class DiscountController {
  
  collectDiscount = async (req, res, next) =>{
    const data = await DiscountService.collectDiscount(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  getDiscountWallet = async (req, res, next) =>{
    const data = await DiscountService.getDiscountWallet(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  getDiscountAmount = async (req, res, next) =>{
    const data = await DiscountService.getDiscountAmount(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
  
  applyDiscount = async (req, res, next) =>{
    const data = await DiscountService.applyDiscount(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  createDiscount = async (req, res, next) =>{
    const data = await DiscountService.createDiscount(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
}

module.exports = new DiscountController();
