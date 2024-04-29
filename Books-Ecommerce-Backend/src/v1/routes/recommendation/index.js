"use strict";

const express = require("express");
const router = express.Router();
const recommendationController = require("../../controllers/recommendation.controller");
const { asyncHandler } = require("../../auth/checkAuth");

//Get popular items
router.post("/popular", asyncHandler(recommendationController.getPopularBooks));

module.exports = router;
