"use strict";

const { add } = require("lodash");
const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const { AuthFailureError } = require("../core/error.response");

class AccessController {
  setSession = async (req, res, next) => {
    req.session.user = { name: req.body.username || "Guest", status: "ok" };
    // res.send('SET OK!');
    console.log("set session::", req.session.id);
    res.status(201).json(req.session.user);
  };

  getSession = async (req, res, next) => {
    console.log("get session::", req.session?.id);
    new SuccessResponse({
      metadata: { ...req.session.user, sessionid: req.session.id },
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "Regiserted OK!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    const user = await AccessService.login(req.body);
    console.log(user);
    if (user) {
      req.session.user = {
        user: user.user,
        token: user.tokens.accessToken,
        sessionid: req.session.id,
      };
    } else {
      new AuthFailureError("Invalid Request");
    }
    new SuccessResponse({
      metadata: user,
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout OK!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "Get token success!",
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    }).send(res);
  };
}

module.exports = new AccessController();
