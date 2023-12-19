const Email = require("../models/email");
const EmailT = require("../models/emailTeacher");
const Teacher = require("../models/teacher");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../../util/mongoose");
const nodemailer = require("nodemailer");
const emailTeacher = require("../models/emailTeacher");

class SettingController {
  // [GET] instructions all
  async announcement(req, res, next) {
    const count = await Email.countDocuments();
    const countT = await EmailT.countDocuments();
    var page = req.query.page;
    var PAGE_SIZE = 5;
    var total = Math.ceil((count + countT) / PAGE_SIZE + 1);
    const pages = [];
    for (let i = 1; i < total; i++) {
      pages.push(i);
    }

    if (page) {
      page = parseInt(page);
      const skip = (page - 1) * PAGE_SIZE;

      const email = await Email.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((emails) => emails.map((email) => email.toObject()));

      const emailTeacher = await EmailT.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((teachers) => teachers.map((teacher) => teacher.toObject()));

      res.render("announcement", {
        email,
        emailTeacher,
        user: req.user,
        pages: pages,
        count: count,
        countT: countT,
        title: "Announcement",
      });
    } else {
      page = 1;
      const skip = (page - 1) * PAGE_SIZE;

      const email = await Email.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((emails) => emails.map((email) => email.toObject()));

      const emailTeacher = await EmailT.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((teachers) => teachers.map((teacher) => teacher.toObject()));

      res.render("announcement", {
        email,
        emailTeacher,
        user: req.user,
        pages: pages,
        count: count,
        countT: countT,
        title: "Announcement",
      });
    }
  }

  // [GET] instructions student
  async forStudent(req, res, next) {
    const count = await Email.countDocuments();
    var page = req.query.page;
    var PAGE_SIZE = 10;
    var total = Math.ceil(count / PAGE_SIZE + 1);
    const pages = [];
    for (let i = 1; i < total; i++) {
      pages.push(i);
    }

    if (page) {
      page = parseInt(page);
      const skip = (page - 1) * PAGE_SIZE;
      Email.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((email) => {
          email = email.map((email) => email.toObject());
          res.render("announcementStudent", {
            email,
            user: req.user,
            pages: pages,
            count: count,
            title: "Instructions Student",
          });
        });
    } else {
      page = 1;
      const skip = (page - 1) * PAGE_SIZE;
      Email.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((email) => {
          email = email.map((email) => email.toObject());
          res.render("announcementStudent", {
            email,
            user: req.user,
            pages: pages,
            count: count,
            title: "Instructions Student",
          });
        });
    }
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
    const count = await EmailT.countDocuments();
    var page = req.query.page;
    var PAGE_SIZE = 10;
    var total = Math.ceil(count / PAGE_SIZE + 1);
    const pages = [];
    for (let i = 1; i < total; i++) {
      pages.push(i);
    }

    if (page) {
      page = parseInt(page);
      const skip = (page - 1) * PAGE_SIZE;
      EmailT.find({nameTeacher: teacher.nameTeacher})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((emailTeacher) => {
          emailTeacher = emailTeacher.map((emailTeacher) =>
            emailTeacher.toObject()
          );
          res.render("mailTeacher", {
            emailTeacher,
            user: req.user,
            pages: pages,
            count: count,
            teacher: teacher._id,
            title: "Email Teacher",
          });
        });
    } else {
      page = 1;
      const skip = (page - 1) * PAGE_SIZE;
      EmailT.find({nameTeacher: teacher.nameTeacher})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((emailTeacher) => {
          emailTeacher = emailTeacher.map((emailTeacher) =>
            emailTeacher.toObject()
          );
          res.render("mailTeacher", {
            emailTeacher,
            user: req.user,
            teacher: teacher._id,
            pages: pages,
            count: count,
            title: "Email Teacher",
          });
        });
    }
  }

  // [GET] Send Mail Teacher
  async sendMailTeacher(req, res, next) {
    Teacher.findById(req.params.id).then((teacher) => {
      res.render("sendMailT", {
        teacher: mongooseToObject(teacher),
        user: req.user,
        title: "Detail Teacher",
      });
    });
  }

  // [POST] Send Mail Teacher
  async sendMailT(req, res, next) {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (req.file) {
        fs.readFile(req.file.path, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const emailTeacher = new EmailT({
              codeTeacher: teacher.codeTeacher,
              nameTeacher: teacher.nameTeacher,
              phone: teacher.phone,
              subject: teacher.subject,
              emailTeacher: teacher.emailTeacher,
              subject: req.body.subject,
              html: req.body.html,
              file: req.file.path,
              createdAt: req.body.createdAt,
            });
            emailTeacher.save();

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
              subject: emailTeacher.subject,
              html: emailTeacher.html,
              attachments: {
                __filename: "File",
                path: emailTeacher.file,
              },
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error.message);
              } else {
                console.log("Email send" + info.response);
                res.redirect("/announcement/forTeacher");
              }
            });
          }
        });
      } else {
        const emailTeacher = new EmailT({
          codeTeacher: teacher.codeTeacher,
          nameTeacher: teacher.nameTeacher,
          phone: teacher.phone,
          subject: teacher.subject,
          emailTeacher: teacher.emailTeacher,
          subject: req.body.subject,
          html: req.body.html,
          createdAt: req.body.createdAt,
        });
        emailTeacher.save();

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
          subject: emailTeacher.subject,
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
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new SettingController();
