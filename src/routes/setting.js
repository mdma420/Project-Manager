const express = require("express");
const router = express.Router();
const settingController = require('../app/controllers/SettingController')

router.get('/instructionsforstudent', settingController.index)

module.exports = router;