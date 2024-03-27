const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  id: String,
  name: String,
  email: String,
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
});

module.exports = mongoose.model("customer", CustomerSchema);
