"use strict";

const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: `bookada-client-collection-${process.pid}`,
  // brokers: ["localhost:9092"],
  brokers: ["ec2-54-169-222-234.ap-southeast-1.compute.amazonaws.com:9092"],

  logLevel: logLevel.NOTHING,
});

const connectToKafka = async (topics, handleMessage) => {
  const consumer = kafka.consumer({ groupId: "collect" });
  try {
    await consumer.connect();

    // Subscribe to each topic in the list
    for (const topicKey of Object.keys(topics)) {
      const topic = topics[topicKey];
      await consumer.subscribe({ topic, fromBeginning: true });
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        await handleMessage({ topic, partition, message });
      },
    });
  } catch (error) {
    console.error("Error in Kafka consumer:", error);
    throw error;
  }
};

module.exports = {
  connectToKafka,
};
