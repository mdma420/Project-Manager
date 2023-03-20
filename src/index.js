const path = require("path");
const handlebars = require("express-handlebars");
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");
const hbs = handlebars.create({
  extname: ".hbs",
});

// method
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//connect DB
db.connect();

//route init
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
