"use strict";

const CollectService = require("../services/collect.behaviours.service");
const { SuccessResponse } = require("../core/success.response");

class CollectController {
  collectBehavior = async (req, res, next) => {
    const data = await CollectService.sendMessage(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new CollectController();
