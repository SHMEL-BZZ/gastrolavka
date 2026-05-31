const { DataTypes } = require('sequelize');
const sequelize = require('../db');

//  Модель roles 
const Role = sequelize.define('Role', {
    role_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'roles',
    timestamps: false
});

//  Модель user 
const User = sequelize.define('User', {
    user_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.TEXT, allowNull: false, unique: true },
    email: { type: DataTypes.TEXT, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.BIGINT, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'user',
    timestamps: false
});

//  Модель statuses 
const Status = sequelize.define('Status', {
    status_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'statuses',
    timestamps: false
});

//  Модель city 
const City = sequelize.define('City', {
    city_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
}, {
    tableName: 'city',
    timestamps: false
});

//  Модель customer_addresses 
const CustomerAddress = sequelize.define('CustomerAddress', {
    customer_address_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    customer_id: { type: DataTypes.BIGINT, allowNull: false },
    city_id: { type: DataTypes.SMALLINT, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'customer_addresses',
    timestamps: false
});

//  Модель dish_categories 
const DishCategory = sequelize.define('DishCategory', {
    dish_categoty_id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
}, {
    tableName: 'dish_categories',
    timestamps: false
});

//  Модель units_of_measure 
const UnitOfMeasure = sequelize.define('UnitOfMeasure', {
    unit_of_measure_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'units_of_measure',
    timestamps: false
});

//  Модель dishes 
const Dish = sequelize.define('Dish', {
    dish_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2) },
    picture: { type: DataTypes.TEXT },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    storage_time: { type: DataTypes.RANGE(DataTypes.DATEONLY), allowNull: false },
    units_of_measure: { type: DataTypes.SMALLINT, allowNull: false },
    is_availible: { type: DataTypes.BOOLEAN, defaultValue: true },
    calories: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
    proteins: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
    carbons: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
    fats: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
}, {
    tableName: 'dishes',
    timestamps: false
});

//  Модель ingredients 
const Ingredient = sequelize.define('Ingredient', {
    ingredient_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    is_in_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: 'ingredients',
    timestamps: false
});

//  Модель dish_ingredients (промежуточная) 
const DishIngredient = sequelize.define('DishIngredient', {
    dish_id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
    ingredient_id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
}, {
    tableName: 'dish_ingredients',
    timestamps: false
});

//  Модель sets 
const Set = sequelize.define('Set', {
    set_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    cost: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    is_availible: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_necessary_to_choose: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
    tableName: 'sets',
    timestamps: false
});

//  Модель groups_sets 
const GroupSet = sequelize.define('GroupSet', {
    group_set_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    set_id: { type: DataTypes.INTEGER, allowNull: false },
    max_choice: { type: DataTypes.SMALLINT },
    dish_category: { type: DataTypes.SMALLINT, allowNull: false },
}, {
    tableName: 'groups_sets',
    timestamps: false
});

//  Модель requirement_types 
const RequirementType = sequelize.define('RequirementType', {
    requirement_type_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: false },
    name: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'requirement_types',
    timestamps: false
});

//  Модель special_requirements_dishes_group 
const SpecialRequirement = sequelize.define('SpecialRequirement', {
    special_requirement_dish_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    dish_id: { type: DataTypes.BIGINT, allowNull: false },
    group_set_id: { type: DataTypes.BIGINT, allowNull: false },
    requirement_type: { type: DataTypes.SMALLINT, allowNull: false },
    surcharge_price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
}, {
    tableName: 'special_requirements_dishes_group',
    timestamps: false
});

//  Модель promotions 
const Promotion = sequelize.define('Promotion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    discount_percent: { type: DataTypes.SMALLINT },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: 'promotions',
    timestamps: false
});

//  Модель promotion_dishes (промежуточная) 
const PromotionDish = sequelize.define('PromotionDish', {
    promotion_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    dish_id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true },
}, {
    tableName: 'promotion_dishes',
    timestamps: false
});

//  Модель available_dishes 
const AvailibleDish = sequelize.define('AvailibleDish', {
    availible_dish_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    manufacture_date: { type: DataTypes.DATE, allowNull: false },
    is_availible: { type: DataTypes.BOOLEAN, defaultValue: true },
    dish_id: { type: DataTypes.BIGINT, allowNull: false },
}, {
    tableName: 'availible_dishes',
    timestamps: false
});

//  Модель order 
const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    date_time: { type: DataTypes.DATE, allowNull: false },
    status_id: { type: DataTypes.SMALLINT, allowNull: false },
    client_id: { type: DataTypes.BIGINT, allowNull: false },
    crient_adress_id: { type: DataTypes.BIGINT, allowNull: false },
    comment: { type: DataTypes.TEXT },
    table: { type: DataTypes.SMALLINT },
    is_pickup: { type: DataTypes.BOOLEAN, defaultValue: false },
    cost: { type: DataTypes.DECIMAL(10,2) },
}, {
    tableName: 'order',
    timestamps: false
});

//  Модель order_details 
const OrderDetail = sequelize.define('OrderDetail', {
    order_detail_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false },
    availible_dish_id: { type: DataTypes.BIGINT, allowNull: false },
    set_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.SMALLINT, defaultValue: 1 },
}, {
    tableName: 'order_details',
    timestamps: false
});

//  Модель basket 
const Basket = sequelize.define('Basket', {
    basket_id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.BIGINT, allowNull: false },
    dish_id: { type: DataTypes.BIGINT },
    set_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.SMALLINT, defaultValue: 1 },
    is_excluded: { type: DataTypes.BOOLEAN, defaultValue: false },
    group_set_id: { type: DataTypes.BIGINT },
}, {
    tableName: 'basket',
    timestamps: false
});

//  Ассоциации (связи) 

// Role -> User
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// User -> CustomerAddress
User.hasMany(CustomerAddress, { foreignKey: 'customer_id' });
CustomerAddress.belongsTo(User, { foreignKey: 'customer_id' });

// City -> CustomerAddress
City.hasMany(CustomerAddress, { foreignKey: 'city_id' });
CustomerAddress.belongsTo(City, { foreignKey: 'city_id' });

// Status -> Order
Status.hasMany(Order, { foreignKey: 'status_id' });
Order.belongsTo(Status, { foreignKey: 'status_id' });

// User -> Order (как клиент)
User.hasMany(Order, { foreignKey: 'client_id' });
Order.belongsTo(User, { foreignKey: 'client_id' });

// CustomerAddress -> Order
CustomerAddress.hasMany(Order, { foreignKey: 'crient_adress_id' });
Order.belongsTo(CustomerAddress, { foreignKey: 'crient_adress_id' });

// DishCategory -> Dish
DishCategory.hasMany(Dish, { foreignKey: 'category_id' });
Dish.belongsTo(DishCategory, { foreignKey: 'category_id' });

// UnitOfMeasure -> Dish
UnitOfMeasure.hasMany(Dish, { foreignKey: 'units_of_measure' });
Dish.belongsTo(UnitOfMeasure, { foreignKey: 'units_of_measure' });

// Dish -> AvailibleDish
Dish.hasMany(AvailibleDish, { foreignKey: 'dish_id' });
AvailibleDish.belongsTo(Dish, { foreignKey: 'dish_id' });

// Dish <-> Ingredient (многие ко многим через DishIngredient)
Dish.belongsToMany(Ingredient, { through: DishIngredient, foreignKey: 'dish_id', otherKey: 'ingredient_id' });
Ingredient.belongsToMany(Dish, { through: DishIngredient, foreignKey: 'ingredient_id', otherKey: 'dish_id' });

// Set -> GroupSet
Set.hasMany(GroupSet, { foreignKey: 'set_id' });
GroupSet.belongsTo(Set, { foreignKey: 'set_id' });

// GroupSet -> SpecialRequirement
GroupSet.hasMany(SpecialRequirement, { foreignKey: 'group_set_id' });
SpecialRequirement.belongsTo(GroupSet, { foreignKey: 'group_set_id' });

// Dish -> SpecialRequirement
Dish.hasMany(SpecialRequirement, { foreignKey: 'dish_id' });
SpecialRequirement.belongsTo(Dish, { foreignKey: 'dish_id' });

// RequirementType -> SpecialRequirement
RequirementType.hasMany(SpecialRequirement, { foreignKey: 'requirement_type' });
SpecialRequirement.belongsTo(RequirementType, { foreignKey: 'requirement_type' });

// Promotion <-> Dish (многие ко многим через PromotionDish)
Promotion.belongsToMany(Dish, { through: PromotionDish, foreignKey: 'promotion_id', otherKey: 'dish_id' });
Dish.belongsToMany(Promotion, { through: PromotionDish, foreignKey: 'dish_id', otherKey: 'promotion_id' });

// AvailibleDish -> OrderDetail
AvailibleDish.hasMany(OrderDetail, { foreignKey: 'availible_dish_id' });
OrderDetail.belongsTo(AvailibleDish, { foreignKey: 'availible_dish_id' });

// Order -> OrderDetail
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });

// Set -> OrderDetail
Set.hasMany(OrderDetail, { foreignKey: 'set_id' });
OrderDetail.belongsTo(Set, { foreignKey: 'set_id' });

// User -> Basket
User.hasMany(Basket, { foreignKey: 'user_id' });
Basket.belongsTo(User, { foreignKey: 'user_id' });

// Dish -> Basket
Dish.hasMany(Basket, { foreignKey: 'dish_id' });
Basket.belongsTo(Dish, { foreignKey: 'dish_id' });

// Set -> Basket
Set.hasMany(Basket, { foreignKey: 'set_id' });
Basket.belongsTo(Set, { foreignKey: 'set_id' });

// GroupSet -> Basket
GroupSet.hasMany(Basket, { foreignKey: 'group_set_id' });
Basket.belongsTo(GroupSet, { foreignKey: 'group_set_id' });

module.exports = {
    sequelize,
    Role,
    User,
    Status,
    City,
    CustomerAddress,
    DishCategory,
    UnitOfMeasure,
    Dish,
    Ingredient,
    DishIngredient,
    Set,
    GroupSet,
    RequirementType,
    SpecialRequirement,
    Promotion,
    PromotionDish,
    AvailibleDish,
    Order,
    OrderDetail,
    Basket,
};