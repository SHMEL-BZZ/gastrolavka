const Router = require('express');
const router = new Router();
const customerAddressesController = require('../controllers/customerAddressesController');

router.post("/", customerAddressesController.create);
router.get("/", customerAddressesController.getAll);
router.get("/:id", customerAddressesController.getOne);
router.delete("/:id", );

module.exports = router