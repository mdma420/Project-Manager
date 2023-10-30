const path = require("path");
const handlebars = require("express-handlebars");
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// method
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

//use cookie parser
app.use(cookieParser());

//connect DB
db.connect();

// time express-session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Thời gian sống 1 ngày (86400000 miliseconds)
    },
  })
);

const hbs = handlebars.create({
  helpers: require("./util/help"),
  extname: ".hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//route init
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
