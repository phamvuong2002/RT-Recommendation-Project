"use strict";

const express = require("express");
const router = express.Router();
const feedbackController = require("../../controllers/feedback.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/summary", asyncHandler(feedbackController.summary));
router.post("/submit", asyncHandler(feedbackController.submitFeedback));
router.post("/check", asyncHandler(feedbackController.isFeedback));
router.post(
  "/getfeedback",
  asyncHandler(feedbackController.getFeedbackByBookId)
);

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
