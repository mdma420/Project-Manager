const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TuitionStudent = new Schema({
  idTT: String,
  codeStudent: String,
  name: String,
  email: String,
  science: String,
  subject: String,
  tuition: String,
  deadline: Date,
  status: String,
});

module.exports = mongoose.model("TuitionStudent", TuitionStudent);
