const ReportTuition = require("../models/reportTuition");
class HomeController {
  home(req, res, next) {
    ReportTuition.find().then((reportTuition) => {
      reportTuition = reportTuition.map((reportTuition) =>
        reportTuition.toObject()
      );
      console.log(reportTuition);
      res.render("home", {
        reportTuition,
        title: "Home ",
      });
    });
    // res.render('home', {
    //     title: 'Home'
    // })
  }
}

module.exports = new HomeController();
