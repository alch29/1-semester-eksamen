// controllers/staffController.js
const { station } = require('../models');
const { product } = require('../models');
const { measurement } = require('../models');

exports.getStaffStations = async (req, res) => {
  try {
    const stations = await station.findAll({ raw: true });

    res.render('staff/staff-stations', {
      title: 'Your stations',
      stations: stations,
    });
  } catch (err) {
    console.error('Database error in getStaffStations:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};

exports.getStaffTask = async (req, res) => {
  try {
    const products = await product.findAll({
      raw: true,
      //inkludere measurements tabellen, så den kan tage navnet fra products tabel og tage symbolet fra measurements tabel.
      include: [
        {
          model: measurement,
          as: 'measurement',
          attributes: ['measurement_symbol']
        }
      ]
    });

    res.render('staff/staff-task', {
      title: 'Task',
      products: products
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

exports.getStaffHistory = (req, res) => {
  res.render('staff/staff-history', {
      title: 'History',
  });
};