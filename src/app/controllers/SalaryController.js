const Teacher = require("../models/teacher");
const Salary = require("../models/salary");
const Tablesalary = require("../models/tablesalary");
const Salarycontract = require("../models/salarycontract");

const querystring = require("querystring");

class salaryController {
  //[GET] Teacher
  teacher(req, res, next) {
    // res.render("teacher");
    Teacher.find({}).then((teacher) => {
      teacher = teacher.map((teacher) => teacher.toObject());
      res.render("teacher", {
        teacher,
        title: "Management Teacher",
      });
    });
  }

  //[POST] Create Teacher
  createteacher(req, res, next) {
    var name = req.body.nameTeacher;
    Teacher.findOne({nameTeacher: name}).then((data) => {
      if (data) {
        const message = "Teacher already exists!";
        const url = "/salary?" + querystring.stringify({message: message});
        res.redirect(url);
      } else {
        const teacher = new Teacher(req.body);
        teacher
          .save()
          .then(() => res.redirect("/salary"))
          .catch((error) => {});
      }
    });
  }

  //[GET] Salary
  salary(req, res, next) {
    Salary.find({}).then((salary) => {
      salary = salary.map((salary) => salary.toObject());
      res.render("salary", {
        salary,
        title: "Management Salary",
      });
    });
  }

  //[POST] Create Salary
  createSalary(req, res, next) {
    const salary = new Salary(req.body);
    salary
      .save()
      .then(() => res.redirect("/teacher/salary"))
      .catch(next);
  }

  //[GET] Report Salary
  async reportSalary(req, res, next) {
    // res.render("reportSalary");
    const teacher = await Teacher.find();
    const salarycontract = await Salarycontract.find();
    // console.log(salarycontract);
    Tablesalary.find({}).then((tablesalary) => {
      tablesalary = tablesalary.map((tablesalary) => tablesalary.toObject());
      res.render("reportSalary", {
        tablesalary,
        salarycontract,
        teacher,
        title: "Report Salary",
      });
    });
  }

  //[POST] Create Report Salary
  createRS(req, res, next) {
    const tablesalary = new Tablesalary(req.body);
    tablesalary
      .save()
      .then(() => res.redirect("/teacher/reportSalary"))
      .catch(next);
  }
}

module.exports = new salaryController();
