const app = require("./app"); 
const db = require('./models');
const PORT = process.env.PORT || 3000;
const HOST = process.env.DB_HOST || '0.0.0.0';

// Start server - listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});