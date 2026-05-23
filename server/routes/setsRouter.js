const Router = require('express');
const router = new Router();
const setsController = require('../controllers/setsController');

router.post("/", setsController.create);
router.get("/", setsController.getAll);
router.get("/:id", setsController.getOne);
router.delete("/:id", );

module.exports = router