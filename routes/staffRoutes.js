// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const upload = require('../multer');
const { isAuthenticated } = require('../middleware/auth'); 

// alle staff routes kræver login
router.use(isAuthenticated);

// Staff stations route
router.get('/stations', staffController.getStaffStations);

router.post('/stations', upload.array('image', 60), staffController.finishStaffTask);

router.get('/task/:id', staffController.getStaffTask);

router.get('/history', staffController.getStaffHistory);

router.get('/staff-history', staffController.getStaffHistory);

module.exports = router;
