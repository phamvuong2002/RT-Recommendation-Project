"use strict";

const { BadRequestError } = require("../core/error.response");
const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");

class RecommendationRatingService {
  static async getRatingPopularBooks({ quantity, model_type = "online" }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }popular/${quantity}`;
    const popularBooks = await fetchData(url);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      popularBooks,
      "Book-ID",
      "rating-popular-online"
    );
    return convertedbooks;
  }

  static async getRatingContentBooks({
    userId,
    quantity,
    key_word,
    model_type = "online",
  }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }content/key_word=${key_word}&user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "rating-item-online"
    );
    return convertedbooks;
  }

  static async getRatingUserBooks({ userId, quantity, model_type = "online" }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }user/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);

    console.log("rec", contentBooks);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "behavior-online"
    );
    return convertedbooks;
  }

  static async getRatingSVDBooks({ userId, quantity, model_type = "online" }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }svdpp/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);

    console.log(contentBooks);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "rating-svd-online"
    );
    return convertedbooks;
  }
}

module.exports = RecommendationRatingService;
