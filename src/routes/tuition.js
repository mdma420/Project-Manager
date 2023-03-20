const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");

router.get("/", tuitionController.tuition);
router.post("/createTuition", tuitionController.createTuition);

module.exports = router;
