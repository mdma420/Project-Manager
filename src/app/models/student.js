const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema({
  codeStudent: String,
  name: String,
  phone: String,
  science: String,
  dayAdmission: Date,
  emailStudent: String,
});

module.exports = mongoose.model("Student", Student);
