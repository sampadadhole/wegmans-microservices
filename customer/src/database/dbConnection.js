const mongoose = require("mongoose");
require("dotenv").config();
const Address = require("./schemas/Address");
const CustomerData = require("./schemas/CustomerData");

module.exports = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "Wegmans",
      })
      .then(() => console.log("Connected!"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

Address.createCollection().then(function (collection) {
  console.log("Collection is created!", collection.collectionName);
});

CustomerData.createCollection().then(function (collection) {
  console.log("Collection is created!", collection.collectionName);
});
