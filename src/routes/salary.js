const {Router} = require("express");
const express = require("express");
const router = express.Router();
const salaryController = require("../app/controllers/SalaryController");

// Management Teacher
router.put("/:id", salaryController.update);
router.get("/", salaryController.teacher);
router.post("/createTeacher", salaryController.createTeacher);
router.get("/sreach", salaryController.sreach);
router.get("/detailTeacher/:id", salaryController.detailTeacher);
router.get("/updateTeacher/:id", salaryController.updateTeacher);
router.put("/update/:id", salaryController.update);
router.get("/tableSalary", salaryController.tableSalary);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/salary/createSalary", salaryController.createSalary);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);
router.post("/reportSalary/createRS", salaryController.createRS);

module.exports = router;
