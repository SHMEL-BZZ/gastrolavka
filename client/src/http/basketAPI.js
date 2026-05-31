import { $authHost } from "./index";

export const addToBasket = async (dish_id, quantity = 1) => {
    const { data } = await $authHost.post('api/basket', { dish_id, quantity });
    return data;
};

export const fetchBasket = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};

export const placeOrder = async (address_id, is_pickup, comment) => {
    const { data } = await $authHost.post('api/basket/order', { address_id, is_pickup, comment });
    return data;
};