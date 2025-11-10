const imageModel = require('../models/image'); //HUSK AT INDSÆTTE MODELLER!
const measurementModel = require('../models/measurement');
const productModel = require('../models/');

exports.index = (req, res) => {
  res.render("home/index", {
    title: "Welcome",
    message: "Hello from MVC!",
  });
};

//Staff controllers:
// exports.showStaffStations = (async (req, res) => {
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