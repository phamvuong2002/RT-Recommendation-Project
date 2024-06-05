"use strict";

const express = require("express");
const router = express.Router();
const recommendationController = require("../../controllers/recommendation.controller");
const bestSellingController = require("../../controllers/bestSelling.controller");
const recBehaviourController = require("../../controllers/recommendation.behaviour.controller");
const ContentBaseController = require("../../controllers/recommendation.contentbase.controller");
const recBehaviourSVDUserController = require("../../controllers/recommendation.behaviour_svd_user.controller");
const recRatingController = require("../../controllers/recommendation.rating.controller");
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
  "/recLatestBook", 
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
router.post("/rating/svd", asyncHandler(recRatingController.getRatingSVDBooks));

router.post(
  "/rating/user",
  asyncHandler(recRatingController.getRatingUserBooks)
);

router.post(
  "/rating/content",
  asyncHandler(recRatingController.getRatingContentBooks)
);

router.post(
  "/rating/popular",
  asyncHandler(recRatingController.getRatingPopularBooks)
);

//Category
// bestelling category
router.post(
  "/best-selling/categories",
  asyncHandler(bestSellingController.getBestSellingCategories)
);
// popular recommendations category
router.post(
  "/popular/rec-categories",
  asyncHandler(recommendationController.getPopularRecCategories)
);

//ContentBase
router.post(
  "/related-book/related-search",
  asyncHandler(ContentBaseController.getRecommendByContentBase)
);

router.post(
  "/related-book/related",
  asyncHandler(ContentBaseController.getRecommendByContentBaseID)
);

router.post(
  "/related-book/suggestion",
  asyncHandler(ContentBaseController.getSuggestedBook)
);

module.exports = router;
