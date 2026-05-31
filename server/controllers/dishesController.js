const fs = require('fs');
const path = require("path");
const uuid = { v4: require('uuid').v4 };
const ApiError = require("../error/ApiError");
const {Dish, DishCategory, UnitOfMeasure} = require("../models/models");
const {where} = require("sequelize");
const models = require("../models/models");

class DishesController {
    async create(req, res, next) {
        try{
            const {name, description, price, category_id, weight, storage_time, units_of_measure, is_availible, calories, proteins, carbons, fats} = req.body
            const {picture} = req.files
            let fileName = uuid.v4() + ".jpg"
            picture.mv(path.resolve(__dirname, '..', 'static', fileName));
            const dishes = await Dish.create({name, description, price, picture : fileName, category_id, weight, storage_time, units_of_measure, is_availible, calories, proteins, carbons, fats})
            return res.json(dishes)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let {category_id, is_availible, limit, page} = req.query
        page = page || 1
        limit = limit || 20
        // отступ
        let offset = page * limit - limit
        //  сортировка по категории и доступности
        let where = {};
        if (category_id) where.category_id = category_id;
        if (is_availible !== undefined) where.is_availible = is_availible;

        const dishes = await Dish.findAndCountAll({ where, limit, offset });
        return res.json(dishes);
    }
    async getOne(req, res) {
        const {id} = req.params;
        const dish = await Dish.findOne({
            where: { id },
            include: [{model: UnitOfMeasure, as: "info"}],
        });
        return res.json(dish);
    }
    async updatePicture(req, res, next) {
        try {
            const { id } = req.params;
            const { picture } = req.files;

            if (!picture) {
                return next(ApiError.badRequest('Файл изображения не передан'));
            }

            const dish = await Dish.findByPk(id);
            if (!dish) {
                return next(ApiError.notFound('Блюдо не найдено'));
            }

            if (dish.picture) {
                const oldPath = path.resolve(__dirname, '..', 'static', dish.picture);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            let fileName = uuid.v4() + '.jpg';
            picture.mv(path.resolve(__dirname, '..', 'static', fileName));

            dish.picture = fileName;
            await dish.save();

            return res.json(dish);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}



module.exports = new DishesController();