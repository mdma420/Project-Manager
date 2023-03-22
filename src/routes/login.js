const {Router} = require("express");
const express = require("express");
const router = express.Router();
const loginController = require("../app/controllers/LoginController");

router.get("/", loginController.login);
router.post("/apilogin", loginController.apilogin);

module.exports = router;
