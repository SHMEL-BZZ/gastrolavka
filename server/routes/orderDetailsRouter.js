const Router = require('express');
const router = new Router();
const orderDetailsController = require('../controllers/orderDetailsController');

router.post("/", orderDetailsController.create);


module.exports = router