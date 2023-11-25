const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Invoice = new Schema({
  name: String,
  subject: String,
  tuition: String,
  method: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Invoice", Invoice);
