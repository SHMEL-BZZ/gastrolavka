const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Dish } = require(path.resolve(__dirname, '../../models/models'));
const sequelize = require('../../db');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Подключение к БД успешно');

        const imagesDir = path.resolve(__dirname, '../old_img');
        if (!fs.existsSync(imagesDir)) {
            console.error(`❌ Папка ${imagesDir} не найдена`);
            return;
        }

        // Целевая папка: static/img
        const targetDir = path.resolve(__dirname, '.../static/img');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const files = fs.readdirSync(imagesDir);
        console.log(`📁 Найдено файлов: ${files.length}`);

        for (const file of files) {
            const match = file.match(/^(\d+)\.jpg$/i);
            if (!match) continue;

            const dishId = parseInt(match[1], 10);
            const dish = await Dish.findByPk(dishId);
            if (dish && !dish.picture) {
                const newName = uuidv4() + '.jpg';
                const oldPath = path.join(imagesDir, file);
                const newPath = path.join(targetDir, newName);
                fs.renameSync(oldPath, newPath);
                // Сохраняем относительный путь с подпапкой img/
                dish.picture = `img/${newName}`;
                await dish.save();
                console.log(`✅ Блюдо ${dishId} → img/${newName}`);
            } else if (dish && dish.picture) {
                console.log(`⏭️ Блюдо ${dishId} уже имеет картинку: ${dish.picture}`);
            } else {
                console.log(`⚠️ Блюдо с id=${dishId} не найдено`);
            }
        }
        console.log('🎉 Готово!');
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    } finally {
        await sequelize.close();
    }
})();