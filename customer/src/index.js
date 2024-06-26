const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const cors = require("cors");
const database = require("./database/dbConnection");
const { customer } = require("./api");
const cookieParser = require("cookie-parser");
const { createChannel } = require("./utils");

const StartServer = async () => {
  const app = express();
  await database();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());

  //api
  const channel = await createChannel();
  // console.log({ channel });
  customer(app, channel);
};

StartServer();
