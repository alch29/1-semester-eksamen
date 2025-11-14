// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stations', adminController.getStations);
router.get('/stations/info/:id', adminController.getStationInfo);
router.get('/stations/manage', adminController.getStationManage);

module.exports = router;
