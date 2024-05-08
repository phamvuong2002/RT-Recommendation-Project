"use strict";

const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/removeallcarts", asyncHandler(cartController.removeAllCarts));
router.post("/getnumcart", asyncHandler(cartController.getNumCart));
router.post("/addtocart", asyncHandler(cartController.addToCart));
router.post("/getcarts", asyncHandler(cartController.getListCarts));
router.post(
  "/deletecartsbypub",
  asyncHandler(cartController.deleteCartsByPublisherId)
);

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
