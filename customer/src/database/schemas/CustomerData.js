const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: String,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  salt: String,
  phone: String,
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "address",
      require: true,
    },
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("customer", CustomerSchema);
