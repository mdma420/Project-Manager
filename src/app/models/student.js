const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema({
  codeStudent: String,
  name: String,
  class: String,
  science: String,
  phone: String,
  dayAdmission: Date,
  tuition: String,
  status: String,
  tuitionCollectionDate: Date,
});

module.exports = mongoose.model("Student", Student);
