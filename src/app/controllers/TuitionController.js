const Tuition = require("../models/tuition");

class TuitionController {
  //[GET] Tuition
  tuition(req, res, next) {
    res.render("tuition");
  }
}

module.exports = new TuitionController();
