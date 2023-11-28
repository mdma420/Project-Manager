const User = require("../models/user");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const querystring = require("querystring");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

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
                bcrypt.hash(password, 10, function (err, hash) {
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
              res.json("Error check email");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.json("Error check account");
      });
  }

  // [GET] Update User
  UpdateUser(req, res, next) {
    User.findById(req.params.id).then((user) => {
      res.render("updateUser", {
        user: mongooseToObject(user),
        title: "Update User",
      });
    });
  }

  // [PUT] update User
  async updateUser(req, res, next) {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    User.updateOne(
      {_id: req.params.id},
      {
        username: req.body.username,
        password: hash,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
      }
    )
      .then(() => res.redirect("/register"))
      .catch(() => res.redirect("/register"));
  }

  // [DELETE] delete user
  deleteUser(req, res, next) {
    User.deleteOne({_id: req.params.id}, req.body)
      .then(() => res.redirect("/register"))
      .catch((error) => {});
  }
}

module.exports = new RegisterController();
