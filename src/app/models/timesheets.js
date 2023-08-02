const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Timesheets = new Schema({
  codeTeacher: String,
  nameTeacher: String,
  subject: String,
  position: String,
  dayWork: String,
  dayOff: String,
  totalDayWork: String,
  totalTeachingTime: String,
});

module.exports = mongoose.model("Timesheets", Timesheets);
