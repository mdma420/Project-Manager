const loginRouter = require("./login");
const homeRouter = require("./home");
const registerRouter = require("./register");
const tuitionRouter = require("./tuition");
const salaryRouter = require("./salary");

function route(app) {
  app.use("/login", loginRouter);

  app.use("/register", registerRouter);

  app.use("/", homeRouter);

  app.use("/tuition", tuitionRouter);

  app.use("/salary", salaryRouter);
}

module.exports = route;
