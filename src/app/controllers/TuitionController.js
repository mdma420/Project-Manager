const Tuition = require("../models/tuition");
const {mongooseToObject} = require("../../util/mongoose");
const {mutipleMongooseToObject} = require("../../util/mongoose");
const Student = require("../models/student");
const ejs = require("ejs");
const pdf = require("html-pdf");
const fs = require("fs");
const path = require("path");
const {options} = require("../../routes/tuition");
const {response} = require("express");

class TuitionController {
  //[GET] Tuition
  tuition(req, res, next) {
    // res.render("tuition");
    Tuition.find({})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
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

  //[GET] Sreach
  sreach(req, res, next) {
    var Key = req.params.key;
    Tuition.find({code: Key} && {name: Key})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          user: req.user,
          title: "Tuition",
        });
      })
      // .then((tuition) => res.redirect("/tuition"))
      .catch(next);
  }

  //[GET] Tuition Student
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

  //[GET] collect tuition
  collecttuition(req, res, next) {
    res.render("collecttuition");
  }

  //[GET] invoice printing
  async exportPDF(req, res, next) {
    try {
      const tuition = await Tuition.find();
      const data = {
        tuition: tuition,
      };
      const filePathName = path.resolve(
        __dirname,
        "../../resources/views/exportPDF.hbs"
      );
      const htmlString = fs.readFileSync(filePathName).toString();
      let option = {
        format: "Letter",
      };
      const ejsData = ejs.render(htmlString, data);
      console.log(ejsData);
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
}

module.exports = new TuitionController();
