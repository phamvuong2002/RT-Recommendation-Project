"use strict";

const { BadRequestError } = require("../core/error.response");
const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");

class RetrainModelService {
  //retrain model - items
  static async retrainRatingItemsModel() {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/rating-item`;
    const result = await fetchData(url);
    if (result.status !== 200) {
      return {
        message: "Training rating-item failed",
        model_id: null,
        status: "failed",
        type: "rating-item",
      };
    }
    return {
      message: "Training rating-item successfully",
      model_id: result,
      status: "success",
      type: "rating-item",
    };
  }

  //retrain behaviour model
  static async retrainBehaviourModel() {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/behaviour`;
    const result = await fetchData(url);
    if (result.status !== 200) {
      return {
        message: "Training behaviour model failed",
        model_id: null,
        status: "failed",
        type: "behaviour",
      };
    }
    return {
      message: "Training behaviour successfully",
      model_id: result,
      status: "success",
      type: "behaviour",
    };
  }

  static async retrain() {}
}

module.exports = RetrainModelService;
