"use strict";

const { SuccessResponse } = require("../core/success.response");
const AddressService = require("../services/address.service");

class AddressController {
  createAddress = async (req, res, next) => {
    const data = await AddressService.createAddress(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  getAddresses = async (req, res, next) => {
    const data = await AddressService.getAddresses(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  removeAddress = async (req, res, next) => {
    const data = await AddressService.removeAddress(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new AddressController();
