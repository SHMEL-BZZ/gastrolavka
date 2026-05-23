const Router = require('express');
const router = new Router();
const ingredientsController = require('../controllers/ingredientsController');

router.post("/", ingredientsController.create);
router.get("/", ingredientsController.getAll);
router.get("/:id", ingredientsController.getOne);
router.delete("/:id", );

module.exports = router