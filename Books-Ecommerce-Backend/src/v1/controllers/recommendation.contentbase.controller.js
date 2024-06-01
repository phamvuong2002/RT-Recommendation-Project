"use strict";

const { add } = require("lodash");
const ContentBaseRecommendationService = require("../services/recommendation.contentbase.service");
const { SuccessResponse } = require("../core/success.response");

class ContentBaseRecommendationController {
    getRecommendByContentBase = async (req, res, next) => {
        const data = await ContentBaseRecommendationService.getRecommendByContentBase(
            req.body
        );
        new SuccessResponse({
            metadata: data,
        }).send(res);
    };

    getRecommendByContentBaseID = async (req, res, next) => {
        const data = await ContentBaseRecommendationService.getRecommendByContentBaseID(
            req.body
        );
        new SuccessResponse({
            metadata: data,
        }).send(res);
    };

    getSuggestedBook = async (req, res, next) => {
        const data = await ContentBaseRecommendationService.getSuggestedBook(
            req.body
        );
        new SuccessResponse({
            metadata: data,
        }).send(res);
    };
}

module.exports = new ContentBaseRecommendationController();
