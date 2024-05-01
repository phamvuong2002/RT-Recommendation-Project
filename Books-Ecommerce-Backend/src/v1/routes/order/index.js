"use strict";

const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/getorder", asyncHandler(orderController.getAllOrder));
router.post("/getorders", asyncHandler(orderController.getOrders));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
