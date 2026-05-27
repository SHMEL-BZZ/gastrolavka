
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Container, Row } from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import ChooseBtn from "../components/ChooseBtn";
import SearchField from "../components/SearchField";
import DishList from "../components/DishList";
import {fetchDishes, fetchCategories} from "../http/dishAPI";
import {Context} from "../index";

const Lavka = () => {
    const {dish} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => {
            dish.setCategories(data)
            dish.setSelectedCategory(data[0])
        })
    }, [])

    useEffect(() => {
        console.log('selectedCategory изменилась:', dish.selectedCategory)  // ← меняется?
        console.log('id категории:', dish.selectedCategory.id)              // ← есть id?
        fetchDishes(dish.selectedCategory.id, dish.page, dish.limit).then(data => {
            console.log('Блюда:', data)
            dish.setDishes(data.rows)
            dish.setTotalCount(data.count)
        })
    }, [dish.page, dish.selectedCategory])


    return (
        <div>
            <Container>
                <Row className={"mt-3"}>
                    <Col md={3}>
                        <CategoryBar />
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={6}>
                                <SearchField />
                            </Col>
                            <Col md={6}>
                                <ChooseBtn />
                            </Col>
                        </Row>
                        <Row className={"mt-3"}>
                            <DishList />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default observer(Lavka);