const { raw } = require('mysql2');
const { station, user } = require('../models');

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
    console.log(st);
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


