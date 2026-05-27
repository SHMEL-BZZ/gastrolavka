require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const PORT = process.env.PORT || 5000;
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const app = express();
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const path = require('path');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(fileUpload({}));
app.use('/img', express.static(path.resolve(__dirname, 'static/img')));
app.use('/api', router)

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
    try {
        // Синхронизация всех моделей
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        // Синхронизация с базой данных
        // await sequelize.sync(); // или { force: true } для пересоздания таблиц
        // console.log('Database sync established successfully.');
        // Запуск сервера
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

    } catch (error) {
        console.log(error);
    }
};

start();