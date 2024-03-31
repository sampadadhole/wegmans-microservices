const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  CustomerId: String,
  AddressLine1: Object,
  AddressLine2: Object,
  City: String,
  State: String,
  Country: String,
  ZipCode: String,
});

module.exports = mongoose.model("address", AddressSchema);
