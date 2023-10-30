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
  address: String,
  subject: String,
  level: String,
  position: String,
  dateStartWork: Date,
  citizenIdentificationNumber: String,
  placeOfIssue: String,

  // salary teacher
  basicSalary: String,
});

module.exports = mongoose.model("Teacher", Teacher);
