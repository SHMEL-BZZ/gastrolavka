const Router = require('express');
const router = new Router();
const rolesController = require('../controllers/rolesController');

router.post("/", rolesController.create);
router.get("/", rolesController.getAll);
router.get("/:id", rolesController.getOne);
router.delete("/:id", );

module.exports = router