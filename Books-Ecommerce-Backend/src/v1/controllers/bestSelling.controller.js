"use strict";

const { add } = require("lodash");
const BestSellingService = require("../services/bestSelling.redis");
const { SuccessResponse } = require("../core/success.response");

class BestSellingController {
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
