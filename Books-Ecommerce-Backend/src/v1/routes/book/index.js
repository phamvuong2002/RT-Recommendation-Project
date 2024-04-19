"use strict";

const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/book.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/all", asyncHandler(bookController.getAllBook));
router.post("/search", asyncHandler(bookController.searchBooks));


///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
