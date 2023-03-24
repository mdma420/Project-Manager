const Teacher = require("../models/teacher");

const querystring = require("querystring");

class salaryController {
  //[GET] Salary/Teacher
  teacher(req, res, next) {
    res.render("salary");
    Teacher.find({}).then((teacher) => {
      teacher = teacher.map((teacher) => teacher.toObject());
      res.render("salary", {
        teacher,
        title: "Management Teacher",
      });
    });
  }

  //[POST] create teacher
  createteacher(req, res, next) {
    var name = req.body.nameTeacher;
    Teacher.findOne({nameTeacher: name}).then((data) => {
      if (data) {
        const message = "Teacher already exists!";
        const url = "/salary?" + querystring.stringify({message: message});
        res.redirect(url);
      } else {
        const teacher = new Teacher(req.body);
        teacher
          .save()
          .then(() => res.redirect("/salary"))
          .catch((error) => {});
      }
    });
  }
}

module.exports = new salaryController();
