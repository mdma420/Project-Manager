const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Email = new Schema({
  codeStudent: String,
  nameStudent: String,
  phone: String,
  class: String,
  emailStudent: String,
  subject: String,
  html: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Email", Email);
