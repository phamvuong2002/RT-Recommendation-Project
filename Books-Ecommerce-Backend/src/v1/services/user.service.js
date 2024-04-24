"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require('../core/error.response');
const db = require("../models/sequelize/models")
const sequelize = require("sequelize")
const { slugConverter } = require('../utils/convertToSlug')
// function to get slug version of user name


class UserService {

  static findByEmail = async ({
    email,
    select = {
      email: 1,
      status: 1,
      roles: 1,
      username: 1,
      password: 1,
      verify: 1,
    },
  }) => {
    return await userModel.findOne({ email }).select(select).lean();
  };


  // Get: User information
  static getUserInfo = async ({ userId }) => {
    const user = await db.user.findOne({ where: { user_id: userId } });
    console.log(user)
    if (!user) {
      throw new NotFoundError('User not found');
    }
    let userInfo = await db.user.findOne({
      attributes: [
        ['user_username', 'fullname'],
        ['user_email', 'email'],
        ['user_phone', 'phonenumber'],
        ['user_sex', 'sex'],
        ['user_slug', 'slug'],

        [sequelize.fn('DATE', sequelize.col('user_day_of_birth')), 'birthday']
      ],
      where: {
        user_id: userId,
      },
    });;

    return {
      user_data: userInfo
    }
  }

  // Update: Update user profile: including Name, Sex, Date of birth
  static updateProfile = async ({ updatedField, updatedValue, userId }) => {
    // Khởi tạo mảng giá trị Giới tính
    let genderList = ['male', 'female', 'unknown']
    console.log(updatedField, updatedValue, userId)
    // Tìm user 
    let userInfo = await db.user.findOne({
      where: { user_id: userId }
    });

    //Không tìm thấy --> Lỗi
    if (!userInfo) {
      throw new NotFoundError('User not found');
    }
    console.log(userInfo)
    //Nếu giá trị update rỗng --> Trả về record cũ
    if (updatedValue == null || updatedValue == '') {
      return { user_info: userInfo }
    }

    let field = ''
    let updated_slug = ''

    switch (updatedField) {
      case 'name':
        field = 'user_username'
        updated_slug = slugConverter(updatedValue)
        console.log(updated_slug)
        break;
      case 'sex':
        if (!genderList.includes(updatedValue)) {
          throw new BadRequestError('Invalid gender value');
        }
        field = 'user_sex'
        break;
      case 'dob':
        field = 'user_day_of_birth'
        break;

      case 'email':
        field = 'user_email'
        break
      case 'pw':
        field = 'user_password'
      case 'phonenumber':
        field = 'user_phone'
      default:
        throw new BadRequestError('Request data is not valid');
    }
    let result = false;
    // Update
    try {
      //update tên
      if (updated_slug.length > 0) {
        await userInfo.set(
          {
            [field]: updatedValue,
            user_slug: updated_slug
          },
        );
      }
      else {
        await userInfo.set(
          {
            [field]: updatedValue,
          },
        );
      }
      result = true
      userInfo.save()
    } catch (err) {
      // console.log('er here')
      throw new BadRequestError(err.message);
    }

    return {
      user_data: await UserService.getUserInfo({ userId }),
      update_result: result
    };
  }


  //  Add user to Mysql DB
  static addUserDB = async ({ name, email, pw }) => {
    if (name == null || name == '') {
      throw new BadRequestError('Name cannot be null');
    }
    const slug_name = slugConverter(name)
    const passwordHash = await bcrypt.hash(pw, 10);


    console.log("passwordHash::", passwordHash);
    let new_user = await db.user.create({
      // them thuoc tinh mac dinh
      user_username: name,
      user_password: passwordHash,
      user_salf: '',
      user_slug: slug_name,
      user_email: email,
      user_phone: '',
      user_sex: '',
      user_avatar: '',
    });
    // console.log(new_user)
    return {
      user_data: new_user
    }
  }


  // Để xem người dùng có trong DB (test xong sẽ xóa)
  static getUserMongoDB = async () => {
    return await userModel.find({}).lean();
  };


}
module.exports = UserService;

