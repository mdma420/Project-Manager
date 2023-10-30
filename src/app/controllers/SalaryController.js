const Teacher = require("../models/teacher");
const Salary = require("../models/salary");
const Tablesalary = require("../models/tablesalary");
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

  // ---------------------------------------------Timesheets and list on leave Teacher-------------------------------------------------- //

  // [GET] List On Leave Teacher
  listOnLeaveTeacher(req, res, next) {
    // Onleave.find({}).then((onleave) => {
    //   onleave = onleave.map((onleave) => onleave.toObject());
    //   res.render("listOnLeaveTeacher", {
    //     onleave,
    //     user: req.user,
    //     title: "List On Leave Teacher",
    //   });
    // });
    res.render("listOnLeaveTeacher");
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
  // async createTS(req, res, next) {
  //   const idS = await Salary.findById(req.params.id);
  //   const tableSalary = new Tablesalary({
  //     idS: idS._id,
  //     nameTeacher: req.body.nameTeacher,
  //     position: req.body.position,
  //     gloneNumber: req.body.gloneNumber,
  //     coefficientsSalary: req.body.coefficientsSalary,
  //     basicSalary: req.body.basicSalary,
  //     dayWork: req.body.dayWork,
  //     dayOut: req.body.dayOut,
  //     allowance: req.body.allowance,
  //     bonus: req.body.bonus,
  //     exceptSocialInsurance: req.body.exceptSocialInsurance,
  //     totalSalary: req.body.totalSalary,
  //     note: req.body.note,
  //   });
  //   tableSalary
  //     .save()
  //     .then(() => res.redirect("/teacher/tableSalary/" + idS._id))
  //     .catch(next);
  // }

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
  invoiceSalary(req, res, next) {
    Tablesalary.findById(req.params.id).then((tableSalary) => {
      res.render("invoiceSalary", {
        tableSalary: mongooseToObject(tableSalary),
        user: req.user,
        title: "Detail Table Salary",
      });
    });
  }

  // [POST] export PDF Salary
  async exportSalary(req, res, next) {
    const tableSalary = await Tablesalary.findOne({_id: req.params.id});

    const baseUrl = `http://localhost:3000`;
    const url = `${baseUrl}/teacher/invoiceSalary/${req.params.id}`;
    const filePath = path.resolve(
      __dirname,
      "../../../filePDF/tableSalary.pdf"
    );
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: "networkidle0"});
    await page.type("#username", "Admin");
    await page.type("#password", "123");
    await page.click("body > div > div > div > form > div > button");
    await page.waitForTimeout(10000);
    await page.goto(url);
    await page.addStyleTag({
      content: ".header-list{display: none !improtant;}",
    });
    await page.pdf({
      path: filePath,
      displayHeaderFooter: false,
      landscape: false,
      format: "a4",
      printBackground: false,
    });
    await browser.close();

    res.download(filePath);
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
        {header: "Bonus", key: "bonus", width: 30},
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
    Salary.find({}).then((salary) => {
      salary = salary.map((salary) => salary.toObject());
      res.render("reportSalary", {
        salary,
        title: "Report Salary",
      });
    });
  }
}

module.exports = new salaryController();
