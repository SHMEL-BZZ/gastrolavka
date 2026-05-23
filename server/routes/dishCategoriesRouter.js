const Router = require('express');
const router = new Router();
const dishIngredientsController = require('../controllers/dishIngredientsController');

router.post("/",dishIngredientsController.create );
router.get("/", dishIngredientsController.getAll);
router.get("/:id", dishIngredientsController.getOne);
router.delete("/:id", );

module.exports = router