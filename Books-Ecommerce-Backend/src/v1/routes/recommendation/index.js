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

//implicit recommender 
router.post(
  "/behaviour/implicitRecommender",
  asyncHandler(recBehaviourSVDUserController.getBehaviourImplicitRecommenderBooks)
);

//svd
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
router.post(
  "/rating/svd/user",
  asyncHandler(recRatingController.getRatingSVDBooks)
);

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

//Get rec books
router.post(
  "/get/content-based/books",
  asyncHandler(recommendationController.getConBasRecBooks)
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
// top personal rec category
router.post(
  "/personal/categories",
  asyncHandler(recommendationController.getPersonalCategory)
);

//ContentBase
router.post(
  "/related-book/related-search",
  asyncHandler(ContentBaseController.getRecommendByContentBase)
);

//ContentBase-Faiss
router.post(
  "/related-book/faiss/related-search",
  asyncHandler(ContentBaseController.getRecommendByContentBaseFaiss)
);

//ContentBase-recent books
router.post(
  "/related-book/faiss/recent-books",
  asyncHandler(ContentBaseController.getRecommendByRecentBooks)
);

//ContentBase-byID
router.post(
  "/related-book/related",
  asyncHandler(ContentBaseController.getRecommendByContentBaseID)
);

router.post(
  "/related-book/suggestion",
  asyncHandler(ContentBaseController.getSuggestedBook)
);

//search recommendations results
router.post(
  "/search/rec-books",
  asyncHandler(recommendationController.searchRecBooks)
);

module.exports = router;
