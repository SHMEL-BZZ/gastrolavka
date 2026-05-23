const Router = require('express');
const router = new Router();
const promotionDishesController = require('../controllers/promotionDishesController');

router.post("/", promotionDishesController.create);
router.get("/",promotionDishesController.getAll );
router.get("/:id", promotionDishesController.getOne);
router.delete("/:id", );

module.exports = router