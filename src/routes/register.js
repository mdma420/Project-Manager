const {Router} = require("express");
const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/RegisterController");

router.get("/", registerController.register);
router.post("/apiregister", registerController.apiregister);
router.get("/updateUser/:id", registerController.UpdateUser);
router.put("/UU/:id", registerController.updateUser);
router.delete("/DU/:id", registerController.deleteUser);

module.exports = router;
