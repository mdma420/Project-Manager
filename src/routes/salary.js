const {Router} = require("express");
const express = require("express");
const router = express.Router();
const salaryController = require("../app/controllers/SalaryController");

// Management Teacher
router.get("/", salaryController.teacher);
router.post("/createTeacher", salaryController.createteacher);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/salary/createSalary", salaryController.createSalary);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);
router.post("/reportSalary/createRS", salaryController.createRS);

module.exports = router;
