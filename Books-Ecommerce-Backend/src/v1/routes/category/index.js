"use strict";

const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/category.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.get("/",asyncHandler(CategoryController.getAllCategory))
router.get("/top",asyncHandler(CategoryController.getTop3Category))



///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
