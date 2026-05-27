const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, basketController.addToBasket);

router.get('/', authMiddleware, basketController.getAll);

router.post('/order', authMiddleware, basketController.placeOrder);

module.exports = router;