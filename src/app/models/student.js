const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema({
  name: String,
});

module.exports = mongoose.model("Student", Student);
