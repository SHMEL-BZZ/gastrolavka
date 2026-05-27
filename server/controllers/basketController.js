const sequelize = require('../db');
const ApiError = require('../error/ApiError');
const {User, Basket, Dish} = require("../models/models");

class BasketController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.id;

            const basket = await sequelize.query(
                'SELECT * FROM get_basket($1)',
                {
                    bind: [userId],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            return res.json(basket);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async addToBasket(req, res, next) {
        try {
            const { dish_id, quantity } = req.body;
            const userId = req.user.id;

            if (!dish_id) {
                return next(ApiError.badRequest('Не указан dish_id'));
            }

            const result = await sequelize.query(
                'SELECT add_to_basket_simple($1, $2, $3) AS result',
                {
                    bind: [userId, dish_id, quantity || 1],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            return res.json({ success: true, result: result[0].result });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async placeOrder(req, res, next) {
        try {
            const { address_id, is_pickup, comment } = req.body;
            const userId = req.user.id;

            if (is_pickup === undefined) {
                return next(ApiError.badRequest('Не указан is_pickup (true/false)'));
            }

            const result = await sequelize.query(
                'SELECT place_order($1, $2, $3, $4) AS order_id',
                {
                    bind: [userId, address_id || null, is_pickup, comment || null],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            return res.json({
                success: true,
                order_id: result[0].order_id,
                message: 'Заказ успешно оформлен'
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController()