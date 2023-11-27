const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");
const {checkLogin, checkManagerStudent} = require("../util/authonize");
const {upload} = require("../util/data");

// Management tuition
router.post("/createTuition", tuitionController.createTuition);
router.delete("/deleteTuition/:id", tuitionController.deleteT);
router.get("/sreach", tuitionController.sreach);
router.get("/sreach1", tuitionController.sreach1);

// Table Tuition
router.get("/tableTuition", tuitionController.tableTuition);
router.post("/createTT", tuitionController.createTT);
router.get("/tableTuition/:id", tuitionController.student);
router.post("/tableTuition/:id/createTS", tuitionController.createTS);
router.get(
  "/tableTuition/collecttuition/:id",
  tuitionController.collecttuition
);
router.put("/tableTuition/collecttuition/:id/edit", tuitionController.edit);
router.delete("/tableTuition/:id", tuitionController.deleteTT);

// Management student
router.get("/createS", tuitionController.createS);
router.post("/createStudent", tuitionController.createStudent);
router.delete("/deleteS/:id", tuitionController.deleteS);
router.get("/reportTuition/history/:id", tuitionController.history);

// Management report tuition
router.get("/reportTuition", tuitionController.report);
router.post("/reportTuition/:id", tuitionController.createRT);

// Send Mail
router.post("/tableTuition/sendMail/:id", tuitionController.send);

// Management Invoice
router.get("/tableTuition/invoice/:id", tuitionController.invoice);
// Export PDF Invoice
router.post("/tableTuition/invoice/:id/exportPDF", tuitionController.exportPDF);

router.get("/", tuitionController.tuition);

module.exports = router;
