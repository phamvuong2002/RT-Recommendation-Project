"use strict";

const express = require("express");
const router = express.Router();
const recommendationController = require("../../controllers/recommendation.controller");
const bestSellingController = require("../../controllers/bestSelling.controller");
const recBehaviourController = require("../../controllers/recommendation.behaviour.controller");
const ContentBaseController = require("../../controllers/recommendation.contentbase.controller");
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

//Category
router.post(
  "/best-selling/categories",
  asyncHandler(bestSellingController.getBestSellingCategories)
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
