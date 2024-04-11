"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//set session
router.post("/access/set-session", asyncHandler(accessController.setSession));

//get session
router.post("/access/get-session", asyncHandler(accessController.getSession));

//signUp
router.post("/access/signup", asyncHandler(accessController.signUp));

//login
router.post("/access/login", asyncHandler(accessController.login));

///authentication////
router.use(authentication);
//////////////////////
//logout
router.post("/access/logout", asyncHandler(accessController.logout));
router.post(
  "/access/handleRefreshToken",
  asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
