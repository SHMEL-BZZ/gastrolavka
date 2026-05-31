const { DishCategory } = require('../models/models');

class DishCategoriesController {
    async create(req, res) {

    }
    async getAll(req, res) {
        const categories = await DishCategory.findAll();
        return res.json(categories.map(c => ({
            id: c.dish_categoty_id ,
            name: c.name
        })));
    }
    async getOne(req, res) {

    }

}

module.exports = new DishCategoriesController();