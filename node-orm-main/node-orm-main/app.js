const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require("./routes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", routes);

module.exports = app;
