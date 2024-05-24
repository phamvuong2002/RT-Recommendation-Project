"use strict";

const express = require("express");
const router = express.Router();
const recommendationController = require("../../controllers/recommendation.controller");
const bestSellingController = require("../../controllers/bestSelling.controller");
const recBehaviourController = require("../../controllers/recommendation.behaviour.controller");
const { asyncHandler } = require("../../auth/checkAuth");

//Get popular items
router.post("/popular", asyncHandler(recommendationController.getPopularBooks));
router.post(
  "/best-selling",
  asyncHandler(bestSellingController.getBestSellingBooks)
);
router.post(
  "/search-best-selling",
  asyncHandler(bestSellingController.searchBestSellingBooks)
);

//Behaviour
router.post(
  "/behaviour/content",
  asyncHandler(recBehaviourController.getBehaviourContentBooks)
);

module.exports = router;
