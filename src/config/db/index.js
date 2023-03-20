const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://QuyNPGCS190822:Q8no0QKAGmvJD4Em@cluster0.qnytwdq.mongodb.net/Final-Project"
    );
    console.log("Truy cap  database thanh cong");
  } catch (error) {
    console.log("Truy cap  database thanh cong");
  }
}

module.exports = {connect};
