const app = require("./app"); 
const db = require('./models');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});



