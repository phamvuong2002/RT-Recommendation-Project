"use strict";

const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/category.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/all",asyncHandler(CategoryController.getAllCategory))
router.post("/top",asyncHandler(CategoryController.getTop3Category))



///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
