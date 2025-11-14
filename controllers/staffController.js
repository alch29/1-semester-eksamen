// controllers/staffController.js
const { station } = require('../models');

exports.getStaffStations = async (req, res) => {
  try {
    const stations = await station.findAll();
    const allStations = stations.map(st => st.toJSON());

    res.render('staff/staff-stations', {
      title: 'Your stations',
      stations: allStations,
      totalStations: allStations.length
    });
  } catch (err) {
    console.error('Database error in getStaffStations:', err.message);
    console.error(err);
    res.status(500).send('Database error');
  }
};
