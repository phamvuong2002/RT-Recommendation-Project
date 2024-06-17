"use strict";
const { BEHAVIOUR, TOPIC } = require("../const/collect/index");
const BestSellingService = require("./bestSelling.redis");
const KeyTokenService = require("./keyToken.service");
const RetrainModelService = require("./retrainModel.service");

const connections = [];
class SocketServices {
  static connection(ws) {
    connections.push(ws);

    console.log("New client connected");

    ws.on("open", function open() {
      console.log("Connected to server");

      // Gửi một tin nhắn tới server khi kết nối thành công
      ws.send("Hello server!");
    });

    // Lắng nghe message từ client
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        if (!data) {
          return;
        } else if (data?.message === "hello") {
          console.log(data?.content);
        } else if (data.message === "retrain-behaviour") {
          //Bắt sự kiện yêu cầu đào tạo lại
          let min_score = 50; // for guest
          //check user có đủ điền kiện để gọi retraining
          const userKey = await KeyTokenService.findByUserId(data.userId);
          if (userKey) {
            min_score = 20; // for user
          } else if (!userKey && data.score < min_score) {
            console.log("không đủ điều kiện retraining");
            return false;
          }
          console.log("Retraining......", min_score === 20 ? "USER" : "GUEST");
          //Retraining
          await RetrainModelService.callBehaviourRecommend(min_score);
        } else if (data.behaviour === BEHAVIOUR.PLACEORDER) {
          //Bắt hành vi mua hàng và kiểm tra sản phẩm có nằm trong top seller
          // console.log("PlaceOrder:::::::::::", data);
          const isSendRequest = await BestSellingService.isTopSelling({
            bookId: data.productId,
            top: 24,
          });
          if (data && isSendRequest) {
            connections.forEach((connection) => {
              connection.send(JSON.stringify(TOPIC.BEST_SELLING));
            });
          }
        }
      } catch (error) {
        console.log("MESSAGE ERROR:", error);
      }
    });

    // Xử lý sự kiện disconnect
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  }
}

module.exports = SocketServices;
