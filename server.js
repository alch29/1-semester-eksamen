const app = require("./app"); 
const db = require('./models');
const PORT = process.env.PORT || 3000;

// Start server - listen on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});