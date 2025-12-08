const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session'); 
require('dotenv').config(); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.js());
app.use(express.static(path.join(__dirname, "public")));

// SESSION MIDDLEWARE - SKAL VÆRE FØR ROUTES
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // kun true i production
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 time
  }
}));

// brugerdata tilgængelig i alle views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// debug middleware - tjekker om brugeren kommer igennem forskellige views
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  console.log(`Session ID: ${req.session.id}, Views: ${req.session.views}`);
  next();
});

// View engine setup
app.engine(".hbs", exphbs.engine({ 
  extname: ".hbs",
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const routes = require("./routes");
app.use("/", routes);

module.exports = app;