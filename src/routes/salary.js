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
router.get("/sreachS", salaryController.sreachS);
router.get("/detailTeacher/:id", salaryController.detailTeacher);
router.get("/updateTeacher/:id", salaryController.updateTeacher);
router.put("/update/:id", salaryController.update);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/createSalary", salaryController.createSalary);
router.get("/tableSalary/:id", salaryController.tableSalary);
router.get("/tableSalaryfinal/:id", salaryController.tableSalaryfinal);
router.post("/tableSalary/:id/createTS", salaryController.createTS);
router.get("/detailTB/:id", salaryController.detailTB);
router.delete("/deleteSalary/:id", salaryController.deleteSalary);
router.get("/invoiceSalary/:id", salaryController.detailSalary);
router.put("/detailTB/:id/editSalary", salaryController.editSalary);
router.get("/exportExcel/:id", salaryController.exportExcel);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);
router.post("/reportSalary/:id/createRS", salaryController.createRS);

module.exports = router;
