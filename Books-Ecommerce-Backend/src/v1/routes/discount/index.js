"use strict";

const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/discount.cotroller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/collectdiscount", asyncHandler(discountController.collectDiscount));
router.post("/getdiscountwallet", asyncHandler(discountController.getDiscountWallet));
router.post("/getdiscountamount", asyncHandler(discountController.getDiscountAmount));
router.post("/applydiscount", asyncHandler(discountController.applyDiscount));
router.post("/creatediscount", asyncHandler(discountController.createDiscount));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
