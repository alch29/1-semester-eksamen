const express = require("express");
const staffController = require("../controllers/staffController");
const router = express.Router();


router.get('/staff/stations', staffController.showStaffStations);

module.exports = router;