const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

const adminRoutes = require('./adminRoutes');
const staffRoutes = require('./staffRoutes');
const publicRoutes = require('./publicRoutes');

const { isNotAuthenticated } = require('../middleware/auth'); 

router.use('/admin', adminRoutes);
router.use('/staff', staffRoutes);
router.use('/public', publicRoutes);

router.get('/api/questions', HomeController.getQuestions);

router.get('/', isNotAuthenticated, HomeController.index); 
router.get('/register', isNotAuthenticated, HomeController.getRegister); 

router.get('/forgot-password', isNotAuthenticated, HomeController.getForgotPassword);
router.post('/forgot-password/verify-user', HomeController.postVerifyUser);
router.post('/forgot-password/reset', HomeController.postResetPassword);

router.post('/', HomeController.postLogin);
router.post('/register', HomeController.postRegister);
router.post('/logout', HomeController.postLogout); 

module.exports = router;