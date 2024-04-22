"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError,ErrorResponse } = require('../core/error.response');
const OTP = require("../models/opt.model")
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { AUTH_EMAIL } = process.env;

class OTPService {

    static sendOTP = async ({ email, subject, message, duration = 1 }) => {
        try {
            if (!(email && subject && message)) {
                throw new BadRequestError("Provide values for email, subject, message");
            }

            //clear old record
            await OTP.deleteOne({ email });

            //generate pin
            const generatedOTP = await generateOTP();

            //send email
            const mailOptions = {
                from: AUTH_EMAIL,
                to: email,
                subject,
                html: `<p>${message}</p>
                <p 
                style="color:tomato; 
                font-szie:25px; 
                letter-spacing:2px;"> 
                <b> ${generatedOTP}</b> </p> 
                <p>This code <b>expires in ${duration} hour(s)</b>. </p>`,
            };
            await sendEmail(mailOptions);

            //save otp record
            const hashedOTP = await bcrypt.hash(generatedOTP, 10);
            const newOTP = await new OTP({
                email,
                otp: hashedOTP,
                createAt: Date.now(),
                expiresAt: Date.now() + 3600000 * +duration,
            });
            const createdOTPRecord = await newOTP.save();
            return createdOTPRecord;
        } catch (err) {
            throw err;
        }
    };


    static verifyOTP = async ({ email, otp }) => {
        try {
            if (!(email && otp)) {
                throw new BadRequestError("Provide values for email, otp");
            }

            //ensure otp record exists
            const matchedOTPRecord = await OTP.findOne({
                email,
            })
            if (!matchedOTPRecord) {
                throw  new BadRequestError("No otp records found.");
            }

            //check Expire date
            const { expiresAt } = matchedOTPRecord;
            if (expiresAt < Date.now()) {
                await OTP.deleteOne({ email });
                throw new ErrorResponse("Code has expired. Request for a new one.")
            }

            // verify the value if it is not expired yet
            const hashedOTP = matchedOTPRecord.otp;
            const validOTP = await bcrypt.compare(otp, hashedOTP);
            return validOTP;
        } catch (err) {
            throw err
        }
    }

    static deleteOTP = async (email) => {
        console.log('delete er')
        try {
            await OTP.deleteOne({ email });
        } catch (err) {
            throw err;
        }
    }


}
module.exports = OTPService;

