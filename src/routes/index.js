const loginRouter = require("./login");
const homeRouter = require("./home");
const registerRouter = require("./register");
const tuitionRouter = require("./tuition");
const settingRouter = require("./setting");

function route(app) {
  app.use("/login", loginRouter);

  app.use("/setting", settingRouter);

  app.use("/register", registerRouter);

  app.use("/", homeRouter);

  app.use("/tuition", tuitionRouter);
}

module.exports = route;
