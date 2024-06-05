"use strict";
const { Op, Sequelize } = require("sequelize");
const { fetchData } = require("../helpers/fetchData");
const recBooksHelper = require("../helpers/recommendationBooks.helper");
const db = require("../models/sequelize/models");
class RecommendationBehaviour_SVD_UserService {
  //call SVD model generate Books
  static async callBehaviourSVDBooks({
    userId,
    quantity,
    model_type = "online",
  }) {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/implicit/${
      model_type === "online" ? "" : "offline/"
    }svdpp/user=${userId}&quantity=${quantity}`;
    const result = await fetchData(url);

    return result;
  }

  static async getBehaviourSVDBooks({
    userId,
    quantity,
    model_type = "online",
  }) {
    // console.log('in', contentBooks)
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/implicit/${
      model_type === "online" ? "" : "offline/"
    }svdpp/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);

    // console.log(contentBooks)
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "behavior-online"
    );
    return convertedbooks;
  }

  static async getBehaviourUserBooks({
    userId,
    quantity,
    model_type = "online",
  }) {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/implicit/${
      model_type === "online" ? "" : "offline/"
    }user/user=${userId}&quantity=${quantity}`;
    const contentBooks = await fetchData(url);

    // console.log(contentBooks)
    const convertedbooks = await recBooksHelper.convertRecBooksHelper(
      contentBooks.recommendations,
      "book_id",
      "behavior-online"
    );
    return convertedbooks;
  }

  static async getLatestRecBooks({ userId, quantity, model_type = "online" }) {
    const recBooks = await db.rec_book.findAll({
      attributes: [
        ["rec_book_id", "book_id"],
        ["rec_book_title", "book_title"],
        ["rec_book_img", "book_img"],
        ["rec_book_categories", "book_categories"],
        ["rec_book_spe_price", "book_spe_price"],
        ["rec_book_old_price", "book_old_price"],
        // ["rec_book_is_recommadation", "book_is_recommendation"],
      ],
      where: { rec_user_sid: userId },
      order: [["create_time", "DESC"]],
      limit: quantity,
    });

    console.log(recBooks);
    const formattedBooks = recBooks.map((recbook) => ({
      book: {
        book_id: recbook.dataValues.book_id,
        book_title: recbook.dataValues.book_title,
        book_categories: recbook.dataValues.book_categories,
        book_img: recbook.dataValues.book_img,
        book_spe_price: recbook.dataValues.book_spe_price,
        book_old_price: recbook.dataValues.book_old_price,
      },
    }));

    // Tính toán tổng số trang
    // const totalPages = Math.ceil(totalBooks / limit);

    // return {
    //   books: formattedBooks,
    //   totalBooks,
    //   totalPages,
    // };
    console.log(userId);
    console.log(recBooks);
    return formattedBooks;
  }

  //sửa tiếp ở đây
  static async getRandomCollabRecBooks({
    userId,
    quantity,
    model_type = "online",
  }) {
    const recBooks = await db.rec_book.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("rec_book_id")), "book_id"],
        ["rec_book_title", "book_title"],
        ["rec_book_img", "book_img"],
        ["rec_book_categories", "book_categories"],
        ["rec_book_spe_price", "book_spe_price"],
        ["rec_book_old_price", "book_old_price"],
        // ["rec_book_is_recommadation", "book_is_recommendation"],
      ],
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "datediff",
              Sequelize.fn("NOW"),
              Sequelize.col("create_time")
            ),
            {
              [Op.gt]: 0,
            }
          ),
          { rec_user_sid: userId },
        ],
      },
      order: Sequelize.literal("rand()"),
      limit: quantity,
    });

    // console.log(recBooks)
    const formattedBooks = recBooks.map((recbook) => ({
      book: {
        book_id: recbook.dataValues.book_id,
        book_title: recbook.dataValues.book_title,
        book_categories: recbook.dataValues.book_categories,
        book_img: recbook.dataValues.book_img,
        book_spe_price: recbook.dataValues.book_spe_price,
        book_old_price: recbook.dataValues.book_old_price,
      },
    }));

    // Tính toán tổng số trang
    // const totalPages = Math.ceil(totalBooks / limit);

    // return {
    //   books: formattedBooks,
    //   totalBooks,
    //   totalPages,
    // };
    // console.log(userId)
    // console.log(formattedBooks)
    return formattedBooks;
  }

  static async retrainBehaviourSVD({
    userId,
    quantity,
    model_type = "online",
  }) {
    const url = `${process.env.RECOMMENDATION_SERVER_URL}/retrain/behaviour-svdpp`;
    const contentBooks = await fetchData(url);
    console.log(contentBooks);

    const result_svd =
      await RecommendationBehaviour_SVD_UserService.getBehaviourSVDBooks({
        userId,
        quantity,
      });
    const result_user =
      await RecommendationBehaviour_SVD_UserService.getBehaviourUserBooks({
        userId,
        quantity,
      });
    // console.log(result)
    return "result";
  }
}

module.exports = RecommendationBehaviour_SVD_UserService;
