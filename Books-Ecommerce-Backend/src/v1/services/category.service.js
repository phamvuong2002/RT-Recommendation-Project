"use strict";

const userModel = require("../models/user.model");

const db = require("../models/sequelize/models")


class CategoryService {

  // Info for: Profile info page
  static getAllCategory = async () => {
    return await db.category_1.findAll({
      include: [
        {
          model: db.category_2, as:'submenu',
          include: [
            {
              model: db.category_3, as:'submenu',
              include: [{
                model: db.category_4, as:'submenu',
                attributes: [['cate4_id', 'id'], ['cate4_name', 'name'],['cate3_id','parent']
                  /* list the wanted attributes here */
                ],
 
              }]
              ,
              attributes: [['cate3_id', 'id'], ['cate3_name', 'name'],['cate2_id','parent']]
            }],
          attributes: [['cate2_id', 'id'], ['cate2_name', 'name'],['cate1_id','parent']]
        },
      ],
      attributes: [['cate1_id', 'id'], ['cate1_name', 'name']]
    });;
  }

  static getTop3Category = async () => {
    return await db.category_1.findAll({
      include: [
        {
          model: db.category_2, as:'submenu',
          include: [
            {
              model: db.category_3, as:'submenu',
              right:true,
              attributes: [['cate3_id', 'id'], ['cate3_name', 'name']],
             
            }], 
          
          attributes: [['cate2_id', 'id'], ['cate2_name', 'name']]
        },
      ],
      attributes: [['cate1_id', 'id'], ['cate1_name', 'name']]
    });;
  }
}
module.exports = CategoryService;

