const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: String,
    password: String,
    fullname: String,
    email: String,
    phone: String,
    role: String,
  },
  {
    collection: "user",
  }
);

const UserModel = mongoose.model("user", User);
module.exports = UserModel;
