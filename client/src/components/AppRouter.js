import React, {Component, useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../utils/routes";
import Lavka from "../pages/Lavka";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {publicRoutes.map(({path, component: Component}) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Lavka />} />
        </Routes>
    );
};

export default AppRouter;