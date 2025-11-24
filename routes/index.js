const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

const adminRoutes = require('./adminRoutes');
const staffRoutes = require('./staffRoutes');

router.use('/admin', adminRoutes);
router.use('/staff', staffRoutes);
router.get('/', HomeController.index);
router.get('/register', HomeController.getRegister);
router.post('/', HomeController.postLogin);
router.post('/register', HomeController.postRegister);

module.exports = router;