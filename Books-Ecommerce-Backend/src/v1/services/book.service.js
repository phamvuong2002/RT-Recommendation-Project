"use strict";
const { Op, Sequelize } = require("sequelize");
const db = require("../models/sequelize/models");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class BookService {
  static getOneBook = async ({ bookId }) => {
    const foundBook = await db.book.findOne({
      where: { book_id: bookId, book_status: 1 },
    });
    if (!foundBook) throw new NotFoundError("Book not found");

    const foundDetailBook = await db.book_detail.findOne({
      where: { book_id: bookId },
    });
    if (!foundDetailBook) throw new NotFoundError("Book not found");

    return {
      book: foundBook,
      book_detail: foundDetailBook,
    };
  };

  static createBook = async (bookData) => {
    const newBook = await db.book.create({
      book_id: bookData.book_id,
      book_title: bookData.book_title,
      book_categories: bookData.book_categories,
      book_authors: bookData.book_authors,
      book_publisherId: bookData.book_publisherId,
      book_supplierId: bookData.book_supplierId,
      book_layoutId: bookData.book_layoutId,
      book_img: bookData.book_img,
      book_avg_rating: bookData.book_avg_rating,
      book_num_rating: bookData.book_num_rating,
      book_spe_price: bookData.book_spe_price,
      book_old_price: bookData.book_old_price,
      book_status: bookData.book_status,
      is_deleted: bookData.is_deleted,
      sort: bookData.sort,
    });
    return newBook;
  };

  static getAllBook = async () => {
    return await db.book.findAll({
      where: {
        book_status: 1,
      },
      limit: 5,
    });
  };

  static getBookById = async (bookId) => {
    let bookData = await db.book.findOne({
      where: {
        book_id: bookId,
      },
    });
    return bookData;
  };

  static getBookSearchFilterSort = async (
    search,
    categories,
    price,
    publisher,
    sortBy,
    page,
    limit
  ) => {
    let whereClause = {};
    let include = [];
    let categoriesId = [];
    let minPrice = 0;
    let maxPrice = 0;
    if (search) {
      whereClause.book_title = { [Op.like]: `%${search}%` };
    }

    //find categoriesid by name
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        //console.log("categories", categories[i])
        if (i === 0) {
          let categorData = await db.category_1.findOne({
            where: {
              cate1_sid: categories[i],
            },
          });
          categoriesId.push(categorData.dataValues.cate1_id);
        } else if (i === 1) {
          let categorData = await db.category_2.findOne({
            where: {
              cate2_sid: categories[i],
            },
          });
          categoriesId.push(categorData.dataValues.cate2_id);
        } else if (i === 2) {
          let categorData = await db.category_3.findOne({
            where: {
              cate3_sid: categories[i],
            },
          });
          categoriesId.push(categorData.dataValues.cate3_id);
        } else {
          let categorData = await db.category_4.findOne({
            where: {
              cate4_sid: categories[i],
            },
          });
          categoriesId.push(categorData.dataValues.cate4_id);
        }
      }
      if (categoriesId && categoriesId.length > 0) {
        whereClause[Op.and] = categoriesId.map((category, index) => {
          return Sequelize.literal(
            `JSON_EXTRACT(book_categories, '$[${index}]') = ${category}`
          );
        });
      }
    }

    if (publisher) {
      include.push({
        model: db.publisher,
        where: { pub_slug: publisher },
      });
    }

    if (price && price.length > 0) {
      minPrice = parseFloat(price[0]);
      maxPrice = parseFloat(price[1]);
      whereClause.book_spe_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }

    let order = [];
    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split("_");
      if (sortField === "price") {
        order.push(["book_spe_price", sortOrder === "desc" ? "DESC" : "ASC"]);
      } else if (sortField === "publishedDate") {
        order.push(["create_time", sortOrder === "desc" ? "DESC" : "ASC"]);
      }
    }

    const { count, rows: books } = await db.book.findAndCountAll({
      where: whereClause,
      include: include,
      order: order,
      offset: page * limit,
      limit: limit,
    });

    const pagination = {
      _page: page + 1,
      _limit: limit,
      _totalRows: count,
    };
    return {
      productData: books,
      pagination,
    };
  };
}
module.exports = BookService;
