const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  CustomerId: String,
  AddressLine1: String,
  AddressLine2: String,
  City: String,
  State: String,
  Country: String,
  ZipCode: String,
});

module.exports = mongoose.model("address", AddressSchema);
