const User = require("../models/user");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const querystring = require("querystring");

class RegisterController {
  // [GET] Register
  register(req, res, next) {
    // res.render("register");
    User.find({}).then((user) => {
      user = user.map((user) => user.toObject());
      res.render("register", {
        user,
        title: "Register User",
      });
    });
  }

  // [POST] register user
  apiregister(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;
    var role = req.body.role;

    UserModel.findOne({
      username: username,
    })
      .then((data) => {
        console.log(data);
        if (data) {
          const message = "Account already exists!";
          const url = "/login?" + querystring.stringify({message: message});
          res.redirect(url);
        } else {
          UserModel.findOne({
            email: email,
          })
            .then((data) => {
              if (data) {
                const message = "Account already exists!";
                const url =
                  "/login?" + querystring.stringify({message: message});
                res.redirect(url);
              } else {
                // console.log("da toi day");
                bcrypt.hash(password, 10, function (err, hash) {
                  // Store hash in your password DB.
                  // console.log(hash)
                  UserModel.create({
                    username: username,
                    password: hash,
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    role: role,
                  });
                });
                return res.redirect("/register");
              }
            })
            .catch((err) => {
              console.error(err);
              res.json("Lỗi kiểm tra địa chỉ email");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.json("Lỗi kiểm tra tài khoản");
      });
  }
}

module.exports = new RegisterController();
