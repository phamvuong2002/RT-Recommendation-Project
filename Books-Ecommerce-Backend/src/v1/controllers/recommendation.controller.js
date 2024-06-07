"use strict";

const { add } = require("lodash");
const RecommendationService = require("../services/recommendation.service");
const { SuccessResponse } = require("../core/success.response");

class RecommendationPopularController {
  //get content based rec book
  getConBasRecBooks = async (req, res, next) => {
    const data = await RecommendationService.getConBasRecBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  //search rec book
  searchRecBooks = async (req, res, next) => {
    const data = await RecommendationService.searchRecBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  //get top Personal category
  getPersonalCategory = async (req, res, next) => {
    const data = await RecommendationService.getPersonalCategory(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getPopularBooks = async (req, res, next) => {
    const data = await RecommendationService.getPopularBooks(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getPopularRecCategories = async (req, res, next) => {
    const data = await RecommendationService.getPopularRecCategories(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new RecommendationPopularController();
