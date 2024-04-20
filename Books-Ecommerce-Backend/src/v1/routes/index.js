'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();


// category
router.use('/v1/api/category', require('./category'));

// check apiKey
//router.use(apiKey);
//check permissions
//router.use(permission('0000'));
router.use('/v1/api/book', require('./book'));
router.use('/v1/api/user', require('./user'));

router.use('/v1/api/access', require('./access'));
router.use('/v1/api/book', require('./book'));
router.use('/v1/api/cart', require('./cart'));
router.use('/v1/api/discount', require('./discount'));



module.exports = router