"use strict";

const express = require("express");
const router = express.Router();
const PublisherController = require("../../controllers/publisher.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");



router.post("/all", asyncHandler(PublisherController.getAllPublisher))  ;





///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
