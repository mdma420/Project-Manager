const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tablesalary = new Schema({
  codeTeacher: String,
  nameTeacher: String,
});

module.exports = mongoose.model("Tablesalary", Tablesalary);
