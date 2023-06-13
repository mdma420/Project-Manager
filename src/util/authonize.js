const UserModel = require("../app/models/user");
const jwt = require("jsonwebtoken");
const {ConnectionStates} = require("mongoose");

//check login
function checkLogin(req, res, next) {
  //check
  try {
    var token = req.cookies.token;
    var idUser = jwt.verify(token, "PW");
    UserModel.findOne({
      _id: idUser,
    }).then((data) => {
      if (data) {
        req.user = data;
        // console.log(req.user)
        return next();
      } else {
        res.render("login", {
          title: "Login",
          msg: "Please login.",
        });
      }
    });
  } catch (err) {
    return res.render("login", {
      title: "Login",
      msg: "Please login.",
    });
  }
}

// check manager student
function checkManagerStudent(req, res, next) {
  var role = req.user.role;
  if (role === "ManagerStudent" || role === "Manager" || role === "Admin") {
    next();
  } else {
    return res.redirect("/");
  }
}

// check manager teacher
function checkManagerTeacher(req, res, next) {
  var role = req.user.role;
  if (role === "ManagerTeacher" || role === "Manager" || role === "Admin") {
    next();
  } else {
    return res.redirect("/");
  }
}

// check manager
function checkManager(req, res, next) {
  var role = req.user.role;
  if (role === "Manager" || role === "Admin") {
    next();
  } else {
    return res.redirect("/");
  }
}

// check admin
function checkAdmin(req, res, next) {
  var role = req.user.role;
  if (role === "Admin") {
    next();
  } else {
    return res.redirect("/");
  }
}

module.exports = {
  checkLogin,
  checkManagerStudent,
  checkManagerTeacher,
  checkManager,
  checkAdmin,
};
