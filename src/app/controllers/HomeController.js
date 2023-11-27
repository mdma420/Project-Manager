const ReportTuition = require("../models/reportTuition");
const ReportSalary = require("../models/reportSalary");
class HomeController {
  home(req, res, next) {
    ReportTuition.find().then((reportTuition) => {
      reportTuition = reportTuition.map((reportTuition) =>
        reportTuition.toObject()
      );
      ReportSalary.find({}).then((reportSalary) => {
        reportSalary = reportSalary.map((reportSalary) =>
          reportSalary.toObject()
        );
        res.render("home", {
          reportTuition,
          reportSalary,
          title: "home",
        });
      });
    });
  }
}

module.exports = new HomeController();
