const app = require("./app");
const { engine } = require('express-handlebars');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({ 
  extname: 'hbs',
  layoutsDir: './views/layouts',
}));

app.set('view engine', 'hbs');
app.set('views', './views/');

app.get('/', (req, res) => {
  res.render('login', {
      title: 'Login',
  });
});

//Staff routes:

app.get('/staff/stations', (req, res) => {
  res.render('staff-stations', {
      title: 'Your stations',
  });
});

app.get('/staff/task', (req, res) => {
  res.render('staff-task', {
      title: 'Task',
  });
});

app.get('/staff/history', (req, res) => {
  res.render('staff-history', {
      title: 'History',
  });
});

//Admin routes:

app.get('/admin', (req, res) => {
  res.render('admin-menu', {
      title: 'Menu',
  });
});

//Her starter admin products:

app.get('/admin/products', (req, res) => {
  res.render('admin-products', {
      title: 'Products',
  });
});

//Her starter admin stations:

app.get('/admin/stations', (req, res) => {
  res.render('admin-stations', {
      title: 'Stations',
  });
});

app.get('/admin/stations/info', (req, res) => {
  res.render('admin-station-info', {
      title: 'Station info',
  });
});

app.get('/admin/stations/manage', (req, res) => {
  res.render('admin-station-manage', {
      title: 'Manage',
  });
});

//Her starter admin staff:

app.get('/admin/staff', (req, res) => {
  res.render('admin-staff', {
      title: 'Staff',
  });
});

app.get('/admin/add-staff', (req, res) => {
  res.render('admin-add-staff', {
      title: 'Add new staff',
  });
});

app.get('/admin/add-staff/stations', (req, res) => {
  res.render('admin-add-staff-stations', {
      title: 'Add new staff to stations',
  });
});

app.get('/admin/staff-info', (req, res) => {
  res.render('admin-staff-info', {
      title: 'Staff info',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});