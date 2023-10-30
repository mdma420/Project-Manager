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

// Timesheets and list on leave Teacher
router.get("/listOnLeaveTeacher", salaryController.listOnLeaveTeacher);

// Management Salary
router.get("/salary", salaryController.salary);
router.post("/createSalary", salaryController.createSalary);
router.get("/tableSalary/:id", salaryController.tableSalary);
// router.post("/tableSalary/:id/createTS", salaryController.createTS);
router.get("/detailTB/:id", salaryController.detailTB);
// file export
router.get("/invoiceSalary/:id", salaryController.invoiceSalary);
router.post("/detailTB/:id/exportPDF", salaryController.exportSalary);
router.get("/exportExcel/:id", salaryController.exportExcel);

// Management Report Salary
router.get("/reportSalary", salaryController.reportSalary);

module.exports = router;
