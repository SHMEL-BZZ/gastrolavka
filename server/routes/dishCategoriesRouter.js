const Router = require('express');
const router = new Router();
const dishCategoryController = require('../controllers/dishCategoriesController');

router.post("/",dishCategoryController.create );
router.get("/", dishCategoryController.getAll);
router.get("/:id", dishCategoryController.getOne);
router.delete("/:id", );

module.exports = router