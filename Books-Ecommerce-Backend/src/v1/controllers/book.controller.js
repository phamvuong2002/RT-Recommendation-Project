"use strict";

const { SuccessResponse } = require("../core/success.response");
const BookService = require("../services/book.service");

class BookController {
  
  getAllBook = async (req, res, next) =>{
    const data = await BookService.getAllBook();
    new SuccessResponse({
        metadata: data,
      }).send(res);
  }
}

module.exports = new BookController();
