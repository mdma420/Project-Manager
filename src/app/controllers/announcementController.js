const Email = require("../models/email");
const EmailT = require("../models/emailTeacher");
const Teacher = require("../models/teacher");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const nodemailer = require("nodemailer");

class SettingController {
  // [GET] instructions all
  announcement(req, res, next) {
    Email.find()
      .then((email) => {
        email = email.map((email) => email.toObject());
        EmailT.find().then((emailTeacher) => {
          emailTeacher = emailTeacher.map((emailTeacher) =>
            emailTeacher.toObject()
          );
          res.render("announcement", {
            email,
            emailTeacher,
            user: req.user,
            title: "Announcement",
          });
        });
      })
      .catch(next);
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
    EmailT.find({nameTeacher: teacher.nameTeacher}).then((emailTeacher) => {
      emailTeacher = emailTeacher.map((emailTeacher) =>
        emailTeacher.toObject()
      );
      res.render("mailTeacher", {
        emailTeacher,
        user: req.user,
        title: "Email Teacher",
      });
    });
  }

  // [POST] Send Mail Teacher
  async sendMailT(req, res, next) {
    try {
      const teacher = await Teacher.findById(req.params.id);
      const emailTeacher = new EmailT({
        codeTeacher: teacher.codeTeacher,
        nameTeacher: teacher.nameTeacher,
        phone: teacher.phone,
        subject: teacher.subject,
        emailTeacher: teacher.emailTeacher,
        subjectE: req.body.subjectE,
        html: req.body.html,
        createdAt: req.body.createdAt,
      });
      await emailTeacher.save();

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "npq10102001@gmail.com",
          pass: "rrownmqpepzvoylj",
        },
      });

      var mailOptions = {
        from: "npq10102001@gmail.com",
        to: teacher.emailTeacher,
        subject: emailTeacher.subjectE,
        html: emailTeacher.html,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Email send" + info.response);
          res.redirect("/announcement/forTeacher");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new SettingController();
