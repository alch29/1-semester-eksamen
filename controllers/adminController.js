const { station, user, product, measurement, role } = require('../models');
const { raw } = require('mysql2');

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

exports.getAdminStaffAdd = async (req, res) => {
  try {
    res.render('admin/staff/admin-add-staff', {
      title: 'add new staff',
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

exports.postAdminStaffAdd = async (req, res) => {
  const { firstName, lastName, email, action } = req.body;

  console.log("POST /admin/staff/save-staff called");
  console.log("Form data:", { firstName, lastName, email, action });

  try{

    const fullName = `${firstName} ${lastName}`;
    const password = "password123";
    const roleNum = await role.findOne({ where: { is_admin: false } });
    console.log("Role found:", role);

    await user.create({
      name: fullName,
      email: email,
      password: password,
      role_id: roleNum.id
    });

    if (action === "addToStations") {
      return res.redirect("/admin/staff/admin-add-staff-stations");
    }


    res.render("editUser", { successMessage: "User created successfully!" });

  } catch (err) {
    console.error('Database error', err);
    res.status(500).send('Database error');
  }
}

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

// GET /admin/products/partials/admin-edit-products — ediit products partial
exports.getAdminEditProducts = async (req, res) => {
  try {
    const measurements = await measurement.findAll();
    const products = await product.findAll();
    const productId = req.params.id;
    const prd = await product.findByPk(productId);

    // console.log(`Fetched station ${productId}:`, prd.toJSON());
    res.render('admin/products/partials/admin-edit-products', {
      title: 'Station info',
      products: products.map(prd => prd.toJSON()),
      product: prd.toJSON(),
      measurements: measurements.map(msm => msm.toJSON())
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};
// POST /admin/products/:id — handle edit product form
exports.postAdminUpdateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, measurementId } = req.body;
    await product.update({
        name: name,
        measurement_id: measurementId },
      {
        where: { id: productId }
      });

    res.redirect('/admin/products');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};


exports.getAdmin = (req, res) => {
  res.render('admin/admin', {
    title: 'Menu',
  });
}

// GET /admin/stations — list all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await station.findAll( {raw: true} );

    res.render('admin/stations/admin-stations', {
      title: 'Stations',
      stations
      // stations: stations.map(st => st.toJSON())
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
      }],
        raw: true,
        nest: true
    });
    // console.log(st);
    if (!st) {
      return res.status(404).send('Station not found');
    }

    res.render('admin/stations/admin-station-info', {
      title: 'Station info',
      station: st
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
      attributes: ['id', 'name', 'email'],
      raw: true
    });

    res.render('admin/stations/admin-station-manage', {
      title: 'Manage Station Staff',
      users: users,
      currentUserId,
      stationId
    });
  } catch (err) {
    console.error('Database error in getStationManage:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};

// POST /admin/stations/:stationId/update-user — update station's user
exports.updateStationUser = async (req, res) => {
  try {
    const { stationId } = req.params;
    const { userId } = req.body;

    await station.update(
      { user_id: userId },
      { where: { id: stationId } }
    );

    res.redirect(`/admin/stations/info/${stationId}`);
  } catch (err) {
    console.error('Database error in updateStationUser:', err.message);
    res.status(500).send('Database error');
  }
};


