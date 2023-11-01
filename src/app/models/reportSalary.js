const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSalary = new Schema({
  codeSalary: String,
  nameSalary: String,
  salaryPeriod1: Date,
  salaryPeriod2: Date,
  totalSalary: String,
  statusSalary: String,
});

module.exports = mongoose.model("ReportSalary", ReportSalary);
