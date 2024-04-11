'use strict'

const apiKeyModel = require("../models/apiKey.model");
const crypto = require('crypto');
const findById = async (key) => {
    // const createApikey =  await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']});
    // console.log('createApikey::', createApikey);

    const objkey = await apiKeyModel.findOne({key, status: true}).lean();
    return objkey;
}

module.exports = {
    findById
}