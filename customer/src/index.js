const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const cors = require("cors");
const database = require("./database/dbConnection");
const { customer } = require("./api");

const StartServer = async () => {
  const app = express();
  await database();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  await app.use(express.json());
  await app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //api
  customer(app);
};

StartServer();
