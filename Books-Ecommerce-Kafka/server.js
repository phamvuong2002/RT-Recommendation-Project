const { connectToKafka } = require("./src/dbs/init.kafka");
const { saveBehaviour } = require("./src/services/redis.behaviour.service");
const { collectPurchase } = require("./src/services/redis.purchase.service");
const { collectVector } = require("./src/services/redis.vector.service");
const WebSocket = require("ws");

const TOPICS = {
  VIEW: "view",
  CLICK: "click",
  PLACEORDER: "place-order",
  CANCLEORDER: "cancel-order",
  ADDTOCART: "add-to-cart",
  LOVE: "love",
  RATING: "rating",
};

const SCORE = {
  view: 2,
  click: 1,
  "place-order": 5,
  "cancel-order": 3,
  "add-to-cart": 3,
  love: 3,
  rating: 0,
};

//Create socket connect to Ecommerce server
const ws = new WebSocket("ws://localhost:3050");
ws.on("open", function open() {
  // Gửi một tin nhắn tới server khi kết nối thành công
  ws.send(
    JSON.stringify({
      message: "hello",
      content: "Server Kafka Started and Connected on Socket",
    })
  );
});

//Listening for kafka
connectToKafka(TOPICS, handleMessage)
  .then(() => {
    console.log("Connected to Kafka and listening to topics:", TOPICS);
  })
  .catch((error) => {
    console.error("Error connecting to Kafka:", error);
  });

async function handleMessage({ topic, partition, message }) {
  console.log({
    topic,
    value: message.value.toString(),
  });
  const dataCollect = JSON.parse(message.value.toString());
  const timestamp = new Date().getTime();
  try {
    //collect behavior
    let result = TOPICS.RATING;
    if (topic !== TOPICS.RATING) {
      result = await saveBehaviour(
        `behavior:${timestamp}`,
        message.value.toString()
      );
    }
    //collect vector behavior
    const result_vector = await collectVector(
      dataCollect.userId,
      dataCollect.productId,
      SCORE[topic]
    );
    if (result_vector?.message === "retrain-behaviour") {
      ws.send(JSON.stringify(result_vector));
    } else if (result_vector?.message === "retrain-rating") {
      ws.send(JSON.stringify(result_vector));
    }

    if (topic === TOPICS.PLACEORDER) {
      //collect purchase behavior
      await collectPurchase(
        dataCollect.productId,
        parseInt(dataCollect.data) || 1
      );
      ws.send(message.value.toString());
    }

    console.log(`------------${result}-----------`);
  } catch (error) {
    console.log(error);
  }
}
