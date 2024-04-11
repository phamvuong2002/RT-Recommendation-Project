"use strict";

const { add } = require("lodash");
const RecommendationPopularService = require("../services/recommendation.popular.service");

class RecommendationPopularController {
  
  getPopularItems = async (req, res, next) =>{
    const data = await RecommendationPopularService.getPopularItems();
    return res.status(200).json(data);
  }

}

module.exports = new RecommendationPopularController();
