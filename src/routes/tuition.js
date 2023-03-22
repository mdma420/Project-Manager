const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");

router.get("/", tuitionController.tuition);
router.post("/createTuition", tuitionController.createTuition);
router.post("/sreach/:key", tuitionController.sreach);
router.get("/managementtuition", tuitionController.student);
router.get("/managementtuition/:key", tuitionController.sreachStudent);
router.get(
  "/managmentttuition/collecttuition",
  tuitionController.collecttuition
);

module.exports = router;
