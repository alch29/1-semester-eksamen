const { station, user, product, measurement, role } = require('../models');
const { raw } = require('mysql2');
const { Op } = require('sequelize');

// GET /admin/staff
exports.getAdminStaff = async (req, res) => {
  try {
    const staff = await user.findAll({ raw: true });
    res.render('admin/staff/admin-staff', {
      title: 'staff',
      staff
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};
exports.getAdminStaffAdd = async (req, res) => {
  const { id } = req.params;

  try {
    let staff = null;
    let stationsList = [];

    if (id) {
      const foundUser = await user.findByPk(id, { raw: true });

      if (foundUser) {
        const [firstName, ...rest] = foundUser.name.split(" ");
        const lastName = rest.join(" ");

        staff = {
          ...foundUser,
          firstName,
          lastName
        };

        stationsList = await station.findAll({
          where: { user_id: id },
          order: [['name', 'ASC']],
          raw: true
        });
      }
    }

    res.render("admin/staff/admin-add-staff", {
      title: "Manage Staff",
      user: staff,
      stations: stationsList
    });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error");
  }
};

exports.postAdminStaffAdd = async (req, res) => {
  const { id, firstName, lastName, email, action } = req.body;

  try {
    const fullName = `${firstName} ${lastName}`;
    const password = "password123";
    const staffRole = await role.findOne({ where: { is_admin: false } });

    let savedUser;
    let successMessage;

    if (id) {
      const existingUser = await user.findByPk(id);
      if (!existingUser) return res.status(404).send("User not found");

      await existingUser.update({ name: fullName, email: email });
      savedUser = existingUser;
      successMessage = "User updated successfully!";

    } else {
      savedUser = await user.create({
        name: fullName,
        email: email,
        password: password,
        role_id: staffRole.id
      });
      successMessage = "User created successfully!";
    }

    if (action === "addToStations") {
      return res.redirect(`/admin/staff/${savedUser.id}/stations`);
    }

    const [first, ...rest] = savedUser.name.split(" ");
    const last = rest.join(" ");

    return res.redirect(`/admin/staff/${savedUser.id}/edit`);

  } catch (err) {
    console.error("Database error", err);
    res.status(500).send("Database error");
  }
};

exports.postAdminStaffDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await user.findByPk(id);

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    await existingUser.destroy();

    return res.redirect('/admin/staff');

  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send("Database error");
  }
};

exports.getAdminStaffStations = async (req, res) => {
  const { id } = req.params;

  try {
    const allStations = await station.findAll({
      where: {
        [Op.or]: [
          { user_id: null },
          { user_id: id }
        ]
      },
      raw: true,
      order: [['name', 'ASC']]
    });
    const userStations = await station.findAll({ where: { user_id: id }, raw: true });

    const attachedStationIds = userStations.map(s => Number(s.id));

    const stationsWithFlag = allStations.map(s => ({
      ...s,
      isAttached: attachedStationIds.includes(Number(s.id)) ? true : false
    }));

    res.render('admin/staff/admin-add-staff-stations', {
      title: 'Manage User Stations',
      userId: id,
      stations: stationsWithFlag
    });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};


exports.postAdminStaffStations = async (req, res) => {
  const { id } = req.params;
  let { stations: selectedStations } = req.body;

  try {
    selectedStations = selectedStations
      ? Array.isArray(selectedStations)
        ? selectedStations.map(Number)
        : [Number(selectedStations)]
      : [];

    const userStations = await station.findAll({ where: { user_id: id }, raw: true });
    const userStationIds = userStations.map(s => s.id);
    const toDetach = userStationIds.filter(sid => !selectedStations.includes(sid));
    const toAttach = selectedStations.filter(sid => !userStationIds.includes(sid));

    if (toDetach.length > 0) {
      await station.update({ user_id: null }, { where: { id: toDetach } });
    }

    if (toAttach.length > 0) {
      await station.update({ user_id: id }, { where: { id: toAttach } });
    }

    res.redirect(`/admin/staff/${id}/edit`);
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

exports.updateCleaningOfForecourt = async (req, res) => {
  try {
    const { stationId } = req.params;

    const current = await station.findByPk(stationId);
    const newValue = current.cleaning_of_forecourt ? 0 : 1;

    await station.update(
      { cleaning_of_forecourt: newValue },
      { where: { id: stationId } }
    );

    res.redirect(`/admin/stations/info/${stationId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

// GET /admin/stations/manage — manage station staff
exports.getStationManage = async (req, res) => {
  try {
    const stationId = parseInt(req.query.stationId, 10);
    const currentUserId = parseInt(req.query.userId, 10) || null;

    const users = await user.findAll({
      attributes: ['id', 'name', 'email'],
      where: { role_id: 2 },
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


