import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DISH_ROUTE } from "../utils/consts";

const DishItem = ({ dish }) => {
    const navigate = useNavigate();
    return (
        <Col md={4} onClick={() => navigate(DISH_ROUTE + "/" + dish.id)}>
            <Card className="dish-card">
                <Image src={process.env.REACT_APP_API_URL + 'img/' + dish.picture} className="dish-image" />
                <Card.Body className="dish-body">
                    <div className="dish-name" title={dish.name}>
                        {dish.name}
                    </div>
                    <button className="dish-price-btn">{dish.price} ₽</button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DishItem;