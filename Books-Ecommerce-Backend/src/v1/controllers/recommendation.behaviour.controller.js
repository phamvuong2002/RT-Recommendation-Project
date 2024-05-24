"use strict";

const { add } = require("lodash");
const RecommendationBehaviourService = require("../services/recommendation.behaviour.service");
const { SuccessResponse } = require("../core/success.response");

class RecommendationBehaviourController {
  getBehaviourContentBooks = async (req, res, next) => {
    const data = await RecommendationBehaviourService.getBehaviourContentBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new RecommendationBehaviourController();
