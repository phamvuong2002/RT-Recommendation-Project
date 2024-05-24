"use strict";

const db = require("../models/sequelize/models");

class RecommendationBooks {
  static async convertRecBooksHelper(
    books = [],
    key = "bookID",
    model_type = "content-based",
    optionKey = null
  ) {
    const convertedBooks = [];
    for (const rec_book of books) {
      const bookData = await db.book.findByPk(rec_book[key]);
      if (bookData) {
        const convertedbook = {
          book: {
            book_id: bookData.book_id,
            book_img: bookData.book_img,
            book_title: bookData.book_title,
            book_categories: bookData.book_categories,
            book_spe_price: bookData.book_spe_price,
            book_old_price: bookData.book_old_price,
          },
          rec_type: model_type,
          ...(optionKey !== null && rec_book[optionKey]
            ? { data: rec_book[optionKey] }
            : {}),
        };
        convertedBooks.push(convertedbook);
      }
    }
    return convertedBooks;
  }
}
module.exports = RecommendationBooks;
