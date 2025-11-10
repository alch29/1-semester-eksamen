// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Staff stations route
router.get('/stations', staffController.getStaffStations);

// You can add other staff routes here, e.g. /task, /history, etc.

router.get('/task', staffController.getStaffTask);

router.get('/history', staffController.getStaffHistory);

router.get('/staff-history', staffController.getStaffHistory);

module.exports = router;
