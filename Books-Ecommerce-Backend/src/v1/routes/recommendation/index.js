"use strict";

const express = require("express");
const router = express.Router();
const recommendationController = require("../../controllers/recommendation.controller");
const bestSellingController = require("../../controllers/bestSelling.controller");
const recBehaviourController = require("../../controllers/recommendation.behaviour.controller");
const recBehaviourSVDUserController = require("../../controllers/recommendation.behaviour_svd_user.controller")
const recRatingController = require("../../controllers/recommendation.rating.controller")
const { asyncHandler } = require("../../auth/checkAuth");

//Get popular items
router.post("/popular", asyncHandler(recommendationController.getPopularBooks));
router.post(
  "/best-selling/books",
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

router.post(
  "/behaviour/svd",
  asyncHandler(recBehaviourSVDUserController.getBehaviourSVDBooks)
);

router.post(
  "/behaviour/user",
  asyncHandler(recBehaviourSVDUserController.getBehaviourALSUserBooks)
);

router.post(
  "/recBook",
  asyncHandler(recBehaviourSVDUserController.getRecBooks)
);

router.post(
  "/recRandomBook",
  asyncHandler(recBehaviourSVDUserController.getRandomRecBooks)
);

router.post(
  "/behaviour/retrain_svdpp",
  asyncHandler(recBehaviourSVDUserController.retrainBehaviourSVDpp)
);

//Rating
router.post(
  "/rating/svd",
  asyncHandler(recRatingController.getRatingSVDBooks)
);

router.post(
  "/rating/user",
  asyncHandler(recRatingController.getRatingUserBooks)
);


//Category
router.post(
  "/best-selling/categories",
  asyncHandler(bestSellingController.getBestSellingCategories)
);

module.exports = router;
