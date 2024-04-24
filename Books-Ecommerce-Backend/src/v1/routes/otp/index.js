"use strict";

const express = require("express");
const router = express.Router();
const OTPController = require("../../controllers/otp.controller");

const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/send", asyncHandler(OTPController.sendOTP))  ;

router.post("/verify", asyncHandler(OTPController.verifyOTP))  ;

// xem OTP đã tạo (test xong sẽ xóa)
router.get("/view", asyncHandler(OTPController.listOTP))  ;

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
