"use strict";

const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");

class RecommendationRatingService {
  static async getRatingUserBooks({
    userId,
    quantity,
    model_type = "online",
  }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }user/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url); 

    console.log('rec',contentBooks)
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id", 
      "behavior-online"
    );
    return convertedbooks; 
  } 
 
  static async getRatingSVDBooks({
    userId,
    quantity,
    model_type = "online", 
  }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/rating/${
      model_type === "online" ? "" : "offline/"
    }svdpp/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);

    console.log(contentBooks)
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "behavior-online"
    );
    return convertedbooks;
  }


  
}

module.exports = RecommendationRatingService;
