import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, DISH_ROUTE, LAVKA_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Lavka from "./pages/Lavka";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DishPage from "./pages/DishPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
    },
    {
        path: BASKET_ROUTE,
        component: Basket,
    },
    {
        path: ADMIN_ROUTE,
        component: Admin,
    },
]

export const publicRoutes = [
    {
        path: LAVKA_ROUTE,
        component: Lavka,
    },
    {
        path: LOGIN_ROUTE,
        component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth,
    },
    {
        path: DISH_ROUTE + '/:id',
        component: DishPage,
    },
]