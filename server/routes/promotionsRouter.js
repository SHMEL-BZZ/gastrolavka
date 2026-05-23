const Router = require('express');
const router = new Router();
const promotionsController = require('../controllers/promotionsController');

router.post("/", promotionsController.create);
router.get("/", promotionsController.getAll);
router.get("/:id", promotionsController.getOne);
router.delete("/:id", );

module.exports = router