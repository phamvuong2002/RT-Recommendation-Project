"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// check apiKey
router.use(apiKey);

router.use("/v1/api/category", require("./category"));
router.use("/v1/api/otp", require("./otp"));
router.use("/v1/api/sms", require("./sms"));
router.use("/v1/api/emailotp", require("./emailotp"));

router.use("/v1/api/recommendation", require("./recommendation"));
router.use("/v1/api/collect", require("./collect"));
router.use("/v1/api/book", require("./book"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/feedback", require("./feedback"));
router.use("/v1/api/order", require("./order"));
router.use("/v1/api/address", require("./address"));
router.use("/v1/api/cart", require("./cart"));
router.use("/v1/api/discount", require("./discount"));
router.use("/v1/api/checkout", require("./checkout"));
router.use("/v1/api/access", require("./access"));

//sudo role
router.use(permission("0030"));
router.use("/v1/api/sudo", require("./sudo"));

//check permissions - apply for admin
router.use("/v1/api/admin", require("./admin"));

module.exports = router;
