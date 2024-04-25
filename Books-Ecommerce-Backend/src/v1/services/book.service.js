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
    console.log("bookData", bookData);
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
    });
  };

  static getBookById = async (bookId) => {
    let bookData = await db.book.findOne({
      where: {
        book_id: bookId
      }
    });
    return bookData
  }

  static getBookSearchFilterSort = async (search, categories, price, publisher, sortBy, page, limit) => {
    let whereClause = {};
    let include = [];
    let minPrice = 0;
    let maxPrice = 0;
    if (search) {
      whereClause.book_title = { [Op.like]: `%${search}%` };
    }

    if (categories && categories.length > 0) {

      whereClause[Op.and] = categories.map((category, index) => {
        return Sequelize.literal(`JSON_EXTRACT(book_categories, '$[${index}]') = ${category}`);
      });
    }

    if (publisher) {
      include.push({
        model: db.publisher,
        where: { pub_slug: publisher }
      });
    }

    if (price && price.length > 0) {
      minPrice = parseFloat(price[0])
      maxPrice = parseFloat(price[1])
      whereClause.book_spe_price = {
        [Op.between]: [minPrice, maxPrice]
      };
    }

    let order = [];
    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split("_");
      if (sortField === "price") {
        order.push(["book_spe_price", sortOrder === "desc" ? "DESC" : "ASC"]);
      } else if (sortField === 'publishedDate') {
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


  }

}
module.exports = BookService;
