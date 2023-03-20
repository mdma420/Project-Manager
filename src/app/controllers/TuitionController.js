const Tuition = require("../models/tuition");
const {mongooseToObject} = require("../../util/mongoose");

class TuitionController {
  //[GET] Tuition
  tuition(req, res, next) {
    // res.render("tuition");
    Tuition.find({})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          user: req.user,
          title: "Tuition",
        });
      })
      .catch(next);
  }

  //[POST] Create Tuition
  createTuition(req, res, next) {
    const tuition = new Tuition(req.body);
    tuition
      .save()
      .then(() => res.redirect("/tuition"))
      .catch(next);
    // var name = req.body.name;
    // Tuition.findOne({name: name}).then(() => {
    //   // if (data) {
    //   //   const message = "Category already exists!";
    //   //   const url = "/tuitions?" + querystring.stringify({message: message});
    //   //   res.redirect(url);
    //   // } else {
    //   //   const tuition = new Tuition(req.body);
    //   //   tuition
    //   //     .save()
    //   //     .then(() => res.redirect("/tuition"))
    //   //     .catch((error) => {});
    //   // }
    // });
  }

  //[GET] Sreach
  sreach(req, res, next) {
    var name = req.params.key;
    Tuition.find({code: name} && {name: name})
      .then((tuition) => {
        tuition = tuition.map((tuition) => tuition.toObject());
        res.render("tuition", {
          tuition,
          user: req.user,
          title: "Tuition",
        });
      })
      .catch(next);
  }
}

module.exports = new TuitionController();
