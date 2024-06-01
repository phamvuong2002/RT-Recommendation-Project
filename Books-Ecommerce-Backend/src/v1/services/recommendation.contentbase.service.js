"use strict";

const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");
const { Op, Sequelize } = require("sequelize");
const db = require("../models/sequelize/models");

class ContentBaseRecommendationService {
    static async getRecommendByContentBase({ bookTitle, userId, quantity, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/key_word=${bookTitle}&user=${userId}&quantity=${quantity}`;

        const contentbaseBooks = await fetchData(url);
        const convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.recommendations,
            "book_id",
            `behavior-${model_type}`
        );
        return convertedbooks;
    }

    static async getRecommendByContentBaseID({ bookId, userId, quantity, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/book=${bookId}&user=${userId}&quantity=${quantity}`;

        const contentbaseBooks = await fetchData(url);
        const convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.recommendations,
            "book_id",
            `behavior-${model_type}`
        );
        return convertedbooks;
    }
    static async getSuggestedBook({ bookTitle, userId, quantity, model_type = "online" }) {
        let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${model_type === "online" ? "" : "offline/"
            }recommend/key_word=${bookTitle}&user=${userId}&quantity=${quantity}`;

        const contentbaseBooks = await fetchData(url);
        const convertedbooks = await recBooksHelper.convertRecBooksHelper(
            contentbaseBooks.search,
            "book_id",
            `behavior-${model_type}`
        );
        return convertedbooks;
    }
}

module.exports = ContentBaseRecommendationService;
