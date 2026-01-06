const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session');
require('dotenv').config();
const fs = require('fs');

//Til at rense billeder:
const cron = require('node-cron');
const deleteOldImages = require('./cron-job');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
// hbs.registerPartials(path.join(__dirname, 'views/partials'));

const routes = require("./routes");
app.use("/", routes);

//_______Cleanup af gamle billeder:_______

const imageDir = path.join(__dirname, 'public/uploads'); // mappe med billeder
const days = 90;
const maxAge = days * 24 * 60 * 60 * 1000;
// const maxAge = 5 * 60 * 1000;

// Kør hver dag kl. 02:00
cron.schedule('0 2 * * *', () => {
  console.log('Running daily image cleanup...');
  const now = Date.now();

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Error when reading folder:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(imageDir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) return;

        const age = now - stats.mtimeMs;

        if (age > maxAge) {
          fs.unlink(filePath, err => {
            if (!err) {
              console.log('Deleted:', file);
            }
          });
        }
      });
    });
  });
});

// cron.schedule('* * * * *', () => {
//   console.log('Running image cleanup (test mode)...');
//   deleteOldImages();
// });

//________________________________

module.exports = app;