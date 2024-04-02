//process env file
// if it is prod env, then process .env file else .env.dev file

const dotenv = require("dotenv");
dotenv.config({ path: process.env.NODE_ENV === "prod" ? ".env" : ".env.dev" });

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  APP_SECRET: process.env.APP_SECRET,
  EXCHANGE_NAME: "ONLINE_SHOPPING",
  // MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  CUSTOMER_BINDING_KEY: "CUSTOMER_SERVICE",
  PRODUCT_BINDING_KEY: "PRODUCT_SERVICE",
  SHOPPING_BINDING_KEY: "SHOPPING_SERVICE",
  QUEUE_NAME: "PRODUCT_QUEUE",
};
