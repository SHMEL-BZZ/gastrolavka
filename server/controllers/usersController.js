const {User} = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require('../db');
const jwt = require('jsonwebtoken');


const generateToken = (id, email, role) => {
        return jwt.sign({id, email, role }, process.env.SECRET_KEY, {expiresIn: '12h'});
}

class UserController {
    async registration(req, res, next) {
        const { username, email, password, phone, role_id } = req.body;
        if (!username || !email || !password || !phone) {
            return next(ApiError.badRequest('Все поля должны быть заполнены!'));
        }

        try {
            const result = await sequelize.query(
                'SELECT register_user($1, $2, $3, $4, $5) AS id',
                {
                    bind: [username, email, password, phone, role_id || 1],
                    type: sequelize.QueryTypes.SELECT
                }
            );
            const userId = result[0]?.id;
            if (!userId) {
                throw new Error('Не удалось создать пользователя');
            }
            const token = generateToken(userId, email, role_id || 1);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Email и пароль обязательны'));
        }

        try {
            const result = await sequelize.query(
                'SELECT * FROM authenticate_user($1, $2)',
                {
                    bind: [email, password],
                    type: sequelize.QueryTypes.SELECT
                }
            );

            if (!result || result.length === 0) {
                return next(ApiError.badRequest('Неверный email или пароль'));
            }

            const user = result[0]; // { user_id, username, role_id }
            const token = generateToken(user.user_id, email, user.role_id);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async check(req, res, next) {
        const token = generateToken(req.user.id, req.user.email, req.user.role_id);
        return res.json({ token });
    }
}

module.exports = new UserController();