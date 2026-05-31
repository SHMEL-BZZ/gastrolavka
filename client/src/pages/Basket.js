import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Spinner, Alert, ListGroup, Image, Button,
    Modal, Form
} from 'react-bootstrap';
import { fetchBasket, placeOrder } from '../http/basketAPI';

const Basket = () => {
    // Состояния для данных корзины
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Состояния для модального окна оформления заказа
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [addressId, setAddressId] = useState('');
    const [isPickup, setIsPickup] = useState(false);
    const [comment, setComment] = useState('');
    const [ordering, setOrdering] = useState(false);

    // Загрузка корзины при монтировании
    useEffect(() => {
        const loadBasket = async () => {
            try {
                const data = await fetchBasket();
                setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || 'Не удалось загрузить корзину');
            } finally {
                setLoading(false);
            }
        };
        loadBasket();
    }, []);

    // Обработчик оформления заказа
    const handleOrder = async () => {
        setOrdering(true);
        try {
            await placeOrder(addressId || null, isPickup, comment || null);
            alert('Заказ успешно оформлен!');
            setShowOrderModal(false);
            // Перезагружаем корзину (она должна очиститься на сервере)
            const data = await fetchBasket();
            setItems(Array.isArray(data) ? data : []);
            // Сбросить форму
            setAddressId('');
            setIsPickup(false);
            setComment('');
        } catch (err) {
            alert(err.message || 'Ошибка при оформлении заказа');
        } finally {
            setOrdering(false);
        }
    };

    // Отображение загрузки
    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="secondary" />
            </Container>
        );
    }

    // Отображение ошибки
    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // Пустая корзина
    if (items.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h3>Ваша корзина пуста</h3>
                <p>Добавьте блюда из меню, чтобы оформить заказ.</p>
            </Container>
        );
    }

    // Общая стоимость
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Корзина</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        {items.map((item) => (
                            <ListGroup.Item key={item.dish_id} className="d-flex align-items-center">
                                <Image
                                    src={process.env.REACT_APP_API_URL + item.picture}
                                    width={80}
                                    height={80}
                                    className="me-3 rounded"
                                    style={{ objectFit: 'cover' }}
                                    alt={item.name}
                                />
                                <div className="flex-grow-1">
                                    <h5>{item.name}</h5>
                                    <p className="mb-1">Количество: {item.quantity}</p>
                                    <p className="mb-0">{item.price} ₽ / шт.</p>
                                </div>
                                <div className="text-end">
                                    <p className="fw-bold mb-0">
                                        {(item.price * item.quantity).toFixed(2)} ₽
                                    </p>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <div className="border rounded p-3 bg-light">
                        <h4>Итого:</h4>
                        <p className="fs-3 fw-bold">{totalPrice.toFixed(2)} ₽</p>
                        <Button
                            variant="success"
                            className="w-100"
                            onClick={() => setShowOrderModal(true)}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Модальное окно оформления заказа */}
            <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Оформление заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Check
                            type="switch"
                            label="Самовывоз"
                            checked={isPickup}
                            onChange={(e) => setIsPickup(e.target.checked)}
                        />
                        {!isPickup && (
                            <Form.Group className="mt-3">
                                <Form.Label>ID адреса доставки</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={addressId}
                                    onChange={(e) => setAddressId(e.target.value)}
                                    placeholder="Введите ID адреса"
                                />
                                <Form.Text className="text-muted">
                                    Укажите ID вашего сохранённого адреса
                                </Form.Text>
                            </Form.Group>
                        )}
                        <Form.Group className="mt-3">
                            <Form.Label>Комментарий к заказу</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Пожелания, особые указания..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
                        Отмена
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleOrder}
                        disabled={ordering || (!isPickup && !addressId)}
                    >
                        {ordering ? 'Оформление...' : 'Подтвердить заказ'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Basket;