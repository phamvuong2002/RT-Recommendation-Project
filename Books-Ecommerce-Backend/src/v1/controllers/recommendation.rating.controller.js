"use strict";

const { add } = require("lodash");
const RecommendationRatingService = require("../services/recommend.rating.service");
const { SuccessResponse } = require("../core/success.response");

class RecommendationRatingController {
  getRatingSVDBooks = async (req, res, next) => {
    // console.log('a')
    const data = await RecommendationRatingService.getRatingSVDBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getRatingUserBooks = async (req, res, next) => {
    // console.log('a')
    const data = await RecommendationRatingService.getRatingUserBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getRatingContentBooks = async (req, res, next) => {
    // console.log('a')
    const data = await RecommendationRatingService.getRatingContentBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getRatingPopularBooks = async (req, res, next) => {
    // console.log('a')
    const data = await RecommendationRatingService.getRatingPopularBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new RecommendationRatingController();
