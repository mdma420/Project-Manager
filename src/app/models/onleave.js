const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Onleave = new Schema({
  codeTeacher: String,
  nameTeacher: String,
  subject: String,
  fromday: Date,
  today: Date,
  reason: String,
});

module.exports = mongoose.model("Onleave", Onleave);
