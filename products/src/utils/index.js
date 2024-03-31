const bcrypt = require("bcrypt");
const amqp = require("amqplib");
const { EXCHANGE_NAME, QUEUE_NAME } = require("../config");

const saltRounds = 10;

async function GenerateSalt() {
  return await bcrypt.genSalt();
}

async function GenerateHash(password, salt) {
  return await bcrypt.hash(password, salt);
}

async function ValidatePassword(password, hashPassword, salt) {
  return (await GenerateHash(password, salt)) === hashPassword;
}

async function createChannel() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    // await channel.assertQueue("ONLINE_SHOPPING", "direct", { durable: true });
    return channel;
  } catch (err) {
    console.log(err);
  }
}

async function publishMessage(channel, service, message) {
  try {
    console.log({ channel });
    await channel.publish(
      EXCHANGE_NAME,
      service,
      Buffer.from(JSON.stringify(message))
    );
    console.log("Sent:", message);
  } catch (err) {
    console.log(err);
  }
}

// async function subscribeMessage(channel, service, binding_key) {
//   try {
//     const queue = await channel.assertQueue("QUEUE_NAME");
//     channel.bindQueue(queue.queue, EXCHANGE_NAME, binding_key);
//     channel.consume(queue.queue, (data) => {
//       console.log("Received:", data.content.toString());
//       channel.ack(data);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = {
  GenerateSalt,
  GenerateHash,
  ValidatePassword,
  createChannel,
  publishMessage,
};
