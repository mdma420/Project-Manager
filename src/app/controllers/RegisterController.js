const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const querystring = require("querystring");

class RegisterController {
  // [GET] Register
  register(req, res, next) {}

  // [POST] register user
  apiregister(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;

    UserModel.findOne({
      username: username,
    })
      .then((data) => {
        console.log(data);
        if (data) {
          const message = "Account already exists!";
          const url = "/user?" + querystring.stringify({message: message});
          res.redirect(url);
        } else {
          UserModel.findOne({
            email: email,
          })
            .then((data) => {
              if (data) {
                const message = "Account already exists!";
                const url =
                  "/user?" + querystring.stringify({message: message});
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
                  });
                });
                return res.redirect("/user");
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
