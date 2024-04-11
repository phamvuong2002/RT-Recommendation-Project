'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();
const {getBooks} = require('../services/test.service');

// check apiKey
router.use(apiKey);
//check permissions
router.use(permission('0000'));

router.use('/v1/api', require('./access'));
router.use('/v1/api', require('./recommendation'));

module.exports = router