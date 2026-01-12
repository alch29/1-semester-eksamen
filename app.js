const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path"); //modul fra node til at håndtere fil- og mappestier.
const session = require('express-session'); //Pakke til at håndtere bruger-sessioner (holder styr på hvem der er logget ind).
require('dotenv').config(); //Henter variabler fra env-fil.
const fs = require('fs'); //Nodes filsystem-modul til at læse/skrive filer.

//Til at rense billeder:
const cron = require('node-cron');
// const deleteOldImages = require('./cron-job');

const app = express(); //Opsætning af express

app.use(express.urlencoded({ extended: true })); //Gør det muligt at læse data fra HTML-formularer (POST-requests).
app.use(express.json()); //Gør det muligt at læse JSON-data i requests
app.use(express.static(path.join(__dirname, "public")));//Gør alle filer i mappen "public" tilgængelige direkte via browseren (CSS, billeder, JavaScript-filer osv.). __dirname er den nuværende mappe.

// SESSION MIDDLEWARE - SKAL VÆRE FØR ROUTES
//Starter session-middleware. secret bruges til at kryptere session-data. Den henter først fra miljøvariablen SESSION_SECRET, ellers bruger den fallback-værdien.
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key-change-in-production',
  resave: false, //Gemmer ikke sessionen igen, hvis der ikke er ændret noget
  saveUninitialized: false, //Gemmer ikke tomme sessions (før brugeren logger ind)
  cookie: {
    secure: process.env.NODE_ENV === 'production', //I produktion kræves HTTPS for cookies (sikkerhed). Under udvikling er det slået fra.
    httpOnly: true, //Forhindrer JavaScript i browseren fra at læse cookien
    maxAge: 1000 * 60 * 60 //Cookie session udløber efter 1 time
  }
}));

// brugerdata tilgængelig i alle views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// debug middleware - tjekker om brugeren kommer igennem forskellige views
//Tæller hvor mange requests der er i hver session og logger det til konsollen. Nyttigt til debugging, så du kan se om sessions virker korrekt.
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = 0; //Første gang brugeren kommer eksisterer views ikke, så tæller starter på nul.
  }
  req.session.views++; //Kører hver gang brugeren åbner en side, lægger 1 til.
  console.log(`Session ID: ${req.session.id}, Views: ${req.session.views}`);
  next();
});

// View engine setup
app.engine(".hbs", exphbs.engine({
  extname: ".hbs", //Registrerer Handlebars som template-motor og fortæller at filerne skal slutte med .hbs.
  helpers: {
    eq: (a, b) => a === b //Opretter en custom helper-funktion eq som tjekker om to værdier er ens.
  }
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views")); //Fortæller Express at bruge .hbs som standard og at templates ligger i mappen "views".
// hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Importerer routes og aktiverer dem. Alt hvad der starter med "/" håndteres af routes.
const routes = require("./routes");
app.use("/", routes);

//_______Cleanup af gamle billeder:_______

const imageDir = path.join(__dirname, 'public/uploads'); // mappe med billeder
const days = 30;
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

//________________________________

module.exports = app;