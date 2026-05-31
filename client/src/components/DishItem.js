import React, { useContext } from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DISH_ROUTE } from "../utils/consts";
import { addToBasket } from "../http/basketAPI";
import { Context } from "../index";

const DishItem = ({ dish }) => {
    const navigate = useNavigate();
    const { user } = useContext(Context);

    const handleAddToBasket = async (e) => {
        e.stopPropagation();
        if (!user.isAuth) {
            navigate('/login');
            return;
        }
        try {
            await addToBasket(dish.id, 1);
            alert(`«${dish.name}» добавлено в корзину`);
        } catch (e) {
            console.error('Ошибка добавления в корзину:', e);
        }
    };

    return (
        <Col md={4} onClick={() => navigate(DISH_ROUTE + "/" + dish.id)}>
            <Card className="dish-card">
                <Image src={process.env.REACT_APP_API_URL + 'img/' + dish.picture} className="dish-image" />
                <Card.Body className="dish-body">
                    <div className="dish-name" title={dish.name}>
                        {dish.name}
                    </div>
                    <button className="dish-price-btn" onClick={handleAddToBasket}>
                        {dish.price} ₽
                    </button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DishItem;