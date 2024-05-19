"use strict";
const { BEHAVIOUR, TOPIC } = require("../const/collect/index");
const BestSellingService = require("./bestSelling.redis");

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
        } else if (data.behaviour === BEHAVIOUR.PLACEORDER) {
          console.log("PlaceOrder:::::::::::", data);
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
        console.log("MESSAGE RECIVED:", message);
      }
    });

    // Xử lý sự kiện disconnect
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  }
}

module.exports = SocketServices;
