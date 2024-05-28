"use strict";

const { add } = require("lodash");
const BestSellingService = require("../services/bestSelling.redis");
const { SuccessResponse } = require("../core/success.response");

class BestSellingController {
  getBestSellingCategories = async (req, res, next) => {
    const data = await BestSellingService.getBestSellingCategories(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getBestSellingBooks = async (req, res, next) => {
    const data = await BestSellingService.getBestSellingBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  searchBestSellingBooks = async (req, res, next) => {
    const data = await BestSellingService.searchBestSellingBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new BestSellingController();
