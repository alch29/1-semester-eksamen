// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const upload = require('../multer');

router.get('/stations', staffController.getStaffStations);

router.post('/stations', upload.array('image', 60), staffController.finishStaffTask);

router.get('/task/:id', staffController.getStaffTask);

router.get('/history', staffController.getStaffHistory);

router.get('/history/task/:id', staffController.getStaffHistoryTask);

module.exports = router;
