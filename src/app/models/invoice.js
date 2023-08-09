const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Invoice = new Schema({
  name: String,
  email: String,
  fee: String,
  method: String,
  for: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Invoice", Invoice);
