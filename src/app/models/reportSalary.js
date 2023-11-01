const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSalary = new Schema({
  nameSalary: String,
  salaryPeriod1: Date,
  salaryPeriod2: Date,
  totalSalary: String,
});

module.exports = mongoose.model("ReportSalary", ReportSalary);
