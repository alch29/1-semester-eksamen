const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

//route til at se task details uden login:
router.get('/task/details/:linkKey', publicController.viewTaskByLink);

module.exports = router;