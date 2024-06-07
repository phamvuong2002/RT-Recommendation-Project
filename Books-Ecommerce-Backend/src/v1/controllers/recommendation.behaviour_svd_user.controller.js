"use strict";

const { add } = require("lodash");
const RecommendationBehaviourSVDUserService = require("../services/recommend.behaviour_svd_user.service");
const { SuccessResponse } = require("../core/success.response");

class RecommendationBehaviour_SVD_UserController {
  getBehaviourSVDBooks = async (req, res, next) => {
    const data = await RecommendationBehaviourSVDUserService.getBehaviourSVDBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getBehaviourALSUserBooks = async (req, res, next) => {
    const data = await RecommendationBehaviourSVDUserService.getBehaviourUserBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getRecBooks = async (req, res, next) => {
    const data = await RecommendationBehaviourSVDUserService.getLatestRecBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getRandomRecBooks = async (req, res, next) => {
    const data = await RecommendationBehaviourSVDUserService.getRandomCollabRecBooks(
      req.body
    );
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
 
}

module.exports = new RecommendationBehaviour_SVD_UserController();
