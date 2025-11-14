const imageModel = require('../models/image'); //HUSK AT INDSÆTTE MODELLER!
const measurementModel = require('../models/measurement');
const productModel = require('../models/');

exports.index = (req, res) => {
  res.render("home/index", {
    title: "Welcome",
    message: "Hello from MVC!",
  });
};