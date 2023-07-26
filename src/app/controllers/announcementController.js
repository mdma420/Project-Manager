class SettingController {
  //[GET] instructions for student
  announcement(req, res, next) {
    res.render("announcement");
  }
}

module.exports = new SettingController();
