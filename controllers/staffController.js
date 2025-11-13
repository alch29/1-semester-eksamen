// controllers/staffController.js
const { station } = require('../models');
const { product } = require('../models');
const { measurement } = require('../models');
const { image } = require('../models');

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
    const stationId = parseInt(req.params.id);
    const currentStation = await station.findByPk(stationId, { raw: true });

    if (!currentStation) {
      return res.status(404).render('error', {
        message: `Station med id ${stationId} blev ikke fundet`
      });
    }

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
      title: currentStation.name,
      station: currentStation,
      products: products
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
};

exports.finishStaffTask = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No images uploaded');
    }

    const user_id = 1;

    // Save all uploaded images to database
    const savedImages = await Promise.all(
      req.files.map(file => 
        image.create({
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          data: file.buffer,
          user_id: user_id
        })
      )
    );

    console.log(`Saved ${savedImages.length} images to database`);

    // Redirect to staff stations page
    res.redirect('/staff/stations');

  } catch (err) {
    console.error('Error saving images:', err);
    res.status(500).send('Error saving images');
  }
};

exports.getStaffHistory = (req, res) => {
  res.render('staff/staff-history', {
      title: 'History',
  });
};