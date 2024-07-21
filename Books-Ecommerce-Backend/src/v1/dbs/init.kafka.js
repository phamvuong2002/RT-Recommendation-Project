"use strict";

const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: `bookada-producer-${process.pid}`,
  // brokers: ["localhost:9092"],
  // brokers: ["ec2-13-215-227-43.ap-southeast-1.compute.amazonaws.com:9092"],
  brokers: ["ec2-13-212-253-110.ap-southeast-1.compute.amazonaws.com:9092"],
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
