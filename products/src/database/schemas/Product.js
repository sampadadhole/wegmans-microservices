const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  id: String,
  name: String,
  color: String,
  quantity: Number,
  price: String,
  createdAt: Date,
});

module.exports = mongoose.model("product", productSchema);
