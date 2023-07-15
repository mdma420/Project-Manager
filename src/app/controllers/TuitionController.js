const Tuition = require("../models/tuition");
const {mongooseToObject} = require("../../util/mongoose");
const {mutipleMongooseToObject} = require("../../util/mongoose");
const Student = require("../models/student");
const nodemailer = require("nodemailer");
const Email = require("../models/email");
const Invoice = require("../models/invoice");
const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
const {options} = require("../../routes/tuition");
const {response} = require("express");
const {text} = require("body-parser");
const email = require("../models/email");

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
    var Name = req.query.name;
    Tuition.find({name: {$regex: Name, $options: "i"}})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          Name,
          user: req.user,
          title: "Tuition",
        });
      })
      // .then((tuition) => res.redirect("/tuition"))
      .catch(next);
  }

  // [GET] Sreach select
  sreach1(req, res, next) {
    var Science = req.query.science;
    var Status = req.query.status;
    Tuition.find({science: {$regex: Science}})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          Status,
          Science,
          user: req.user,
          title: "Tuition",
        });
      })
      // .then((tuition) => res.redirect("/tuition"))
      .catch(next);
  }

  // Management Student
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

  //[GET] Sreach Student
  sreachStudent(req, res, next) {
    var Name = req.query.name;
    Student.find({name: {$regex: Name, $options: "i"}})
      .then((student) => {
        student = student.map((student) => student.toObject());
        res.render("managementtuition", {
          student,
          Name,
          user: req.user,
          title: "managementtuition",
        });
      })
      .catch(next);
  }

  //[GET] Select Sreach Student
  sreachStudent1(req, res, next) {
    var Science = req.query.science;
    Student.find({science: Science})
      .then((student) => {
        student = student.map((student) => student.toObject());
        res.render("managementtuition", {
          student,
          Science,
          user: req.user,
          title: "managementtuition",
        });
      })
      .catch(next);
  }

  //[GET] Collect Tuition
  async collecttuition(req, res, next) {
    // res.render("collecttuition");
    // const tuition = await Tuition.find();
    // console.log(tuition);
    Student.findById(req.params.id)
      .then((student) => {
        var studentScience = student.science;
        Tuition.find({science: studentScience}).then((tuition) => {
          res.render("collecttuition", {
            student: mongooseToObject(student),
            tuition: mutipleMongooseToObject(tuition),
            user: req.user,
            title: "collecttuition",
          });
        });
        // student = student.map((student) => student.toObject());
        // res.render("collecttuition", {
        //   student: mongooseToObject(student),
        //   tuition: mutipleMongooseToObject(tuition),
        //   user: req.user,
        //   title: "collecttuition",
        // });
      })
      .catch(next);
  }

  //[GET] Invoice
  invoice(req, res, next) {
    Student.findById(req.params.id)
      .then((student) => {
        // tuition = tuition.map((tuition) => tuition.toObject());
        res.render("invoice", {
          student: mongooseToObject(student),
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
      const student = await Student.findById(req.params.id);
      const dataS = {
        student: student,
      };
      const invoice = new Invoice({
        name: student.name,
        email: student.emailStudent,
        fee: req.body.fee,
        method: req.body.method,
      });
      await invoice.save();
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

  //[GET] History
  async history(req, res, next) {
    const student = await Student.findById(req.params.id);
    Invoice.find({name: student.name})
      .then((invoice) => {
        invoice = invoice.map((invoice) => invoice.toObject());
        Email.find({emailStudent: student.emailStudent}).then((email) => {
          email = email.map((email) => email.toObject());
          res.render("history", {
            email,
            invoice,
            title: "History",
          });
        });
      })
      .catch(next);
    // Email.find({emailStudent: student.emailStudent})
    //   .then((email) => {
    //     email = email.map((email) => email.toObject());
    //     res.render("history", {
    //       email,
    //       title: "History",
    //     });
    //   })
    //   .catch(next);
  }

  //[POST] Send Email
  async send(req, res, next) {
    try {
      const student = await Student.findById(req.params.id);
      const email = new Email({
        emailStudent: student.emailStudent,
        subject: req.body.subject,
        html: req.body.html,
        createdAt: req.body.createdAt,
      });
      // email.push({
      //   emailStudent: student.emailStudent,
      //   subject: req.body.subject,
      //   html: req.body.html,
      //   createdAt: req.body.createdAt,
      // });
      await email.save();
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "npq10102001@gmail.com",
          pass: "rrownmqpepzvoylj",
        },
      });

      var mailOptions = {
        from: "npq10102001@gmail.com",
        to: student.emailStudent,
        subject: email.subject,
        html: email.html,
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
    Student.find()
      .then((student) => {
        student = student.map((student) => student.toObject());
        Invoice.find().then((invoice) => {
          invoice = invoice.map((invoice) => invoice.toObject());
          res.render("reportTuition", {
            student,
            invoice,
            title: "Report Tuition",
          });
        });
      })
      .catch(next);
    // res.render("reportTuition");
  }
}

module.exports = new TuitionController();
