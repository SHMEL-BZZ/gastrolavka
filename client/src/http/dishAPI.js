import { $host } from "./index";

export const fetchCategories = async () => {
    const { data } = await $host.get('api/dishCategories');
    return data;
};

export const fetchDishes = async (category_id, page, limit= 5) => {
    const {data} = await $host.get('api/dishes', {params: {
            category_id, page, limit
        }})
    return data
}

export const fetchOneDish = async (id) => {
    const {data} = await $host.get('api/dishes/' + id)
    return data
}