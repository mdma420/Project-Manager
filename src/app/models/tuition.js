const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tuition = new Schema({
  code: String,
  name: String,
  science: String,
  totalTuition: String,
  status: String,
});

module.exports = mongoose.model("Tuition", Tuition);
