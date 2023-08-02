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
router.get("/tableSalary/:id", salaryController.tableSalary);

// Timesheets and list on leave Teacher
router.get("/timesheetsTeacher", salaryController.timesheetsTeacher);
router.post("/createTimesheets", salaryController.createTimesheets);
router.get("/listOnLeaveTeacher", salaryController.listOnLeaveTeacher);
router.post("/createlistOnLeave", salaryController.createlistOnLeave);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/salary/createSalary", salaryController.createSalary);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);
router.post("/reportSalary/createRS", salaryController.createRS);

module.exports = router;
