const express = require("express");
const app = express();
const cors = require("cors");
const { products } = require("./api");
const database = require("./database/dbConnection");
// const cookieParser = require("cookie-parser");
const { createChannel } = require("./utils");

const StartServer = async () => {
  const app = express();
  await database();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(cookieParser());
  app.use(cors());
  app.listen(8002, () => {
    console.log("Products Service is running on port 8002");
  });

  //api
  const channel = await createChannel();

  products(app, channel);
};
StartServer();
