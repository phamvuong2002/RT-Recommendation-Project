"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const db = require("../models/sequelize/models");

class FavoriteBookService {
    static getListFavoriteBook = async ({ userId }) => {
        console.log("userId", userId)
        const userFavoriteBook = await db.favorite_book.findOne({ where: { fav_userid: userId } });
        if (!userFavoriteBook) {
            throw new NotFoundError("User not found!");
        }
        const listFavoriteBook = await db.favorite_book_detail.findAll({
            where: { fb_fav_id: userFavoriteBook.dataValues.fav_id },
            include: [
                {
                    model: db.book,
                }
            ],
        });

        return listFavoriteBook;
    }

    static async createUserFavoriteBook({ userId }) {
        return await db.favorite_book.create({ fav_userid: userId });
    }

    static addFavoriteBook = async ({ userId, book = {} }) => {
        let favBookStatus = false
        //check book exists
        const foundBook = await db.book.findByPk(book.book_id);
        if (!foundBook) throw new NotFoundError("Book not found");

        //check Favorite Book existed
        let userFavoriteBook = await db.favorite_book.findOne({ where: { fav_userid: userId } });
        if (!userFavoriteBook) {
            //Create new cart
            userFavoriteBook = await FavoriteBookService.createUserFavoriteBook({ userId });
            if (!userFavoriteBook) {
                throw new BadRequestError("Create Favorite Books Failed!");
            }
        }

        // check book existed
        const existBook = await db.favorite_book_detail.findOne({
            where: {
                fb_fav_id: userFavoriteBook.dataValues.fav_id,
                fb_book_id: book.book_id,
            },
        });

        if (!existBook) {
            //Create card book
            let newFavoriteBook = await db.favorite_book_detail.create({
                fb_fav_id: userFavoriteBook.dataValues.fav_id,
                fb_book_id: book.book_id,
            });
            favBookStatus = true;
            //update cart_count_products in cart
            if (!newFavoriteBook) {
                favBookStatus = false;
                throw new BadRequestError("Add To Favorite Book Failed!");
            }
        } else {
            let removeFavoriteBook = await db.favorite_book_detail.destroy({
                where: {
                    fb_fav_id: existBook.dataValues.fb_fav_id,
                    fb_book_id: existBook.dataValues.fb_book_id,
                },
            });
            favBookStatus = false;
            if (!removeFavoriteBook) {
                favBookStatus = true;
                throw new BadRequestError("Remove Favorite Book Failed!");
            }
        }
        return {
            favoriteBookStatus: favBookStatus
        }
    }
}

module.exports = FavoriteBookService;
