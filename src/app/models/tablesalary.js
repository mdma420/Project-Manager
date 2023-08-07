const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tablesalary = new Schema({
  idS: String,
  nameTeacher: String,
  position: String,
  gloneNumber: String,
  coefficientsSalary: String,
  basicSalary: String,
  dayWork: String,
  dayOut: String,
  allowance: String,
  bonus: String,
  exceptSocialInsurance: String,
  totalSalary: String,
  note: String,
});

module.exports = mongoose.model("Tablesalary", Tablesalary);
