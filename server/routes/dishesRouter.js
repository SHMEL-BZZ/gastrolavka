const Router = require('express');
const router = new Router();
const dishesController = require('../controllers/dishesController');

router.post("/", dishesController.create);
router.get('/', dishesController.getAll);
router.get('/:id', dishesController.getOne);
router.put("/:id", dishesController.updatePicture);

module.exports = router

