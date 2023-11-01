const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tablesalary = new Schema({
  idS: String,
  nameTeacher: String,
  nameSalary: String,
  position: String,
  basicSalary: String,
  dayWork: String,
  dayOut: String,
  allowance: String,
  exceptSocialInsurance: String,
  totalSalary: String,
});

module.exports = mongoose.model("Tablesalary", Tablesalary);
