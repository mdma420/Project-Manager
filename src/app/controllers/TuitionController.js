const Tuition = require("../models/tuition");
const {mongooseToObject} = require("../../util/mongoose");
const {mutipleMongooseToObject} = require("../../util/mongoose");
const {staffMongoseToObject} = require("../../util/mongoose");
const Student = require("../models/student");
const TableT = require("../models/tableT");
const nodemailer = require("nodemailer");
const Email = require("../models/email");
const Invoice = require("../models/invoice");
const TuitionStudent = require("../models/tuitionStudent");
const ReportTuition = require("../models/reportTuition");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
const {options} = require("../../routes/tuition");
const {response} = require("express");
const {text} = require("body-parser");
const multer = require("multer");
const tableT = require("../models/tableT");
const tuitionStudent = require("../models/tuitionStudent");
const {error} = require("console");

class TuitionController {
  // -------------------------------------------------------Management Tuition--------------------------------------------------------//

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

  //[DELETE] Delete Tuition
  deleteT(req, res, next) {
    Tuition.deleteOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/tuition"))
      .catch((error) => {});
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

  // -----------------------------------------------------Table Tuition-------------------------------------------------------//

  // [GET] Tuition Table
  tableTuition(req, res, next) {
    TableT.find({}).then((tableT) => {
      tableT = tableT.map((tableT) => tableT.toObject());
      res.render("tableTuition", {
        tableT,
        title: "Table Tuition",
      });
    });
  }

  // [POST] Create Tuition Table
  createTT(req, res, next) {
    var nameTableT = req.body.nameTableT;
    TableT.findOne({nameTableT: nameTableT}).then((data) => {
      if (data) {
        const message = "Table already exists!";
        const url =
          "/tuition/tableTuition?" + querystring.stringify({message: message});
        res.redirect(url);
      } else {
        const tableT = new TableT(req.body);
        tableT
          .save()
          .then(() => res.redirect("/tuition/tableTuition"))
          .catch((error) => {});
      }
    });
  }

  //[GET] Tuition Student
  async student(req, res, next) {
    const count = await TuitionStudent.countDocuments({idTT: req.params.id});
    var page = req.query.page;
    var PAGE_SIZE = 5;
    var total = Math.ceil(count / PAGE_SIZE + 1);
    const pages = [];
    for (let i = 1; i < total; i++) {
      pages.push(i);
    }

    if (page) {
      page = parseInt(page);
      const skip = (page - 1) * PAGE_SIZE;
      TableT.findById(req.params.id).then((tableT) => {
        TuitionStudent.find({})
          .skip(skip)
          .limit(PAGE_SIZE)
          .then((tuitionStudent) => {
            tuitionStudent = tuitionStudent.map((tuitionStudent) =>
              tuitionStudent.toObject()
            );
            res.render("managementtuition", {
              TableT: mongooseToObject(tableT),
              tableTId: tableT._id,
              tuitionStudent,
              pages: pages,
              count: count,
              user: req.user,
              title: "managementtuition",
            });
          });
      });
    } else {
      page = 1;
      const skip = (page - 1) * PAGE_SIZE;
      TableT.findById(req.params.id).then((tableT) => {
        TuitionStudent.find({idTT: tableT._id}, req.body)
          .skip(skip)
          .limit(PAGE_SIZE)
          .then((tuitionStudent) => {
            tuitionStudent = tuitionStudent.map((tuitionStudent) =>
              tuitionStudent.toObject()
            );
            res.render("managementtuition", {
              TableT: mongooseToObject(tableT),
              tableTId: tableT._id,
              tuitionStudent,
              pages: pages,
              count: count,
              user: req.user,
              title: "managementtuition",
            });
          });
      });
    }
  }

  //[POST] Create Tuition Student
  async createTS(req, res, next) {
    const idTT = await TableT.findById(req.params.id);
    const s = await Student.find();
    const sLenght = s.length;
    TuitionStudent.findOne({idTT: idTT._id}).then((data) => {
      if (data) {
        res.redirect("/tuition/tableTuition/" + idTT._id);
      } else {
        for (var i = 0; i < sLenght; i++) {
          const codeStudent = s[i].codeStudent;
          const name = s[i].name;
          const science = s[i].science;
          const email = s[i].emailStudent;
          const tuitionStudent = new TuitionStudent({
            idTT: idTT._id,
            codeStudent: codeStudent,
            name: name,
            email: email,
            science: science,
            tuition: "0",
          });
          tuitionStudent
            .save()
            .then(() => res.redirect("/tuition/tableTuition/" + idTT._id))
            .catch(next);
        }
      }
    });
  }

  //[GET] Collect Tuition
  async collecttuition(req, res, next) {
    TuitionStudent.findById(req.params.id).then((tuitionStudent) => {
      var science = tuitionStudent.science;
      var codeStudent = tuitionStudent.codeStudent;
      Student.findOne({codeStudent: codeStudent}).then((student) => {
        Tuition.find({science: science}).then((tuition) => {
          res.render("collecttuition", {
            tuitionStudent: mongooseToObject(tuitionStudent),
            tuition: staffMongoseToObject(tuition),
            student: mongooseToObject(student),
            user: req.user,
            title: "collecttuition",
          });
        });
      });
    });
  }

  //[PUT] Edit Tuition Student
  async edit(req, res, next) {
    const tuitionStudent = await TuitionStudent.findById(req.params.id);
    const id = tuitionStudent.id;
    TuitionStudent.updateOne({_id: id}, req.body)
      .then(() => res.redirect("/tuition/tableTuition/" + tuitionStudent.idTT))
      .catch(next);
  }

  //[Delete Table Tuition]
  async deleteTT(req, res, next) {
    TableT.deleteOne({_id: req.params.id}, req.body).then((data) => {
      if (data) {
        ReportTuition.deleteOne({idTT: req.params.id}, req.body).then(
          (data) => {
            if (data) {
              TuitionStudent.deleteMany({idTT: req.params.id})
                .then(() => res.redirect("/tuition/tableTuition"))
                .catch((error) => {});
            }
          }
        );
      }
    });
  }

  // -----------------------------------------------------Management Student-------------------------------------------------------//

  //[GET] Create Student
  createS(req, res, next) {
    Student.find({}).then((student) => {
      student = student.map((student) => student.toObject());
      res.render("createStudent", {
        student,
        user: req.user,
        title: "Management Create Student",
      });
    });
  }

  //[Post] Create Student
  createStudent(req, res, next) {
    var name = req.body.name;
    Student.findOne({name: name}).then((data) => {
      if (data) {
        const message = "Teacher already exists!";
        const url =
          "/tuition/createS?" + querystring.stringify({message: message});
        res.redirect(url);
      } else {
        const student = new Student(req.body);
        student
          .save()
          .then(() => res.redirect("/tuition/createS"))
          .catch((error) => {});
      }
    });
  }

  //[DELETE] Delete Student
  deleteS(req, res, next) {
    Student.deleteOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/tuition/createS"))
      .catch((error) => {});
  }

  // ------------------------------------------------------------------------------------------------------------------------------//

  //[GET] Invoice
  invoice(req, res, next) {
    TuitionStudent.findById(req.params.id)
      .then((tuitionStudent) => {
        res.render("invoice", {
          tuitionStudent: mongooseToObject(tuitionStudent),
          user: req.user,
          title: "invoice",
        });
      })
      .catch(next);
  }

  //[POST] Invoice Printing
  async exportPDF(req, res, next) {
    const tuitionStudent = await TuitionStudent.findOne({_id: req.params.id});
    Invoice.findOne({
      $and: [{name: tuitionStudent.name}, {subject: tuitionStudent.subject}],
    }).then((data) => {
      if (data) {
        res.redirect("/tuition/tableTuition/" + tuitionStudent.idTT);
        return;
      } else {
        const invoice = new Invoice({
          name: tuitionStudent.name,
          subject: tuitionStudent.subject,
          tuition: tuitionStudent.tuition,
          method: req.body.method,
        });
        invoice.save().then(() => {
          TuitionStudent.updateOne(
            {_id: tuitionStudent.id},
            {
              status: "Tuition has been paid",
            }
          ).then(() => {
            console.log("Tuition status updated successfully");
          });
        });
      }
    });

    const baseUrl = `http://localhost:3000`;
    const url = `${baseUrl}/tuition/tableTuition/invoice/${req.params.id}`;
    const filePath = path.resolve(__dirname, "../../../filePDF/tuition.pdf");
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: "networkidle0"});
    await page.type("#username", "Admin");
    await page.type("#password", "123");
    await page.click("body > div > div > div > form > div > button");
    await page.waitForTimeout(10000);
    await page.goto(url);
    await page.waitForSelector(".main__Invoice");
    const test = await page.$(".main__Invoice");
    const test2 = await test.boundingBox();

    // await page.addStyleTag({
    //   content: ".header-list{display: none !improtant;}",
    //   content: ".form__Invoice button{display: none !improtant;}",
    // });
    await page.addStyleTag({
      content: `
      .header-list { display: none !important; }
      .form__Invoice button { display: none !important; }
      @media print {
        .header-list, .form__Invoice button { display: none !important; }
      }
    `,
    });
    // await page.addStyleTag({
    //   content: ".main__Invoice{width: 500%; height: 50vh}",
    // });
    await page.pdf({
      path: filePath,
      displayHeaderFooter: false,
      landscape: false,
      format: "a4",
      printBackground: false,
      clip: {
        x: test2.x,
        y: test2.y,
        width: test2.width,
        height: test2.height,
      },
    });
    await browser.close();

    res.download(filePath);
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
  }

  //[POST] Send Email
  async send(req, res, next) {
    try {
      const tuitionStudent = await TuitionStudent.findById(req.params.id);
      const email = new Email({
        codeStudent: tuitionStudent.codeStudent,
        nameStudent: tuitionStudent.name,
        emailStudent: tuitionStudent.email,
        subject: "Notice of tuition payment " + tuitionStudent.subject,
        html:
          tuitionStudent.subject +
          " subjects have tuition fees of " +
          tuitionStudent.tuition +
          "vnd",
        createdAt: req.body.createdAt,
      });
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
        to: "quycan1xxx@gmail.com",
        subject: email.subject,
        html: email.html,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Email send" + info.response);
          res.redirect("/tuition/tableTuition/" + tuitionStudent.idTT);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // ------------------------------------------------------------Management Report Tuition---------------------------------------//

  //[GET] Report
  report(req, res, next) {
    ReportTuition.find().then((reportTuition) => {
      reportTuition = reportTuition.map((reportTuition) =>
        reportTuition.toObject()
      );
      res.render("reportTuition", {
        reportTuition,
        title: "reportTuition",
      });
    });

    // res.render("reportTuition");
  }

  //[POST] Total Tuition
  async createRT(req, res, next) {
    const idTT = await TableT.findById(req.params.id);
    const tt = await TuitionStudent.find({idTT: idTT.id});
    console.log(tt);
    const ttLenght = tt.length;
    ReportTuition.findOne({nameTT: idTT.nameTableT}).then((data) => {
      if (data) {
        res.redirect("/tuition/reportTuition");
      } else {
        const tuitions = [];
        for (var i = 0; i < ttLenght; i++) {
          const tuition = Number(tt[i].tuition);
          tuitions.push(tuition);
        }
        console.log(tuitions);
        const total = tuitions.reduce((acc, tuition) => acc + tuition, 0);
        const reportTuition = new ReportTuition({
          idTT: idTT._id,
          nameTT: idTT.nameTableT,
          tuitionPeriod1: idTT.tableTPeriod1,
          tuitionPeriod2: idTT.tableTPeriod2,
          totalTT: total,
        });
        reportTuition
          .save()
          .then(() => res.redirect("/tuition/reportTuition"))
          .catch(next);
      }
    });
  }
}

module.exports = new TuitionController();
