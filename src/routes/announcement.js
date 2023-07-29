const express = require("express");
const router = express.Router();
const announcementController = require("../app/controllers/announcementController");

router.get("/", announcementController.announcement);
router.get("/forStudent", announcementController.forStudent);
router.get("/detailForStudent/:id", announcementController.detailForStudent);
router.get("/forTeacher", announcementController.forTeacher);

module.exports = router;
