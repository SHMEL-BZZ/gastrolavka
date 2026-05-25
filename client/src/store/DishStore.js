import {makeAutoObservable} from "mobx";

export default  class DishStore {
    constructor() {
        this._categories = [
            { id: 1,  name: "Супы" },
            { id: 2,  name: "Выпечка" },
            { id: 3,  name: "Горячие блюда" },
            { id: 4,  name: "Салаты" },
        ]
        this._dishes = [
            {
                id: 15,
                name: "Щи по рецептам охотника",
                description: "Щи сварены на утином бульоне с мариноваными груздями и нежнейшей свежей капустой. Для ценителей новых сочетаний в привычных блюдах",
                price: 260.00,
                picture: "img/e29856a8-96bc-45ad-98b6-16c448b7db79.jpg",
                category_id: 1,
                weight: 370.00,
                storage_time: "1 mon",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 16,
                name: "Солянка с характером",
                description: "Классичечкая солянка с нотками кисло-острых каперсов согреет и поднимет настроение в любую погоду",
                price: 260.00,
                picture: "img/979e729f-e45d-4658-ba52-02dc500e4eb7.jpg",
                category_id: 1,
                weight: 370.00,
                storage_time: "1 mon",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 17,
                name: "Зеленый борщ по мотивам бабушкиных рецептов",
                description: "Борщ на курином бульоне щедро пропитанный кислинкой щавля с добавлением киноа. Вкусное и полезное явство",
                price: 240.00,
                picture: "img/b45e2c97-2536-4b07-b8d2-a43c9f441657.jpg",
                category_id: 1,
                weight: 370.00,
                storage_time: "1 mon",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 19,
                name: "Гуляш по-СССРовски с гречкой",
                description: "Для тех, кто соскучился по вкусам, знакомым с детства. Нежнейшая говядина с ароматом лаврового листа и черного перца. Ничего лишнего.",
                price: 280.00,
                picture: "img/e9ad2195-1b4b-433e-aca7-d1a71681e6e7.jpg",
                category_id: 3,
                weight: 370.00,
                storage_time: "2 mons",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 20,
                name: "Болоньезе",
                description: "Спагетти с соусом болоньезе, украшенная пармезаном наполнит день вкусом и ароматом теплой Италии",
                price: 280.00,
                picture: "img/ebbd2be7-b27b-4488-9839-0f261389864e.jpg",
                category_id: 3,
                weight: 370.00,
                storage_time: "2 mons",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 21,
                name: "Лазанья Солнце Палермо",
                description: "Тончайшее тесто пропитано двумя видами соусов: болоньезе и бешамель, щедро присыпана сыром пармезан.",
                price: 350.00,
                picture: "img/52845481-c721-4614-8979-7f7f9d04a5c5.jpg",
                category_id: 3,
                weight: 370.00,
                storage_time: "2 mons",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 23,
                name: "Рагу овощное Щедрые дары",
                description: "Овощи, тающие во рту, свиная вырезка, томленая в овощном соусе",
                price: 290.00,
                picture: "img/fbb815c9-aa5e-4454-9294-0ecc4c465ae5.jpg",
                category_id: 3,
                weight: 370.00,
                storage_time: "2 mons",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            },
            {
                id: 24,
                name: "Крылья с чесноком и пармезаном",
                description: "Пекантные крылья идеально подойдут, как для уютного вечера дома, так и в кругу друзей",
                price: 290.00,
                picture: "img/1da29d4f-417a-4c44-b3db-83a1ba93a621.jpg",
                category_id: 8,
                weight: 400.00,
                storage_time: "2 mons",
                units_of_measure: 2,
                is_available: true,
                calories: 0.00,
                proteins: 0.00,
                carbons: 0.00,
                fats: 0.00
            }
        ];
        makeAutoObservable(this);
    }
    setCategories (categories) {
        this._categories = categories;
    }

    setDishes (dishes) {
        this._dishes = dishes;
    }

    get categories() {
        return this._categories;
    }
    get dishes(){
        return this._dishes;
    }
}