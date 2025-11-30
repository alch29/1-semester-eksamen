const app = require("./app"); 
const db = require('./models');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


app.get('/admin/add-staff', (req, res) => {
  res.render('admin/staff/admin-add-staff', {
      title: 'Add new staff',
  });
});

app.get('/admin/add-staff/stations', (req, res) => {
  res.render('admin/staff/admin-add-staff-stations', {
      title: 'Add new staff to stations',
  });
});

app.get('/admin/staff-info', (req, res) => {
  res.render('admin/staff/admin-staff-info', {
      title: 'Staff info',
  });
});

