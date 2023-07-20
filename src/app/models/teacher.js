const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Teacher = new Schema({
  // teacher
  codeTeacher: String,
  nameTeacher: String,
  sex: String,
  dateOfBirth: Date,
  emailTeacher: String,
  phone: String,
  subject: String,
  level: String,
  position: String,
  dateStartWork: Date,
  address: String,
  citizenIdentificationNumber: String,
  placeOfIssue: String,
  onLeave: String,
  status: String,

  // salary teacher
  typeOfContract: String,
  basicSalary: String,
  glone: String,
  gloneNumber: String,
  salaryScale: String,
  coefficientsSalary: String,
  dateApplyGlone: Date,
});

module.exports = mongoose.model("Teacher", Teacher);
