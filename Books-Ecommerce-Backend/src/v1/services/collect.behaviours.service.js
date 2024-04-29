"use strict";

const { BadRequestError } = require("../core/error.response");
const { producer } = require("../dbs/init.kafka");

const sendMessage = async ({ topic, message }) => {
  const send = await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });

  if (!send) {
    throw new BadRequestError("Error sending message");
  }
  return send;
};

module.exports = {
  sendMessage,
};
