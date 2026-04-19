require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');

const app = express();

// подключение к БД
const start = async () => {
    try{
        await sequelize.authenticate(); // подключение к БД, асинхронно
        await sequelize.sync() // сверяет состояние БД со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch(e){
        console.log(e);
    }
}

// запуск сервера
start()

