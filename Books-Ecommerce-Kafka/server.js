const { connectToKafka } = require("./src/dbs/init.kafka");
const { saveBehaviour } = require("./src/services/redis.behaviour.service");
const { collectPurchase } = require("./src/services/redis.purchase.service");
const { collectVector } = require("./src/services/redis.vector.service");

const TOPICS = {
  VIEW: "view",
  CLICK: "click",
  PLACEORDER: "place-order",
  CANCLEORDER: "cancel-order",
  ADDTOCART: "add-to-cart",
  LOVE: "love",
};

const SCORE = {
  view: 2,
  click: 1,
  "place-order": 5,
  "cancel-order": 3,
  "cancel-order": 3,
  love: 3,
};

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
    const result = await saveBehaviour(
      `behavior:${timestamp}`,
      message.value.toString()
    );
    //collect vector behavior
    await collectVector(
      dataCollect.userId,
      dataCollect.productId,
      SCORE[topic]
    );
    //collect purchase behavior
    if (topic === TOPICS.PLACEORDER) {
      await collectPurchase(dataCollect.productId);
    }

    console.log(`------------${result}-----------`);
  } catch (error) {
    console.log(error);
  }
}
