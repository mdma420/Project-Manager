const {Router} = require("express");
const express = require("express");
const router = express.Router();
const salaryController = require("../app/controllers/SalaryController");

router.get("/", salaryController.teacher);
router.post("/createTeacher", salaryController.createteacher);

module.exports = router;
