const {Router} = require("express");
const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/RegisterController");

router.get("/", registerController.register);
router.post("/apiregister", registerController.apiregister);

module.exports = router;
