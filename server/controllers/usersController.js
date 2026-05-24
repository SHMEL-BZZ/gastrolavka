const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db');
const jwt = require('jsonwebtoken');

class UserController {
    async registration(req, res, next) {
        const { username, email, password, phone, role_id } = req.body;
        if (!username || !email || !password || !phone) {
            return next(ApiError.badRequest('Все поля должны быть заполнены!'));
        }

        try {
            const user = await sequelize.query(
                'SELECT register_user($1, $2, $3, $4, $5) AS user_id',
                {
                    bind: [username, email, password, phone, role_id],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            const token = jwt.sign({id: user.id, email, role_id }, process.env.SECRET_KEY, {expiresIn: '12h'});
            return res.json({token});
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    async login(req, res) {

    }
    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не задан id'))
        }
        res.json(id);
    }
}

module.exports = new UserController();