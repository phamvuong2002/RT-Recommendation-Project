"use strict";

const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");
const { Op, Sequelize } = require("sequelize");
const db = require("../models/sequelize/models");

class ContentBaseRecommendationService {
    static async getRecommendByContentBase({ bookTitle, userId, pageSize, pageNumber, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/key_word=${bookTitle}&user=${userId}&quantity=${100}`;

        let contentbaseBooks = await fetchData(url);
        let convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.recommendations,
            "book_id",
            `contentbase-${model_type}`
        );
        //return contentbaseBooks
        // // Phân trang kết quả
        let totalBooks = convertedbooks.length;
        let totalPages = Math.ceil(totalBooks / pageSize);
        let start = (pageNumber - 1) * pageSize;
        let end = start + pageSize;
        let paginatedBooks = convertedbooks.slice(start, end);

        // Trả về kết quả phân trang và tổng số sách
        return {
            totalPages,
            totalBooks,
            books: paginatedBooks,
            start,
            end,
            pageNumber,
            pageSize,
        };
    }

    static async getSuggestedBook({ bookTitle, userId, quantity, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/key_word=${bookTitle}&user=${userId}&quantity=${quantity}`;

        const contentbaseBooks = await fetchData(url);
        const convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.search,
            "book_id",
            `contentbase-${model_type}`
        );
        return convertedbooks;
    }

    static async getRecommendByContentBaseID({ bookId, userId, quantity, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/book=${bookId}&user=${userId}&quantity=${quantity}`;

        let contentbaseBooks = await fetchData(url);
        let convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.recommendations,
            "book_id",
            `contentbase-${model_type}`
        );

        return convertedbooks;
    }

}

module.exports = ContentBaseRecommendationService;
