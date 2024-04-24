"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/getInfo", asyncHandler(userController.getUserInfo))  ;

router.post("/updateInfo", asyncHandler(userController.updateProfile))  ;

router.post("/", asyncHandler(userController.addUserDB))  ;

router.get("/mongo", asyncHandler(userController.getUserMongoDB))  ;


///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
