const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  session_id: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
});
module.exports = mongoose.model("session", SessionSchema);
