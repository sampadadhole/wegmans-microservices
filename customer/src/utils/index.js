const bcrypt = require("bcrypt");
const amqp = require("amqplib");
const {
  EXCHANGE_NAME,
  QUEUE_NAME,
  CUSTOMER_BINDING_KEY,
} = require("../config");
const jwt = require("jsonwebtoken");

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

async function generateToken(payload) {
  try {
    return jwt.sign(payload, "microservices_secret", { expiresIn: "1d" });
  } catch (err) {
    console.log(err);
    return err;
  }
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

// async function publishMessage(channel, binding_key, message) {
//   try {
//     await channel.publish(
//       EXCHANGE_NAME,
//       binding_key,
//       Buffer.from(JSON.stringify(message))
//     );
//     console.log("Sent:", message.name);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function subscribeMessage(channel, service, CUSTOMER_BINDING_KEY) {
  try {
    const queue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(queue.queue, EXCHANGE_NAME, CUSTOMER_BINDING_KEY);
    channel.consume(queue.queue, (data) => {
      // console.log("Received:", data.content.toString());
      service.SubscribeEvents(data.content);
      channel.ack(data);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  GenerateSalt,
  GenerateHash,
  ValidatePassword,
  createChannel,
  subscribeMessage,
  generateToken,
  // publishMessage,
};
