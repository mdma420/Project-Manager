const loginRouter = require("./login");
const homeRouter = require("./home");
const registerRouter = require("./register");
const tuitionRouter = require("./tuition");
const salaryRouter = require("./salary");
const announcementRouter = require("./announcement");
const {
  checkLogin,
  checkManagerStudent,
  checkManagerTeacher,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

function route(app) {
  app.use("/tuition", checkLogin, checkManagerStudent, tuitionRouter);

  app.use("/teacher", checkLogin, checkManagerTeacher, salaryRouter);

  app.use("/announcement", checkLogin, checkManager, announcementRouter);

  app.use("/register", checkLogin, checkAdmin, registerRouter);

  app.use("/login", loginRouter);

  app.use("/", checkLogin, homeRouter);
}

module.exports = route;
