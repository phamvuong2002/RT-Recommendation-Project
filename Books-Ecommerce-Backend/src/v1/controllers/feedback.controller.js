"use strict";

const { SuccessResponse } = require("../core/success.response");
const FeedBackService = require("../services/feedback.service");

class FeedbackController {
  summary = async (req, res, next) => {
    const data = await FeedBackService.summary(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getFeedbackByBookId = async (req, res, next) => {
    const data = await FeedBackService.getFeedbackByBookId(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  isFeedback = async (req, res, next) => {
    const data = await FeedBackService.isFeedback(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  submitFeedback = async (req, res, next) => {
    const data = await FeedBackService.submitFeedback(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new FeedbackController();
