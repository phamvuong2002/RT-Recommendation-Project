"use strict";

const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/address.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/create", asyncHandler(addressController.createAddress));
router.post("/getaddresses", asyncHandler(addressController.getAddresses));
router.post("/remove", asyncHandler(addressController.removeAddress));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
