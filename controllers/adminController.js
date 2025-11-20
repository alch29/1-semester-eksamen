const { station, user, product, measurement } = require('../models');

// GET /admin/staff
exports.getAdminStaff = async (req, res) => {
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
};
// GET /admin/products — list all products
exports.getAdminProducts = async (req, res) => {
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
};

// GET /admin/products/partials/admin-add-products — add products partial
exports.getAdminAddProducts = async (req, res) => {
  try {
    const products = await product.findAll();
    const measurements = await measurement.findAll();

    res.render('admin/products/partials/admin-add-products', {
        title: 'Add Products',
        products: products.map(prd => prd.toJSON()),
        measurements: measurements.map(msm => msm.toJSON())
    });


  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

// POST /admin/products/partials/admin-add-products — handle add product form 
exports.postAdminAddProduct = async (req, res) => {
  try {
    const { productName, measurementId } = req.body;

    // Insert into database
    await product.create({
      name: productName,
      measurement_id: measurementId,
      is_deleted: false,
      // user_id: req.user.id  CHANGE TO THIS ONCE U HAVE A USER
      user_id: 1 // HARDCODED FOR TESTING
    });

    res.redirect('/admin/products'); // Redirect back to product list
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

// UNFINISHED EDIT PRODUCT
exports.getAdminEditProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    const prd = await product.findByPk(productId, {
      include: [{
        model: product,
        as: 'product',
        attributes: ['id', 'name']
      }]
    });

    if (!prd) {
      return res.status(404).send('Product not found');
    }

    console.log(`Fetched product ${productId}:`, prd.toJSON());
    res.render('admin/products/partials/admin-edit-products/:id', {
      title: 'Edit products info',
      product: prd.toJSON()
    });
  } catch (err) {
    console.error('Database error in getproducts:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};


// GET /admin/stations — list all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await station.findAll();
    console.log('Stations fetched:', stations.length); // log how many rows

    res.render('admin/stations/admin-stations', {
      title: 'Stations',
      stations: stations.map(st => st.toJSON())
    });
  } catch (err) {
    console.error('Database error in getStations:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};

// GET /admin/stations/info/:id — station details
exports.getStationInfo = async (req, res) => {
  try {
    const stationId = req.params.id;

    const st = await station.findByPk(stationId, {
      include: [{
        model: user,
        as: 'user',
        attributes: ['id', 'name']
      }]
    });

    if (!st) {
      return res.status(404).send('Station not found');
    }

    console.log(`Fetched station ${stationId}:`, st.toJSON());
    res.render('admin/stations/admin-station-info', {
      title: 'Station info',
      station: st.toJSON()
    });
  } catch (err) {
    console.error('Database error in getStationInfo:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};

// GET /admin/stations/manage — manage station staff
exports.getStationManage = async (req, res) => {
  try {
    const stationId = parseInt(req.query.stationId, 10);
    const currentUserId = parseInt(req.query.userId, 10) || null;

    const users = await user.findAll({
      attributes: ['id', 'name', 'email']
    });

    console.log(`Fetched ${users.length} users for station management`);

    res.render('admin/stations/admin-station-manage', {
      title: 'Manage Station Staff',
      users: users.map(u => u.toJSON()),
      currentUserId,
      stationId
    });
  } catch (err) {
    console.error('Database error in getStationManage:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};
