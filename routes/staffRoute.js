const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/StaffController');

// Staff stations route
router.get('/stations', StaffController.showStaffStations); // ✅ Changed to showStaffStations

// You can add other staff routes here, e.g. /task, /history, etc.

module.exports = router;