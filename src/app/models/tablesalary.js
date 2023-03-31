const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tablesalary = new Schema({
  codeTeacher: String,
  nameTeacher: String,
  position: String,
  typeContract: String,
  basicSalary: String,
});

module.exports = mongoose.model("Tablesalary", Tablesalary);
