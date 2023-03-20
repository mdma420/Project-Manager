const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");

router.get("/", tuitionController.tuition);

module.exports = router;
