const Router = require('express');
const router = new Router();
const statusesController = require('../controllers/statusesController');

router.post("/", statusesController.create);
router.get("/", statusesController.getAll);
router.get("/:id", statusesController.getOne);
router.delete("/:id", );

module.exports = router