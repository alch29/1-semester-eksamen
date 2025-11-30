const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

const adminRoutes = require('./adminRoutes');
const staffRoutes = require('./staffRoutes');

const { isNotAuthenticated } = require('../middleware/auth'); 

router.use('/admin', adminRoutes);
router.use('/staff', staffRoutes);

router.get('/', isNotAuthenticated, HomeController.index); 
router.get('/register', isNotAuthenticated, HomeController.getRegister); 

router.post('/', HomeController.postLogin);
router.post('/register', HomeController.postRegister);
router.post('/logout', HomeController.postLogout); 

module.exports = router;