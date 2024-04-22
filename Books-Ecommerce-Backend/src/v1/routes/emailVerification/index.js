"use strict";

const express = require("express");
const router = express.Router();
const emailVerificationController = require("../../controllers/emailVerification.controller");

const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/send", asyncHandler(emailVerificationController.sendEmailVerification))  ;
router.post("/verify", asyncHandler(emailVerificationController.verifyEmail))  ;


///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
