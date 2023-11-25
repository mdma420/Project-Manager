const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportTuition = new Schema({
  idTT: String,
  nameTT: String,
  tuitionPeriod1: Date,
  tuitionPeriod2: Date,
  totalTT: String,
});

module.exports = mongoose.model("ReportTuition", ReportTuition);
