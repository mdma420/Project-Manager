const loginRouter = require("./login");
const homeRouter = require("./home");
const registerRouter = require("./register");
const tuitionRouter = require("./tuition");
const salaryRouter = require("./salary");
const settingRouter = require("./setting");
const {checkLogin} = require("../util/authonize");

function route(app) {
  app.use("/login", loginRouter);

  app.use("/setting", settingRouter);

  app.use("/register", registerRouter);

  app.use("/", homeRouter);

  app.use("/tuition", tuitionRouter);

  app.use("/salary", salaryRouter);

  app.use("/setting", settingRouter);
}

module.exports = route;
