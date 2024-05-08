"use strict";

const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: "bookada-producer",
  brokers: ["localhost:9092"],
  logLevel: logLevel.NOTHING,
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const disconnectProducer = async () => {
  await producer.disconnect();
};

module.exports = {
  connectProducer,
  disconnectProducer,
  producer,
};
