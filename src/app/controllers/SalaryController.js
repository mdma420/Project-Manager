const Teacher = require("../models/teacher");
const Salary = require("../models/salary");
const Tablesalary = require("../models/tablesalary");
const Timesheets = require("../models/timesheets");
const Onleave = require("../models/onleave");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

const querystring = require("querystring");
const {error} = require("console");
const timesheets = require("../models/timesheets");

class salaryController {
  // ------------------------------------------------------Management Teacher---------------------------------------------------------- //

  // [GET] Teacher
  teacher(req, res, next) {
    // res.render("teacher");
    Teacher.find({}).then((teacher) => {
      teacher = teacher.map((teacher) => teacher.toObject());
      res.render("teacher", {
        teacher,
        user: req.user,
        title: "Management Teacher",
      });
    });
  }

  // [GET] Manager Creater Teacher
  managerCreateTeacher(req, res, next) {
    Teacher.find({}).then((teacher) => {
      teacher = teacher.map((teacher) => teacher.toObject());
      res.render("MCTeacher", {
        teacher,
        user: req.user,
        title: "Management Create Teacher",
      });
    });
  }

  // [POST] Create Teacher
  createTeacher(req, res, next) {
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
          .then(() => res.redirect("/teacher/MCTeacher"))
          .catch((error) => {});
      }
    });
  }

  // [Delete] Delete Teacher
  deleteTeacher(req, res, next) {
    Teacher.deleteOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/teacher/MCTeacher"))
      .catch((error) => {});
  }

  // [GET] Sreach Teacher
  sreach(req, res, next) {
    var Name = req.query.nameTeacher;
    Teacher.find({nameTeacher: {$regex: Name, $options: "i"}})
      .then((teacher) => {
        teacher = teacher.map((teacher) => teacher.toObject());
        res.render("teacher", {
          teacher,
          Name,
          user: req.user,
          title: "Management Teacher",
        });
      })
      .catch(next);
  }

  // [GET] Detail Teacher
  async detailTeacher(req, res, next) {
    Teacher.findById(req.params.id).then((teacher) => {
      res.render("detailTeacher", {
        teacher: mongooseToObject(teacher),
        user: req.user,
        title: "Detail Teacher",
      });
    });
  }

  // [GET] Update Teacher
  updateTeacher(req, res, next) {
    Teacher.findById(req.params.id).then((teacher) => {
      res.render("updateTeacher", {
        teacher: mongooseToObject(teacher),
        user: req.user,
        title: "Update Teacher",
      });
    });
  }

  // [PUT] Update Teacher
  update(req, res, next) {
    Teacher.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/teacher"))
      .catch(error);
  }

  // [GET] Table Salary Teacher
  tableSalaryTeacher(req, res, next) {
    Teacher.findById(req.params.id).then((teacher) => {
      Timesheets.findOne({codeTeacher: teacher.codeTeacher}, req.body).then(
        (timesheets) => {
          res.render("tableSalaryTeacher", {
            teacher: mongooseToObject(teacher),
            timesheets: mongooseToObject(timesheets),
            user: req.user,
            title: "Table Salary Teacher",
          });
        }
      );
    });
  }

  // ---------------------------------------------Timesheets and list on leave Teacher-------------------------------------------------- //

  // [GET] Timesheets Teacher
  timesheetsTeacher(req, res, next) {
    Timesheets.find({}).then((timesheets) => {
      timesheets = timesheets.map((timesheets) => timesheets.toObject());
      res.render("timesheetsTeacher", {
        timesheets,
        user: req.user,
        title: "timesheets Teacher",
      });
    });
  }

  // [POST] create Timesheets Teacher
  createTimesheets(req, res, next) {
    const timesheets = new Timesheets(req.body);
    timesheets
      .save()
      .then(() => res.redirect("/teacher/timesheetsTeacher"))
      .catch(next);
  }

  // [GET] List On Leave Teacher
  listOnLeaveTeacher(req, res, next) {
    Onleave.find({}).then((onleave) => {
      onleave = onleave.map((onleave) => onleave.toObject());
      res.render("listOnLeaveTeacher", {
        onleave,
        user: req.user,
        title: "List On Leave Teacher",
      });
    });
  }

  // [POST] create List On Leave
  createlistOnLeave(req, res, next) {
    const onleave = new Onleave(req.body);
    onleave
      .save()
      .then(() => res.redirect("/teacher/listOnLeaveTeacher"))
      .catch(next);
  }

  // -----------------------------------------------------------Management Salary----------------------------------------------------- //

  // [GET] Salary
  salary(req, res, next) {
    Salary.find({}).then((salary) => {
      salary = salary.map((salary) => salary.toObject());
      res.render("salary", {
        salary,
        title: "Management Salary",
      });
    });
  }

  // [POST] Create Salary
  createSalary(req, res, next) {
    const salary = new Salary(req.body);
    salary
      .save()
      .then(() => res.redirect("/teacher/salary"))
      .catch(next);
  }

  // [GET] Table Salary
  tableSalary(req, res, next) {
    Salary.findById(req.params.id).then((salary) => {
      Tablesalary.find({idS: salary._id}, req.body).then((tableSalary) => {
        res.render("tableSalary", {
          tableSalary: tableSalary.map((tableSalary) => tableSalary.toObject()),
          salary: mongooseToObject(salary),
          user: req.user,
          title: "Table Salary",
        });
      });
    });
  }

  // [POST] Create Table Salary
  async createTS(req, res, next) {
    const idS = await Salary.findById(req.params.id);
    const tableSalary = new Tablesalary({
      idS: idS._id,
      nameTeacher: req.body.nameTeacher,
      position: req.body.position,
      gloneNumber: req.body.gloneNumber,
      coefficientsSalary: req.body.coefficientsSalary,
      basicSalary: req.body.basicSalary,
      dayWork: req.body.dayWork,
      dayOut: req.body.dayOut,
      allowance: req.body.allowance,
      bonus: req.body.bonus,
      exceptSocialInsurance: req.body.exceptSocialInsurance,
      totalSalary: req.body.totalSalary,
      note: req.body.note,
    });
    tableSalary
      .save()
      .then(() => res.redirect("/teacher/tableSalary/" + idS._id))
      .catch(next);
  }

  // [GET] Update Table Salary
  updateTableSalary(req, res, next) {
    Tablesalary.findById(req.params.id).then((tableSalary) => {
      res.render("updateTS", {
        tableSalary: mongooseToObject(tableSalary),
        user: req.user,
        title: "Update Tabler Salary",
      });
    });
  }

  // [PUT] Update Table Salary
  async updateTS(req, res, next) {
    const TS = await Tablesalary.findById(req.params.id);
    Tablesalary.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/teacher/tableSalary/" + TS.idS))
      .catch(error);
  }

  // -----------------------------------------------------Management Report Salary------------------------------------------------ //

  // [GET] Report Salary
  async reportSalary(req, res, next) {
    Tablesalary.find({}).then((tablesalary) => {
      tablesalary = tablesalary.map((tablesalary) => tablesalary.toObject());
      res.render("reportSalary", {
        tablesalary,
        title: "Report Salary",
      });
    });
  }

  // [POST] Create Report Salary
  createRS(req, res, next) {
    const tablesalary = new Tablesalary(req.body);
    tablesalary
      .save()
      .then(() => res.redirect("/teacher/reportSalary"))
      .catch(next);
  }
}

module.exports = new salaryController();
