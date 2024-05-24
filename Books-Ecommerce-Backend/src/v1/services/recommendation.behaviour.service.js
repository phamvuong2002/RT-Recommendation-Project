"use strict";

const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");

class RecommendationBehaviourService {
  static async getBehaviourContentBooks({
    bookId,
    userId,
    quantity,
    model_type = "online",
  }) {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/implicit/${
      model_type === "online" ? "" : "offline/"
    }content/book=${bookId}&user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "bookID",
      "behavior-online"
    );
    return convertedbooks;
  }
}

module.exports = RecommendationBehaviourService;
