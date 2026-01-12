const app = require("./app"); //Henter express app fra app.js
const db = require('./models'); //importerer models fra database
const PORT = process.env.PORT || 3000; //Sætter port
const HOST = process.env.DB_HOST || '0.0.0.0'; //Sætter host, lytter på alle netværk

// Start server - listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});