const Router = require('express');
const router = new Router();
const requirementTypesController = require('../controllers/requirementTypesController');

router.post("/", requirementTypesController.create);
router.get("/", requirementTypesController.getAll);
router.get("/:id", requirementTypesController.getOne);
router.delete("/:id", );

module.exports = router