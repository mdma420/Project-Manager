const Teacher = require("../models/teacher");
const Salary = require("../models/salary");
const Tablesalary = require("../models/tablesalary");
const ReportSalary = require("../models/reportSalary");
const fs = require("fs");
const excelJs = require("exceljs");
const puppeteer = require("puppeteer");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

const querystring = require("querystring");
const {error} = require("console");
const path = require("path");
const tablesalary = require("../models/tablesalary");
const {tuition} = require("./TuitionController");

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
        const url =
          "/teacher/MCTeacher?" + querystring.stringify({message: message});
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

  // [GET] sreach Subject Teacher
  sreachS(req, res, next) {
    var Subject = req.query.subject;
    Teacher.find({subject: {$regex: Subject}})
      .then((teacher) => {
        teacher = teacher.map((teacher) => teacher.toObject());
        res.render("teacher", {
          teacher,
          Subject,
          user: req.user,
          title: "Management Teacher",
        });
      })
      .catch(next);
  }

  // [GET] Detail Teacher
  async detailTeacher(req, res, next) {
    Teacher.findById(req.params.id).then((teacher) => {
      var name = teacher.nameTeacher;
      Tablesalary.find({nameTeacher: name}, req.body).then((tableSalary) => {
        res.render("detailTeacher", {
          tableSalary: tableSalary.map((tableSalary) => tableSalary.toObject()),
          teacher: mongooseToObject(teacher),
          user: req.user,
          title: "Detail Teacher",
        });
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
    const t = await Teacher.find();
    const tLenght = t.length;
    Tablesalary.findOne({idS: idS._id}).then((data) => {
      if (data) {
        res.redirect("/teacher/tableSalary/" + idS._id);
      } else {
        for (var i = 0; i < tLenght; i++) {
          const name = t[i].nameTeacher;
          const position = t[i].position;
          const basicSalary = Number(t[i].basicSalary);
          const s = Number(150000);
          const dwork = Number(30);
          const dout = Number(0);
          const allowance = Number(1000000);
          const exceptSocialInsurance = Number(
            (basicSalary + s * dwork - s * dout + allowance) * 0.104 - 750000
          );
          const tableSalary = new Tablesalary({
            idS: idS._id,
            nameSalary: idS.nameSalary,
            nameTeacher: name,
            position: position,
            basicSalary: basicSalary,
            dayWork: dwork,
            dayOut: dout,
            allowance: allowance,
            exceptSocialInsurance: exceptSocialInsurance,
            totalSalary:
              basicSalary +
              s * dwork -
              s * dout +
              allowance -
              exceptSocialInsurance,
          });
          tableSalary
            .save()
            .then(() => res.redirect("/teacher/tableSalary/" + idS._id))
            .catch(next);
        }
      }
    });
  }

  // [GET] Detail Table Salary
  detailTB(req, res, next) {
    Tablesalary.findById(req.params.id).then((tableSalary) => {
      res.render("detailTB", {
        tableSalary: mongooseToObject(tableSalary),
        user: req.user,
        title: "Detail Table Salary",
      });
    });
  }

  // [GET] Detail Table Salary
  detailSalary(req, res, next) {
    Tablesalary.findById(req.params.id).then((tableSalary) => {
      res.render("invoiceSalary", {
        tableSalary: mongooseToObject(tableSalary),
        user: req.user,
        title: "Detail Table Salary",
      });
    });
  }

  // [DELETE] Delete Salary
  async deleteSalary(req, res, next) {
    Salary.deleteOne({_id: req.params.id}, req.body).then((data) => {
      if (data) {
        ReportSalary.deleteOne({idS: req.params.id}, req.body).then((data) => {
          if (data) {
            Tablesalary.deleteMany({idS: req.params.id})
              .then(() => res.redirect("/teacher/salary"))
              .catch((error) => {});
          }
        });
        // .then(() => res.redirect("/teacher/salary"))
        // .catch((error) => {});
      }
    });
  }

  // -----------------------------------------------------Export file Salary------------------------------------------------ //

  // [POST] Edit Salary
  async editSalary(req, res, next) {
    const t = await Tablesalary.findById(req.params.id);
    const basicSalary = Number(t.basicSalary);
    const s = Number(150000);
    const dayWork = Number(30);
    const dayOut = Number(req.body.dayOut);
    const allowance = Number(1000000);
    const exceptSocialInsurance = Number(
      (basicSalary + s * dayWork - s * dayOut + allowance) * 0.104 - 750000
    );
    Tablesalary.updateOne(
      {_id: req.params.id},
      {
        dayWork: dayWork - dayOut,
        dayOut: dayOut,
        exceptSocialInsurance: exceptSocialInsurance,
        totalSalary:
          basicSalary +
          s * dayWork -
          s * dayOut +
          allowance -
          exceptSocialInsurance,
      }
    )
      .then(() => res.redirect("/teacher/tableSalary/" + t.idS))
      .catch(next);
  }

  // [GET] export Excel Salary
  async exportExcel(req, res, next) {
    try {
      let workbook = new excelJs.Workbook();
      const worksheet = workbook.addWorksheet("tableSalary");
      worksheet.columns = [
        {header: "Name Teacher", key: "nameTeacher", width: 30},
        {header: "Position", key: "position", width: 30},
        {header: "Basic Salary", key: "basicSalary", width: 30},
        {header: "Day Work", key: "dayWork", width: 30},
        {header: "Day Out", key: "dayOut", width: 30},
        {header: "Allowance", key: "allowance", width: 30},
        {
          header: "Except Social Insurance",
          key: "exceptSocialInsurance",
          width: 30,
        },
        {header: "Total Salary", key: "totalSalary", width: 30},
      ];

      const idSa = req.params.id;
      const tableSalary = await tablesalary.find({idS: idSa});

      tableSalary.forEach((tableSalary) => {
        worksheet.addRow(tableSalary);
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = {bold: true};
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment;filename-" + "idea.xlsx"
      );
      workbook.xlsx.write(res);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------------------------------Management Report Salary------------------------------------------------ //

  // [GET] Report Salary
  async reportSalary(req, res, next) {
    ReportSalary.find({}).then((reportSalary) => {
      reportSalary = reportSalary.map((reportSalary) =>
        reportSalary.toObject()
      );
      res.render("reportSalary", {
        reportSalary,
        title: "Report Salary",
      });
    });
  }

  async createRS(req, res, next) {
    const idS = await Salary.findById(req.params.id);
    const nameSalary = idS.nameSalary;
    const t = await Tablesalary.find({idS: idS._id});
    const tLeaght2 = t.length;
    ReportSalary.findOne({nameSalary: nameSalary}).then((data) => {
      if (data) {
        res.redirect("/teacher/reportSalary");
      } else {
        const tableSalarys = [];
        for (var i = 0; i < tLeaght2; i++) {
          const tableSalary = Number(t[i].totalSalary);
          tableSalarys.push(tableSalary);
        }
        const total = tableSalarys.reduce(
          (acc, tableSalary) => acc + tableSalary,
          0
        );
        const reportSalary = new ReportSalary({
          idS: idS._id,
          nameSalary: nameSalary,
          salaryPeriod1: idS.salaryPeriod1,
          salaryPeriod2: idS.salaryPeriod2,
          totalSalary: total,
        });
        reportSalary
          .save()
          .then(() => res.redirect("/teacher/reportSalary"))
          .catch(next);
      }
    });
  }
}

module.exports = new salaryController();
