// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Staff stations route
router.get('/stations', staffController.getStaffStations);

// You can add other staff routes here, e.g. /task, /history, etc.

module.exports = router;
