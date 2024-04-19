"use strict";

const { SuccessResponse } = require("../core/success.response");
const BookService = require("../services/book.service");

class BookController {

  getAllBook = async (req, res, next) => {
    const data = await BookService.getAllBook();
    new SuccessResponse({
      metadata: data,
    }).send(res);
  }

  searchBooks = async (req, res) => {
    const { search, categories, sort, page = 1, limit = 1 } = req.query;
    try {
      const sortBy = sort ? sort : null;
      const cate = categories ? categories.split(',').map(Number) : null;
      const books = await BookService.getBookFilter(search, cate, sortBy, parseInt(page - 1), parseInt(limit));
      return res.json(books);
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new BookController();
