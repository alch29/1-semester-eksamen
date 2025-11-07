const express = require('express');
const router = express.Router();

const adminRoutes = require('./adminRoutes');
// const staffRoutes = require('./staffRoutes');

router.use('/admin', adminRoutes);
// router.use('/staff', staffRoutes);

module.exports = router;