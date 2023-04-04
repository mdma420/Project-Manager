const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");
// Management tuition
router.get("/", tuitionController.tuition);
router.post("/createTuition", tuitionController.createTuition);
router.get("/sreach/:key", tuitionController.sreach);
// Management student
router.get("/managementtuition", tuitionController.student);
router.post("/managementtuition/:key", tuitionController.sreachStudent);
router.get(
  "/managmenttuition/collecttuition/:id",
  tuitionController.collecttuition
);
// Management report tuition
router.get("/reportTuition", tuitionController.report);

// Send Mail
router.get("/managmenttuition/sendMail", tuitionController.sendMail);
router.post("/managmenttuition/sendMail/send", tuitionController.send);

// Management Invoice
router.get(
  "/managmenttuition/collecttuition/:id/invoice",
  tuitionController.invoice
);
router.post(
  "/managmenttuition/collecttuition/invoice/exportPDF",
  tuitionController.exportPDF
);

module.exports = router;
