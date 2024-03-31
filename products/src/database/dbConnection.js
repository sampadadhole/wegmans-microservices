const mongoose = require("mongoose");
require("dotenv").config();
const ProductSchema = require("./schemas/Product");
// const SessionSchema = require("./schemas/Session");
module.exports = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        dbName: "productsCollection",
      })
      .then(() => console.log("Connected!"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
ProductSchema.createCollection().then(function (collection) {
  console.log("Collection is created!");
});
