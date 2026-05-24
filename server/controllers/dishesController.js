const path = require("path");
const uuid = { v4: require('uuid').v4 };
const ApiError = require("../error/ApiError");
const {Dish, DishCategory, UnitOfMeasure} = require("../models/models");
const {where} = require("sequelize");

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
        let dishes;
        if (!category_id && !is_availible) {
            dishes = await Dish.findAndCountAll({ limit, offset });
        } else if (!category_id && is_availible) {
            dishes = await Dish.findAndCountAll({ where: { is_availible }, limit, offset });
        } else if (category_id && is_availible) {
            dishes = await Dish.findAndCountAll({ where: { category_id, is_availible }, limit, offset });
        } else if (category_id && !is_availible) {
            dishes = await Dish.findAndCountAll({ where: { category_id }, limit, offset });
        }
        return res.json(dishes)
    }
    async getOne(req, res) {
        const {id} = req.params;          // параметр из роута (например, /api/dishes/1)
        const dish = await Dish.findOne({
            where: { dish_id: id },       // явно указываем dish_id
            include: [DishCategory, UnitOfMeasure]
        });
        return res.json(dish);
    }
    async updatePicture(req, res, next) {
        try {
            const { id } = req.params;   // dish_id или id
            const { picture } = req.files;

            if (!picture) {
                return next(ApiError.badRequest('Файл изображения не передан'));
            }

            // Находим блюдо
            const dish = await Dish.findByPk(id);
            if (!dish) {
                return next(ApiError.notFound('Блюдо не найдено'));
            }

            // Удаляем старую картинку, если она есть (опционально)
            if (dish.picture) {
                const oldPath = path.resolve(__dirname, '..', 'static', dish.picture);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            // Сохраняем новую
            let fileName = uuid.v4() + '.jpg';
            picture.mv(path.resolve(__dirname, '..', 'static', fileName));

            // Обновляем запись
            dish.picture = fileName;
            await dish.save();

            return res.json(dish);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}



module.exports = new DishesController();