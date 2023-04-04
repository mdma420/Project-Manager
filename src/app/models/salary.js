const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Salary = new Schema({
  codeSalary: String,
  nameSalary: String,
  salaryPeriod1: Date,
  salaryPeriod2: Date,
  totalSalaryPay: String,
  paySalary: String,
  noPaySalary: String,
  statusSalary: String,
});

module.exports = mongoose.model("Salary", Salary);
