const express = require("express");
const HomeController = require("../controllers/HomeController");
const staffRoutes = require("./staffRoute"); // Import staff routes
const router = express.Router();

router.get("/", HomeController.index);
router.use('/staff', staffRoutes); // Mount staff routes at /staff

module.exports = router;