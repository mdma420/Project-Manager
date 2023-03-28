const {Router} = require("express");
const express = require("express");
const router = express.Router();
const tuitionController = require("../app/controllers/TuitionController");
// tuition
router.get("/", tuitionController.tuition);
router.post("/createTuition", tuitionController.createTuition);
router.get("/sreach/:key", tuitionController.sreach);
// management tuition student
router.get("/managementtuition", tuitionController.student);
router.post("/managementtuition/:key", tuitionController.sreachStudent);
router.get(
  "/managmenttuition/collecttuition",
  tuitionController.collecttuition
);

// gui thong bao ve mail
router.get("/managmenttuition/sendMail", tuitionController.sendMail);

// xem hoa don
router.get(
  "/managmenttuition/collecttuition/invoice",
  tuitionController.invoice
);
// In hoa don PDF
router.post(
  "/managmenttuition/collecttuition/invoice/exportPDF",
  tuitionController.exportPDF
);

module.exports = router;
