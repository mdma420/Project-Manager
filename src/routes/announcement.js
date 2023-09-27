const express = require("express");
const router = express.Router();
const announcementController = require("../app/controllers/announcementController");
const {
  checkManagerStudent,
  checkManagerTeacher,
  checkManager,
} = require("../util/authonize");

// All
router.get("/", checkManager, announcementController.announcement);

// Student
router.get(
  "/forStudent",
  checkManagerStudent,
  announcementController.forStudent
);
router.get(
  "/detailForStudent/:id",
  checkManagerStudent,
  announcementController.detailForStudent
);

// Teacher
router.get(
  "/forTeacher",
  checkManagerTeacher,
  announcementController.forTeacher
);
router.get(
  "/mailTeacher/:id",
  checkManagerTeacher,
  announcementController.mailTeacher
);
router.get(
  "/sendMailTeacher/:id",
  checkManagerTeacher,
  announcementController.sendMailTeacher
);
router.post(
  "/sendMailT/:id",
  checkManagerTeacher,
  announcementController.sendMailT
);

module.exports = router;
