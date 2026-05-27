import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DishItem from "./DishItem";

const DishList = observer(() => {
    const { dish } = useContext(Context);
    return (
        <div>
            <Row className="gy-4">
                {dish.dishes.map(dishItem =>
                    <DishItem key={dishItem.id} dish={dishItem} />
                )}
            </Row>
        </div>
    );
});

export default DishList;