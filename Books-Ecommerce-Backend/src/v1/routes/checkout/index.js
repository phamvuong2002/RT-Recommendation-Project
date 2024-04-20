"use strict";

const express = require("express");
const router = express.Router();
const checkoutController = require("../../controllers/checkout.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/checkoutproductreview", asyncHandler(checkoutController.checkoutProductReview));
router.post("/checkoutcartreview", asyncHandler(checkoutController.checkoutCartReview));
router.post("/placeorder", asyncHandler(checkoutController.placeOrder));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
