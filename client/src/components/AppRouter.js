import React, {Component} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Lavka from "../pages/Lavka";

const AppRouter = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, component: Component}) => (
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