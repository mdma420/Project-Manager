const express = require("express");
const router = express.Router();
const announcementController = require("../app/controllers/announcementController");

// All
router.get("/", announcementController.announcement);

// Student
router.get("/forStudent", announcementController.forStudent);
router.get("/detailForStudent/:id", announcementController.detailForStudent);

// Teacher
router.get("/forTeacher", announcementController.forTeacher);
router.get("/mailTeacher/:id", announcementController.mailTeacher);
router.post("/sendMailT/:id", announcementController.sendMailT);

module.exports = router;
