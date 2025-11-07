const express = require("express");
const HomeController = require("../controllers/HomeController");
const AdminController = require("../controllers/AdminController");
const StaffController = require("../controllers/StaffController");
const router = express.Router();
router.get("/", HomeController.index);
router.get("/staff/stations", StaffController.index);


module.exports = router;

