const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");

router.get("/", tuitionController.tuition);
router.post("/createTuition", tuitionController.createTuition);
router.get("/sreach/:key", tuitionController.sreach);

module.exports = router;
