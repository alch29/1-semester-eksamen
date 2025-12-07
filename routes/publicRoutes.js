const staffController = require('./controllers/staffController');

//route til at se task details uden login:
router.get('/task/details/:linkKey', staffController.viewTaskByLink);