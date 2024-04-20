"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { BadRequestError, NotFoundError } = require('../core/error.response');
const db = require("../models/sequelize/models")

// function to get slug version of user name
function slug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

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
  static getUserInfo = async ({ id }) => {
    const user = await db.user.findOne({ where: { user_id: id } });
    console.log(user)
    if (!user) {
      throw new NotFoundError('User not found');
    }
    let userInfo = await db.user.findOne({
      attributes: [
        ['user_username', 'name'],
        ['user_email', 'email'],
        ['user_phone', 'phone'],
        ['user_sex', 'sex'],
        ['user_day_of_birth', 'dob']
      ],
      where: {
        user_id: id,
      },
    });;

    return {
      user_data: userInfo
    }
  }

  // Update: Update user profile: including Name, Sex, Date of birth
  static updateProfile = async ({ updatedField, updatedValue, id }) => {
    // Khởi tạo mảng giá trị Giới tính
    let genderList = ['Nam', 'Nữ']
    console.log(updatedField, updatedValue, id)
    // Tìm user 
    let userInfo = await db.user.findOne({
      where: { user_id: id }
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
    switch (updatedField) {
      case 'name':
        field = 'user_username'
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
      default:
        throw new BadRequestError('Request data is not valid');
    }

    // Update
    try {
      console.log('in update querry ' + id)
      console.log(userInfo)
      await userInfo.update(
        {
          [field]: updatedValue,
          where: {
            user_id: { id },
          },
        },
      );
    } catch (err) {
      console.log('er here')
      throw new BadRequestError(err.message);
    }

    return await UserService.getUserInfo({ id });
  }


  //  Add user to Mysql DB
  static addUserDB = async ({ name, email, pw }) => {
    if (name == null || name == '') {
      throw new BadRequestError('Name cannot be null');
    }
    
    const passwordHash = await bcrypt.hash(pw, 10);
    console.log("passwordHash::", passwordHash);
    let new_user = await db.user.create({
      // them thuoc tinh mac dinh
      user_username: name,
      user_password: passwordHash,
      user_salf: '',
      user_slug: slug(name),
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



}
module.exports = UserService;

