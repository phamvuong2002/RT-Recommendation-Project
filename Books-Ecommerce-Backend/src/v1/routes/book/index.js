"use strict";

const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/book.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/all", asyncHandler(bookController.getAllBook));
router.post("/item", asyncHandler(bookController.getBookBySearchFilterSort));
router.post("/create", asyncHandler(bookController.createBook));
router.post("/getonebook", asyncHandler(bookController.getOneBook));
router.post("/:id", asyncHandler(bookController.getBookById));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
