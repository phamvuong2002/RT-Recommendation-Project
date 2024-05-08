"use strict";

const { add } = require("lodash");
const RecommendationService = require("../services/recommendation.service");
const { SuccessResponse } = require("../core/success.response");

class RecommendationPopularController {
  getPopularBooks = async (req, res, next) => {
    const data = await RecommendationService.getPopularBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new RecommendationPopularController();
