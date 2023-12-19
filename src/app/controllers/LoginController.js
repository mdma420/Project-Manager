const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
  // [GET] Login
  login(req, res, next) {
    if (req.user) {
      res.render("/", {
        title: "Login",
      });
    } else {
      res.render("login", {
        title: "Login",
      });
    }
  }

  // [POST] Login
  apilogin(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // console.log("da vao func");
    UserModel.findOne({
      username: username,
    })
      .then((data) => {
        if (data) {
          console.log("co ng dung");
          var token = jwt.sign(
            {
              _id: data._id,
            },
            "PW"
          );
          bcrypt.compare(password, data.password, function (err, result) {
            if (err) {
              return res.render("login", {
                msg: "The user or password is incorrect.",
              });
            }
            if (result) {
              res.cookie("token", token, {
                expires: new Date(Date.now() + 1800000),
              });

              return res.redirect("/");
            } else {
              return res.render("login", {
                msg: "The user or password is incorrect.",
              });
            }
          });
        } else {
          return res.render("login", {
            msg: "The user or password is incorrect.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("loi sever");
      });
  }
}

module.exports = new LoginController();
