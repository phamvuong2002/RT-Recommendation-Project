"use strict";

const db = require("../models/sequelize/models")

class CategoryService {

  // Info for: Profile info page
  static getAllCategory = async () => {
    
    const category= await db.category_1.findAll({
      include: [
        {
          model: db.category_2, as:'submenu',
          include: [
            {
              model: db.category_3, as:'submenu',
              include: [{
                model: db.category_4, as:'submenu',
                attributes: [['cate4_id', 'id'], ['cate4_name', 'name'],['cate3_sid','parent'], ['cate4_slug','name_slug']
                  /* list the wanted attributes here */
                ],

              }]
              ,
              attributes: [['cate3_id', 'id'], ['cate3_name', 'name'],['cate2_sid','parent'],['cate3_slug','name_slug']]
            }],
          attributes: [['cate2_id', 'id'], ['cate2_name', 'name'],['cate1_sid','parent'],['cate2_slug','name_slug']]
        },
      ],
      attributes: [['cate1_id', 'id'], ['cate1_name', 'name'],['cate1_slug','name_slug']]
    });;

    return {
      categoryData:category
    }
  }

  static getTop3Category = async () => {
   const category= await db.category_1.findAll({
      include: [
        {
          model: db.category_2, as:'submenu',
          include: [
            {
              model: db.category_3, as:'submenu',
              right:true,
              attributes: [['cate3_id', 'id'], ['cate3_name', 'name'],['cate3_slug','name_slug']],
             
            }], 
          
          attributes: [['cate2_id', 'id'], ['cate2_name', 'name'],['cate2_slug','name_slug']]
        },
      ],
      attributes: [['cate1_id', 'id'], ['cate1_name', 'name'],['cate1_slug','name_slug']]
    });;
    return {
      categoryData: category
    }
  }
}
module.exports = CategoryService;

