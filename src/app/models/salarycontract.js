const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Salarycontract = new Schema({
  typeContract: String,
  basicSalary: String,
});

module.exports = mongoose.model("Salarycontract", Salarycontract);
