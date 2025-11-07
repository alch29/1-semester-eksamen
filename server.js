const app = require("./app");
const { engine } = require('express-handlebars');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const db = require('./models');
const { image, measurement, product, role, station, user } = db;


app.engine('hbs', engine({ 
  extname: 'hbs',
  layoutsDir: './views/layouts',
}));

app.set('view engine', 'hbs');
app.set('views', './views/');

app.get('/', (req, res) => {
  res.render('index', {
      title: 'Login',
  });
});

//Staff routes:

// app.get('/staff/stations', async (req, res) => {
//   try {
//     const stations = await station.findAll();
//     const allStations = stations.map(st => st.toJSON())
//     res.render('staff/staff-stations', {
//       title: 'Your stations',
//       stations: allStations,
//       totalStations: allStations.length
//     });
//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).send('Database error');
//   }
// });

app.get('/staff/task', async (req, res) => {
  try {
    const products = await product.findAll({
      //inkludere measurements tabellen, så den kan tage navnet fra products tabel og tage symbolet fra measurements tabel.
      include: [
        {
          model: measurement,
          as: 'measurement',
          attributes: ['measurement_symbol']
        }
      ]
    });

    const allProducts = products.map(pr => pr.toJSON());

    res.render('staff/staff-task', {
      title: 'Task',
      products: allProducts
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

app.get('/staff/history', (req, res) => {
  res.render('staff/staff-history', {
      title: 'History',
  });
});

//Admin routes:

app.get('/admin', (req, res) => {
  res.render('admin/admin', {
      title: 'Menu',
  });
});

//Her starter admin products:

app.get('/admin/products', async (req, res) => {
  try {
    const products = await product.findAll();
    res.render('admin/products/admin-products', {
        title: 'Products',
      products: products.map(prd => prd.toJSON())
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

//Her starter admin stations:

app.get('/admin/stations', (req, res) => {
  res.render('admin/stations/admin-stations', {
      title: 'Stations',
  });
});

app.get('/admin/stations/info', async (req, res) => {
  try {
    const stations = await station.findAll();
    res.render('admin/stations/admin-station-info', {
      title: 'Station info',
      stations: stations.map(st => st.toJSON())
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});


app.get('/admin/stations/manage', (req, res) => {
  res.render('admin/stations/admin-station-manage', {
      title: 'Manage',
  });
});

//Her starter admin staff:

app.get('/admin/staff', async (req, res) => {
  try {
    const staff = await user.findAll();
    res.render('admin/staff/admin-staff', {
        title: 'staff',
      staff: staff.map(stf => stf.toJSON())
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
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

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});