const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmailT = new Schema({
  codeTeacher: String,
  nameTeacher: String,
  phone: String,
  subject: String,
  emailTeacher: String,
  subject: String,
  html: String,
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("EmailT", EmailT);
