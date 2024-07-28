"use strict";

const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");
const { Op, Sequelize } = require("sequelize");
const db = require("../models/sequelize/models");
const {
  MAX_NUMBER_OF_ITEMS_CONTENT_BASED,
} = require("../const/recommendation");

class ContentBaseRecommendationService {
  static async getRecommendByRecentBooks({
    userId,
    days,
    page,
    page_size,
    num_rec,
    model_type = "online",
  }) {
    let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${
      model_type === "online" ? "" : "offline/"
    }recommend/recent/user=${userId}&days=${days}&page=${page}&page_size=${page_size}`;

    const contentbaseBooks = await fetchData(url);
    const data_rec = contentbaseBooks.recommendations;

    if (data_rec.length === 0) {
      return { books: [] };
    }

    const recommendationsMap = new Map();

    data_rec.forEach((item) => {
      item.recommendations.forEach((recommendation) => {
        if (!recommendationsMap.has(recommendation.book_id)) {
          recommendationsMap.set(recommendation.book_id, recommendation);
        }
      });
    });

    const mergedRecommendations = Array.from(recommendationsMap.values());

    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      mergedRecommendations,
      "book_id",
      `recent-book`
    );

    return { books: convertedbooks };
  }

  static async getRecommendByContentBaseFaiss({
    key_words,
    userId,
    pageSize,
    pageNumber,
    categories = "all",
    model_type = "online",
  }) {
    let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${
      model_type === "online" ? "" : "offline/"
    }faiss/recommend/key_word=${key_words}&genres=${categories}&user=${userId}&quantity=${MAX_NUMBER_OF_ITEMS_CONTENT_BASED}&page=${pageNumber}&page_size=${pageSize}`;

    let contentbaseBooks = await fetchData(url);
    let convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentbaseBooks.recommendations,
      "book_id",
      `contentbase-${model_type}`
    );
    if (convertedbooks.length === 0) {
      // Trả về kết quả phân trang và tổng số sách
      return {
        totalPages: 0,
        totalBooks: 0,
        books: [],
      };
    }
    const totalPages = Math.ceil(MAX_NUMBER_OF_ITEMS_CONTENT_BASED / pageSize);

    // Trả về kết quả phân trang và tổng số sách
    return {
      totalPages,
      totalBooks: MAX_NUMBER_OF_ITEMS_CONTENT_BASED,
      books: convertedbooks,
    };
  }

  static async getRecommendByContentBase({
    bookTitle,
    userId,
    pageSize,
    pageNumber,
    model_type = "online",
  }) {
    let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${
      model_type === "online" ? "" : "offline/"
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

  static async getSuggestedBook({
    bookTitle,
    userId,
    quantity,
    model_type = "online",
  }) {
    let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${
      model_type === "online" ? "" : "offline/"
    }recommend/key_word=${bookTitle}&user=${userId}&quantity=${quantity}`;

    const contentbaseBooks = await fetchData(url);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentbaseBooks.search,
      "book_id",
      `contentbase-${model_type}`
    );
    return convertedbooks;
  }

  static async getRecommendByContentBaseID({
    bookId,
    userId,
    quantity,
    model_type = "online",
  }) {
    let url = `${process.env.RECOMMENDATION_SERVER_URL}/contentbase/${
      model_type === "online" ? "" : "offline/"
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
