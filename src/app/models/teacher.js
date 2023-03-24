const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Teacher = new Schema({
  codeTeacher: String,
  nameTeacher: String,
  position: String,
  subject: String,
  onLeave: String,
  status: String,
  emailTeacher: String,
});

module.exports = mongoose.model("Teacher", Teacher);
