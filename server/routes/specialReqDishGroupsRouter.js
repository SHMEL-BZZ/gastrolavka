const Router = require('express');
const router = new Router();
const specialReqDishGroupsController = require('../controllers/specialReqDishGroupsController');

router.post("/", specialReqDishGroupsController.create);
router.get("/", specialReqDishGroupsController.getAll);
router.get("/:id", specialReqDishGroupsController.getOne);
router.delete("/:id", );

module.exports = router