const Tuition = require("../models/tuition");
const {mongooseToObject} = require("../../util/mongoose");
const {mutipleMongooseToObject} = require("../../util/mongoose");
const Student = require("../models/student");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
const {options} = require("../../routes/tuition");
const {response} = require("express");
const {text} = require("body-parser");

class TuitionController {
  // Management Tuition
  //[GET] Tuition
  tuition(req, res, next) {
    // res.render("tuition");
    var Key = req.params.key;
    Tuition.find({})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          Key,
          user: req.user,
          title: "Tuition",
        });
      })
      .catch(next);
  }

  //[POST] Create Tuition
  createTuition(req, res, next) {
    const tuition = new Tuition(req.body);
    tuition
      .save()
      .then(() => res.redirect("/tuition"))
      .catch(next);
    // var name = req.body.name;
    // Tuition.findOne({name: name}).then(() => {
    //   // if (data) {
    //   //   const message = "Category already exists!";
    //   //   const url = "/tuitions?" + querystring.stringify({message: message});
    //   //   res.redirect(url);
    //   // } else {
    //   //   const tuition = new Tuition(req.body);
    //   //   tuition
    //   //     .save()
    //   //     .then(() => res.redirect("/tuition"))
    //   //     .catch((error) => {});
    //   // }
    // });
  }

  // [GET] Sreach Tuition
  sreach(req, res, next) {
    var Key = req.params.key;
    Tuition.find({name: Key})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          Key,
          user: req.user,
          title: "Tuition",
        });
      })
      // .then((tuition) => res.redirect("/tuition"))
      .catch(next);
  }

  //Management Student
  //[GET] Student
  student(req, res, next) {
    Student.find()
      .then((student) => {
        student = student.map((student) => student.toObject());
        res.render("managementtuition", {
          student,
          user: req.user,
          title: "managementtuition",
        });
      })
      .catch(next);
  }

  //[POST] Sreach Student
  sreachStudent(req, res, next) {
    var name = req.params.key;
    Student.find({codeStudent: name})
      .then((student) => {
        student = student.map((student) => student.toObject());
        res.render("managementtuition", {
          student,
          user: req.user,
          title: "managementtuition",
        });
      })
      .catch(next);
  }

  //[GET] Collect Tuition
  collecttuition(req, res, next) {
    res.render("collecttuition");
  }

  //[GET] Invoice
  invoice(req, res, next) {
    Tuition.find({})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("invoice", {
          tuition,
          user: req.user,
          title: "invoice",
        });
        // console.log(student);
      })
      .catch(next);
  }

  //[POST] Invoice Printing
  async exportPDF(req, res, next) {
    try {
      const tuition = await Tuition.find();
      const data = {
        tuition: tuition,
      };
      const student = await Student.find();
      const dataS = {
        student: student,
      };
      const filePathName = path.resolve(
        __dirname,
        "../../resources/views/invoice.hbs"
      );
      const htmlString = fs.readFileSync(filePathName).toString();
      let option = {
        format: "Letter",
      };
      const ejsData = ejs.render(htmlString, data, dataS);
      // console.log(ejsData);
      pdf.create(ejsData, option).toFile("tuition.pdf", (err, response) => {
        if (err) console.log(err);
        const filePath = path.resolve(__dirname, "../../../tuition.pdf");

        fs.readFile(filePath, (err, file) => {
          if (err) {
            console.log(err);
            return res.status(500).send("could not dowload file");
          }

          res.set("Content-Type", "application/pdf");
          res.set("Content-Disposition", 'attachment;filename="tuition.pdf"');

          res.send(file);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //[GET] Send Email
  sendMail(req, res, next) {
    res.render("sendMail");
  }

  //[POST] Send Email
  async send(req, res, next) {
    try {
      const student = await Student.find();
      // console.log(student.emailStudent);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "npq10102001@gmail.com",
          pass: "rrownmqpepzvoylj",
        },
      });

      var mailOptions = {
        from: "npq10102001@gmail.com",
        to: student,
        subject: "thong bao hoc phi",
        text: "hoc phi",
        html: "thong bao hoc sinh den dong hoc phi",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Email send" + info.response);
          res.redirect("/tuition/managementtuition");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Management Report Tuition
  //[GET] Report
  report(req, res, next) {
    res.render("reportTuition");
  }
}

module.exports = new TuitionController();
