class SettingController {
  //[GET] instructions for student
  index(req, res, next) {
    res.render("instructionsforstudent");
  }
}

module.exports = new SettingController();
