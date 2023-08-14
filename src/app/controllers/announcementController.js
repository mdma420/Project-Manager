const Email = require("../models/email");
const EmailT = require("../models/emailTeacher");
const Teacher = require("../models/teacher");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const email = require("../models/email");
const teacher = require("../models/teacher");

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
    Teacher.find({}).then((teacher) => {
      teacher = teacher.map((teacher) => teacher.toObject());
      res.render("announcementTeacher", {
        teacher,
        user: req.user,
        title: "Tnnouncement Teacher",
      });
    });
  }

  // [GET] mail Teacher
  async mailTeacher(req, res, next) {
    const teacher = await Teacher.findById(req.params.id);
    console.log(teacher);
    EmailT.find({nameTeacher: teacher.nameTeacher}).then((emailT) => {
      emailT = emailT.map((emailT) => emailT.toObject());
      res.render("mailTeacher", {
        emailT,
        user: req.user,
        title: "Email Teacher",
      });
    });
  }

  // [POST] Send Mail Teacher
  sendMailT(req, res, next) {}
}

module.exports = new SettingController();
