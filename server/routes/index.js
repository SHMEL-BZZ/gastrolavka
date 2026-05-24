const Router = require('express');
const router = new Router();
const avalibleDishes = require('./avalibleDishesRouter');
const basket = require("./basketRouter");
const city = require("./cityRouter");
const customerAddresses = require("./customerAddressesRouter");
const dishCategories = require("./dishCategoriesRouter");
const dishes = require("./dishesRouter");
const dishIngredients = require("./dishIngredientsRouter");
const groupSets = require("./groupSetsRouter");
const ingredients = require("./ingredientsRouter");
const order = require("./orderRouter");
const orderDetails = require("./orderDetailsRouter");
const promotionDishes = require("./promotionDishesRouter");
const promotions = require("./promotionsRouter");
const requirementTypes = require("./requirementTypesRouter");
const roles = require("./rolesRouter");
const sets = require("./setsRouter");
const specialReqDishGroups = require("./specialReqDishGroupsRouter");
const units = require("./unitsRouter");
const users = require("./usersRouter");


router.use('/avalibleDishes', avalibleDishes)
router.use('/basket', basket)
router.use('/city', city);
router.use('/customerAddresses', customerAddresses)
router.use('/dishCategories',dishCategories)
router.use('/dishes',dishes)
router.use('/dishIngridients',dishIngredients)
router.use('/groupSets', groupSets)
router.use('/ingridients',ingredients)
router.use('/order', order)
router.use('/orderDetails', orderDetails)
router.use('/promotionDishes', promotionDishes)
router.use('/promotions', promotions)
router.use('/requirementTypes', requirementTypes)
router.use('/roles', roles)
router.use('/sets', sets)
router.use('/specialReqDishGroups', specialReqDishGroups)
router.use('/units', units)
router.use('/users', users)

module.exports = router