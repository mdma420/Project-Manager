const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TableT = new Schema({
  codeTableT: String,
  nameTableT: String,
  dealine: Date,
  tableTPeriod1: Date,
  tableTPeriod2: Date,
});

module.exports = mongoose.model("TableT", TableT);
