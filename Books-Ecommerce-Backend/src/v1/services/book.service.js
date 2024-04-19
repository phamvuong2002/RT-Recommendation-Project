'use strict'
const { Op, Sequelize } = require('sequelize');
const db = require('../models/sequelize/models')
const { BadRequestError } = require('../core/error.response');

class BookService {
    static getAllBook = async () => {
        return await db.book.findAll();
    }

    static getBookFilter = async (search, categories, sortBy, page, limit) => {
        let whereClause = {};
        if (search) {
            whereClause.book_title = { [Op.like]: `%${search}%` };
        }
        if (categories && categories.length > 0) {
            whereClause[Op.and] = categories.map((category, index) => {
                return Sequelize.literal(`JSON_EXTRACT(book_categories, '$[${index}]') = ${category}`);
            });
        }

        let order = [];
        if (sortBy) {
            const [sortField, sortOrder] = sortBy.split('_');
            if (sortField === 'price') {
                order.push(['book_spe_price', sortOrder === 'desc' ? 'DESC' : 'ASC']);
            } else {
                order.push([sortField, sortOrder === 'desc' ? 'DESC' : 'ASC']);
            }
        }


        const { count, rows: books } = await db.book.findAndCountAll({
            where: whereClause,
            order: order,
            offset: page * limit,
            limit: limit
        });

        const pagination = {
            _page: page + 1,
            _limit: limit,
            _totalRows: count
        };

        return { productData: books, pagination };
    }
}
module.exports = BookService;