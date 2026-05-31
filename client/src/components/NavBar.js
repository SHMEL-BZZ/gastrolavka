import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Context } from '../index';
import { BASKET_ROUTE, LAVKA_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { NavLink, useNavigate } from 'react-router-dom';
import '../static/content/site.css';
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        user.logout();       // метод стора, который устанавливает isAuth = false
        navigate(LAVKA_ROUTE); // переход на главную после выхода
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="custom-navbar">
            <Container>
                <Nav.Link as={NavLink} to={LAVKA_ROUTE} className="fw-bold">Тертый калач</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2">
                        <Button as={NavLink} to={LAVKA_ROUTE} className="btn-search">🔍</Button>
                        {!user?.isAuth ? (
                            <Button as={NavLink} to={LOGIN_ROUTE} className="btn-login">Войти</Button>
                        ) : (
                            <Button onClick={handleLogout} className="btn-login">Выйти</Button>
                        )}
                        {!user?.isAuth ? (
                            <Button as={NavLink} to={LOGIN_ROUTE} className="btn-cart">Корзина</Button>
                        ) : (
                            <Button as={NavLink} to={BASKET_ROUTE} className="btn-cart">Корзина</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;