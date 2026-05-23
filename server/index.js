require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const router = require('./routes/index');
const app = express();
const errorHandler = require('./middleware/ErrorHandlerMiddleware');

app.use(cors());
app.use(express.json());
app.use('/api', router)

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
    try {
        // Синхронизация всех моделей
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        // Синхронизация с базой данных
        await sequelize.sync({ alter: true }); // или { force: true } для пересоздания таблиц
        console.log('Database sync established successfully.');
        // Запуск сервера
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    } catch (error) {
        console.log(error);
    }
};

start();