"use strict";

const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");
const collectionController = require("../../controllers/collect.behaviours.controller");

//sendOTP
router.post("/behaviour", asyncHandler(collectionController.collectBehavior));

module.exports = router;
