//process env file
// if it is prod env, then process .env file else .env.dev file

const dotenv = require("dotenv");
dotenv.config({ path: process.env.NODE_ENV === "prod" ? ".env" : ".env.dev" });

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  APP_SECRET: process.env.APP_SECRET,
};
