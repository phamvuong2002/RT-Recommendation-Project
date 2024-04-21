"use strict";

const { SuccessResponse } = require("../core/success.response");
const emailVerificationService = require("../services/emailVerification.service");

class emailVerificationController {
  
  sendEmailVerification = async (req, res, next) =>{
    console.log('otp email'+ req.body)
    const data = await emailVerificationService.sendVerificationOTPEmail(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

  verifyEmail = async (req, res, next) =>{
    console.log('verify email'+ req.body)
    const data = await emailVerificationService.verifyOTPEmail(req.body);
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }

 
}

module.exports = new emailVerificationController();
