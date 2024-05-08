"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//set session
router.post("/login-guest", asyncHandler(accessController.loginGuest));

//set session
router.post("/set-session", asyncHandler(accessController.setSession));

//get session
router.post("/get-session", asyncHandler(accessController.getSession));

//signUp
router.post("/signup", asyncHandler(accessController.signUp));
router.post("/signup_user", asyncHandler(accessController.signup_user));

//login
router.post("/login", asyncHandler(accessController.login));
router.post("/login_user", asyncHandler(accessController.login_user));
router.post("/login_sms", asyncHandler(accessController.login_sms));

///authentication////
router.use(authentication);
//////////////////////
//logout
router.post("/logout", asyncHandler(accessController.logout));
router.post(
  "/handleRefreshToken",
  asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
