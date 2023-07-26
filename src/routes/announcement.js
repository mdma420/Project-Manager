const express = require("express");
const router = express.Router();
const announcementController = require("../app/controllers/announcementController");

router.get("/", announcementController.announcement);

module.exports = router;
