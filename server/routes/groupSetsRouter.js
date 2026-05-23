const Router = require('express');
const router = new Router();
const groupSetsController = require('../controllers/groupSetsController');

router.post("/", groupSetsController.create);
router.get("/", groupSetsController.getAll);
router.get("/:id", groupSetsController.getOne);
router.delete("/:id", );

module.exports = router