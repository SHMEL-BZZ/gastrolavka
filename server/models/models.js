const { DataTypes } = require("sequelize");
const sequelize = require('../db.js');

const Available_dish = sequelize.define ('available_dish', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    manufacture_date: {type: DataTypes.DATE},
    is_available: {type: DataTypes.BOOLEAN, defaultValue: true},
    dish_id: {type: DataTypes.INTEGER, allowNull: false},
})

const Basket = sequelize.define ('basket', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
})

const City = sequelize.define ('city', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const Customer_addresses = sequelize.define ('customer_addresses', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    customer_id: {type: DataTypes.BIGINT, allowNull: false},
    city_id: {type: DataTypes.SMALLINT, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
})

const Dish_categories = sequelize.define ('dish_categories', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const Dish_ingredients = sequelize.define ('dish_ingredients', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
})


const Dish = sequelize.define ('dish', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
    description : {type: DataTypes.STRING, allowNull: false},
    price : {type: DataTypes.DECIMAL(10,2), allowNull: false},
    picture : {type: DataTypes.STRING},
    category_id: {type: DataTypes.INTEGER, allowNull: false},
    weight : {type: DataTypes.DECIMAL(10,2), allowNull: false},
    units_of_measure_id: {type: DataTypes.INTEGER, allowNull: false}, // посеняла местами
    storage_time : {type: DataTypes.DATE, allowNull: false},
    is_available: {type: DataTypes.BOOLEAN, defaultValue: true},
    calories: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    proteins: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    carbons: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    fats: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
})

const Groups_sets = sequelize.define ('groups_sets', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    set_id: {type: DataTypes.INTEGER, allowNull: false},
    max_choice: {type: DataTypes.INTEGER},
    dish_categories_id: {type: DataTypes.INTEGER, allowNull: false},
})

const Ingredients  = sequelize.define ('ingredients', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
    is_in_stock: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
})

const Order  = sequelize.define ('order', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    date_time: {type: DataTypes.DATE, allowNull: false},
    status_id: {type: DataTypes.SMALLINT, allowNull: false},
    client_address_id: {type: DataTypes.SMALLINT, allowNull: false},
    comment: {type: DataTypes.STRING},
    table: {type: DataTypes.INTEGER},
    is_pickup: {type: DataTypes.BOOLEAN, defaultValue: false},
})


const Order_details = sequelize.define ('order_details', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    order_id: {type: DataTypes.INTEGER, allowNull: false},
    available_dish_id: {type: DataTypes.INTEGER, allowNull: false},
    set_id: {type: DataTypes.INTEGER},
})

const Requirement_types = sequelize.define ('requirement_types', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const Roles = sequelize.define ('roles', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const Sets = sequelize.define ('sets', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
    cost: {type: DataTypes.INTEGER, allowNull: false},
    is_available: {type: DataTypes.BOOLEAN, defaultValue: true},
})

const Special_requirements_dishes_group = sequelize.define ('special_requirements_dishes_group', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    dish_id: {type: DataTypes.INTEGER, allowNull: false},
    group_sets_id: {type: DataTypes.INTEGER, allowNull: false},
    requirement_types_id: {type: DataTypes.SMALLINT, allowNull: false},
    surcharge_price: {type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0},
})

const Statuses = sequelize.define ('statuses', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const Units_of_measure = sequelize.define ('units_of_measure', {
    id: {type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true},
    name : {type: DataTypes.STRING, allowNull: false},
})

const User = sequelize.define ('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    username : {type: DataTypes.STRING, allowNull: false},
    email : {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone : {type: DataTypes.BIGINT, allowNull: false},
    role_id: {type: DataTypes.SMALLINT, allowNull: false},
})

// описание связей между моделями
Dish.hasMany(Dish_categories)
Dish.belongsTo(Dish)
Dish.hasMany(Units_of_measure)
Units_of_measure.belongsTo(Dish)

Dish.belongsToMany(Ingredients, {through: Dish_ingredients})
Ingredients.belongsToMany(Dish, {through: Dish_ingredients})

Groups_sets.hasMany(Dish_categories)
Dish_categories.belongsTo(Groups_sets)
Groups_sets.hasMany(Sets)
Sets.belongsTo(Groups_sets)

Special_requirements_dishes_group.hasMany(Dish)
Dish.belongsTo(Special_requirements_dishes_group)
Special_requirements_dishes_group.hasMany(Groups_sets)
Groups_sets.belongsTo(Special_requirements_dishes_group)
Special_requirements_dishes_group.hasMany(Requirement_types)
Requirement_types.belongsTo(Special_requirements_dishes_group)

Available_dish.hasMany(Dish)
Dish.belongsTo(Available_dish)

User.hasMany(Roles)
Roles.belongsTo(User)

Customer_addresses.hasMany(User)
User.belongsTo(Customer_addresses)
Customer_addresses.hasMany(City)
City.belongsTo(Customer_addresses)

Order.hasMany(Statuses)
Statuses.belongsTo(Order)
Order.hasMany(Customer_addresses)
Customer_addresses.belongsTo(Order)

Order_details.hasMany(Order)
Order.belongsTo(Order_details)
Order_details.hasMany(Sets)
Sets.belongsTo(Order_details)
Order_details.hasMany(Available_dish)
Available_dish.belongsTo(Order_details)

User.belongsToMany(Ingredients, {through: Basket})
Order.belongsToMany(Dish, {through: Basket})

// экспорт моделей
module.exports = {
    Available_dish,
    Basket,
    City,
    Customer_addresses,
    Dish_categories,
    Dish_ingredients,
    Dish,
    Groups_sets,
    Ingredients,
    Order,
    Order_details,
    Requirement_types,
    Roles,
    Sets,
    Special_requirements_dishes_group,
    Statuses,
    Units_of_measure,
    User,
}