const Router = require('express');
const router = new Router();
const avalibleDishesController = require('../controllers/avalibleDishesController');

router.post("/", avalibleDishesController.create);
router.get("/", avalibleDishesController.getAll);
router.get("/:id", avalibleDishesController.getOne);
router.delete("/:id", );

module.exports = router