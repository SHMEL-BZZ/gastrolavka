const Router = require('express');
const router = new Router();
const unitsController = require('../controllers/unitsController');

router.post("/", unitsController.create);
router.get("/", unitsController.getAll);
router.get("/:id", unitsController.getOne);
router.delete("/:id", );

module.exports = router