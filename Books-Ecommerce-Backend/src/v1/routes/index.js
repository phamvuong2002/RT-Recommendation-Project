'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();


// category
router.use('/v1/api/category', require('./category'));
router.use('/v1/api/otp', require('./otp'));
router.use('/v1/api/emailVerification', require('./emailVerification'));

// check apiKey
//router.use(apiKey);
//check permissions
//router.use(permission('0000'));
router.use('/v1/api/book', require('./book'));
router.use('/v1/api/user', require('./user'));

router.use('/v1/api/book', require('./book'));
router.use('/v1/api/cart', require('./cart'));
router.use('/v1/api/discount', require('./discount'));
router.use('/v1/api/checkout', require('./checkout'));
router.use('/v1/api/access', require('./access'));



module.exports = router