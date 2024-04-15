'use strict'

const db = require('../models/sequelize/models')
const { BadRequestError } = require('../core/error.response');

class BookService {

    static getAllBook = async () => {
        return await db.book.findAll();
    }
}
module.exports = BookService;