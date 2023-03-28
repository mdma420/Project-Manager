const {Router} = require("express");
const express = require("express");
const router = express.Router();
const homeController = require("../app/controllers/HomeController");
const {checkLogin} = require("../util/authonize");

router.get("/", homeController.home);

module.exports = router;
