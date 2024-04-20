"use strict";

const { SuccessResponse } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
  
  getUserInfo = async (req, res, next) =>{
    const data = await UserService.getUserInfo(req.body );
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  updateProfile = async (req, res, next) =>{
    console.log('in update')
    const data = await UserService.updateProfile(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  addUserDB = async (req, res, next) =>{
    const data = await UserService.addUserDB(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
}

module.exports = new UserController();
