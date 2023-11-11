const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");
const {checkLogin, checkManagerStudent} = require("../util/authonize");
const {upload} = require("../util/data");

// Management tuition
router.post("/createTuition", tuitionController.createTuition);
router.get("/sreach", tuitionController.sreach);
router.get("/sreach1", tuitionController.sreach1);

// Table Tuition
router.get("/tableTuition", tuitionController.tableTuition);
router.post("/createTT", tuitionController.createTT);

// Management student
router.get("/createS", tuitionController.createS);
router.post("/createStudent", tuitionController.createStudent);
router.delete("/deleteS/:id", tuitionController.deleteS);
// Table Tui Student
router.get("/managementtuition", tuitionController.student);
router.get("/managementtuition/sreach", tuitionController.sreachStudent);
router.get("/managementtuition/sreach1", tuitionController.sreachStudent1);
router.get(
  "/managmenttuition/collecttuition/:id",
  tuitionController.collecttuition
);

// Management report tuition
router.get("/reportTuition", tuitionController.report);

// History
router.get("/managmenttuition/:id/history", tuitionController.history);

// Send Mail
router.post(
  "/managmenttuition/:id/sendMail/send",
  upload.single("file"),
  tuitionController.send
);

// Management Invoice
router.get(
  "/managmenttuition/collecttuition/:id/invoice",
  tuitionController.invoice
);
// Export PDF
router.post(
  "/managmenttuition/collecttuition/:id/invoice/exportPDF",
  tuitionController.exportPDF
);
router.get("/", tuitionController.tuition);

module.exports = router;
