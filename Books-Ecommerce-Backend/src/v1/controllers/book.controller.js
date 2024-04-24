"use strict";

const { SuccessResponse } = require("../core/success.response");
const BookService = require("../services/book.service");

class BookController {

  createBook = async (req, res, next) => {
    const data = await BookService.createBook(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);

  }

  getAllBook = async (req, res, next) => {
    const data = await BookService.getAllBook();
    new SuccessResponse({
      metadata: data,
    }).send(res);
  }

  getBookById = async (req, res, next) => {
    let bookId = req.params.id
    const data = await BookService.getBookById(bookId);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  }

  getBookBySearchFilterSort = async (req, res) => {
    const { search, categories, sort, page = 1, limit = 24 } = req.query;
    try {
      const sortBy = sort ? sort : null;
      const cate = categories ? categories.split(',').map(Number) : null;
      const books = await BookService.getBookSearchFilterSort(search, cate, sortBy, parseInt(page - 1), parseInt(limit));
      new SuccessResponse({
        metadata: books,
      }).send(res);
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new BookController();
