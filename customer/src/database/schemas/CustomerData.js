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
  cart: [
    {
      product: {
        _id: String,
        name: String,
        color: String,
        quantity: Number,
      },
    },
  ],
  wishlist: [
    {
      product: {
        _id: String,
        name: String,
        color: String,
        quantity: Number,
      },
    },
  ],
});

module.exports = mongoose.model("customer", CustomerSchema);
