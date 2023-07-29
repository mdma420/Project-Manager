const Email = require("../models/email");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const email = require("../models/email");

class SettingController {
  // [GET] instructions all
  announcement(req, res, next) {
    res.render("announcement");
  }

  // [GET] instructions student
  forStudent(req, res, next) {
    Email.find()
      .then((email) => {
        email = email.map((email) => email.toObject());
        res.render("announcementStudent", {
          email,
          user: req.user,
          title: "Instructions Student",
        });
      })
      .catch(next);
  }

  // [GET] Detail instructions student
  detailForStudent(req, res, next) {
    Email.findById(req.params.id)
      .then((email) => {
        res.render("detailAnnouncementStudent", {
          email: mongooseToObject(email),
          user: req.user,
          title: "Detail Instructions Student",
        });
      })
      .catch(next);
  }

  // [GET] instructions teacher
  forTeacher(req, res, next) {
    res.render("announcementTeacher");
  }
}

module.exports = new SettingController();
