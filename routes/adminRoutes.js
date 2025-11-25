// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/staff', adminController.getAdminStaff);
router.get('/staff/admin-add-staff', adminController.getAdminStaffAdd);
router.post('/staff/save-staff', adminController.postAdminStaffAdd);
router.get('/staff/:id/edit', adminController.getAdminStaffAdd);
router.post('/staff/:id/delete', adminController.postAdminStaffDelete);
router.get('/staff/admin-add-staff-stations/:id', adminController.getAdminStaffStations);
router.post('/staff/admin-add-staff-stations/:id', adminController.postAdminStaffStations);



router.get('/products', adminController.getAdminProducts);
router.get('/products/partials/admin-add-products', adminController.getAdminAddProducts);
router.post('/products', adminController.postAdminAddProduct);
router.get('/products/partials/admin-edit-products/:id', adminController.getAdminEditProducts);
router.post('/products/:id', adminController.postAdminUpdateProduct);

router.get('/admin', adminController.getAdmin);
router.get('/stations', adminController.getStations);
router.get('/stations/info/:id', adminController.getStationInfo);
router.get('/stations/manage', adminController.getStationManage);
router.post('/stations/:stationId/update-user', adminController.updateStationUser);


module.exports = router;
