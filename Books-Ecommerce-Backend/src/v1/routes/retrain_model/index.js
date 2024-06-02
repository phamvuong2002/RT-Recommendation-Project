"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");
const recommendationRatingController = require("../../controllers/recommendation.rating.controller");

//Rating
router.post(
  "/retrain/rating-item-model",
  asyncHandler(recommendationRatingController.retrainRatingItemsModel)
);
