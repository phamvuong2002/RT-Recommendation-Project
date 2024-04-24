"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const favoritebookController = require("../../controllers/favoritebook.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.get("/profile-infomation", asyncHandler(userController.getUserInfo));
router.put("/profile-infomation", asyncHandler(userController.updateProfile));

router.get("/general-infomation", asyncHandler(userController.getUserInfo));
router.put("/general-infomation", asyncHandler(userController.updateProfile));

router.post("/", asyncHandler(userController.addUserDB));

router.post("/favorite-book", asyncHandler(favoritebookController.getListFavoriteBook));
router.post("/favorite-book/handlefavbook", asyncHandler(favoritebookController.addFavoriteBook));



///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
