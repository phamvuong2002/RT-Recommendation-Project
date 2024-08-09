"use strict";

const { BadRequestError } = require("../core/error.response");
const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");
const RecommendationBehaviour_SVD_UserService = require("./recommend.behaviour_svd_user.service");
const {
  acquireLockOnlineReTrain,
  resetUserScore,
  releaselock,
  acquireLockOnlineReTrainRating,
  resetRatingVectors,
} = require("./redis.service");

class RetrainModelService {
  //retrain rating model - user - svd
  static async retrainRatingUserSVDModel() {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/rating-svdpp`;
    const result = await fetchData(url);
    console.log("result training rating::", result);
    if (result === null) {
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

  //retrain rating model - items - knn
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

  //retrain behaviour model - als
  static async retrainBehaviourALSModel() {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/behaviour`;
    const result = await fetchData(url);
    if (result === null) {
      return {
        message: "Training behaviour model failed",
        model_id: null,
        status: "failed",
        type: "behaviour-als",
      };
    }
    return {
      message: "Training behaviour successfully",
      model_id: result,
      status: "success",
      type: "behaviour-als",
    };
  }

  //retrain behaviour model - svd
  static async retrainBehaviourSVDModel() {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/behaviour-svdpp`;
    const result = await fetchData(url);
    console.log("result training::", result);
    if (result === null) {
      return {
        message: "Training behaviour model failed",
        model_id: null,
        status: "failed",
        type: "behaviour-svd",
      };
    }
    return {
      message: "Training behaviour successfully",
      model_id: result,
      status: "success",
      type: "behaviour-svd",
    };
  }

  //retrain implicit models
  // static async callBehaviourRecommend(min_score) {
  //   const MIN_REQUIRED_USER = 0;
  //   const QUANTITY = 12;

  //   const resultSVD = await acquireLockOnlineReTrain("svd", min_score);
  //   if (!resultSVD) return null;

  //   const { listUsers, key } = resultSVD;

  //   if (listUsers !== null && listUsers.length > MIN_REQUIRED_USER) {
  //     //retrain model
  //     // const alsResults = await RetrainModelService.retrainBehaviourALSModel();
  //     const svdResults = await RetrainModelService.retrainBehaviourSVDModel();
  //     //Create recommendation
  //     if (svdResults.status === "success") {
  //       for (const user in listUsers) {
  //         //tạo để xuất
  //         const result =
  //           await RecommendationBehaviour_SVD_UserService.callBehaviourSVDBooks(
  //             {
  //               userId: listUsers[user],
  //               quantity: QUANTITY,
  //               model_type: "online",
  //             }
  //           );

  //         // reset điểm khi để xuất thành công
  //         if (result.recommendations.length > 0) {
  //           await resetUserScore(listUsers[user]);
  //         }
  //       }
  //       //nhả khoá
  //       await releaselock(key);
  //     }
  //   }
  // }

  //RETRAIN IMPLICIT RECOMMENDER - UPDATE - bỏ cmt để chạy thử
  static async callBehaviourRecommend(min_score) {
    const MIN_REQUIRED_USER = 0;
    const QUANTITY = 12;

    const resultSVD = await acquireLockOnlineReTrain("svd", min_score);
    if (!resultSVD) return null;

    const { listUsers, key } = resultSVD;
    // console.log("result callBehaviourRecommend::", listUsers);

    if (listUsers !== null && listUsers.length > MIN_REQUIRED_USER) {
      //retrain model
      // const alsResults = await RetrainModelService.retrainBehaviourALSModel();
      const alsResults = await RetrainModelService.retrainBehaviourALSModel();
      //Create recommendation

      if (alsResults.status === "success") {
        for (const user in listUsers) {
          //tạo để xuất
          const result =
            await RecommendationBehaviour_SVD_UserService.callBehaviourImplicitRecommenderBooks(
              {
                userId: listUsers[user],
                quantity: QUANTITY,
                model_type: "online",
              }
            );

          // reset điểm khi để xuất thành công
          if (result.recommendations.length > 0) {
            await resetUserScore(listUsers[user]);
          }
        }
        //nhả khoá
        await releaselock(key);
      }
    }
  }

  //retrain rating models
  static async callRetrainRatingModel() {
    //tạo khoá cho retrain rating models
    const key_retrain_rating = await acquireLockOnlineReTrainRating();
    //reset rating db
    await resetRatingVectors();
    //retrain rating models
    const resultSVDRating =
      await RetrainModelService.retrainRatingUserSVDModel();
    const resultALSRating = await RetrainModelService.retrainRatingItemsModel();
    if (resultSVDRating.status === "success") {
      console.log("retrain rating SVD Model successfully");
    } else {
      console.log("retrain rating SVD Model failed");
    }
    //Nhả khoá
    const releaselockResult = await releaselock(key_retrain_rating);
    if (releaselockResult) {
      return resultSVDRating;
    } else {
      return null;
    }
  }
}

module.exports = RetrainModelService;
