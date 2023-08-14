const {Router} = require("express");
const express = require("express");
const router = express.Router();
const salaryController = require("../app/controllers/SalaryController");

// Management Teacher
router.put("/:id", salaryController.update);
router.get("/", salaryController.teacher);
router.get("/MCTeacher", salaryController.managerCreateTeacher);
router.post("/createTeacher", salaryController.createTeacher);
router.delete("/deleteTeacher/:id", salaryController.deleteTeacher);
router.get("/sreach", salaryController.sreach);
router.get("/detailTeacher/:id", salaryController.detailTeacher);
router.get("/updateTeacher/:id", salaryController.updateTeacher);
router.put("/update/:id", salaryController.update);
router.get("/tableSalaryTeacher/:id", salaryController.tableSalaryTeacher);

// Timesheets and list on leave Teacher
router.get("/timesheetsTeacher", salaryController.timesheetsTeacher);
router.post("/createTimesheets", salaryController.createTimesheets);
router.get("/listOnLeaveTeacher", salaryController.listOnLeaveTeacher);
router.post("/createlistOnLeave", salaryController.createlistOnLeave);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/createSalary", salaryController.createSalary);
router.get("/tableSalary/:id", salaryController.tableSalary);
router.post("/tableSalary/:id/createTS", salaryController.createTS);
router.get("/tableSalary/updateTS/:id", salaryController.updateTableSalary);
router.put("/updateTS/:id", salaryController.updateTS);
router.get("/detailTB/:id", salaryController.detailTB);
router.get("/invoiceSalary/:id", salaryController.invoiceSalary);
router.post("/detailTB/:id/exportPDF", salaryController.exportSalary);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);

module.exports = router;
