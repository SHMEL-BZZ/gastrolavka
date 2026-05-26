import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../static/content/auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); // true = вход, false = регистрация
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!isLogin) {
            // Валидация регистрации
            if (!formData.name.trim()) {
                setError('Введите имя');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Пароли не совпадают');
                return;
            }
            if (formData.password.length < 6) {
                setError('Пароль должен содержать минимум 6 символов');
                return;
            }
        }

        if (!formData.email.trim()) {
            setError('Введите email');
            return;
        }
        if (!formData.password.trim()) {
            setError('Введите пароль');
            return;
        }

        // Имитация отправки запроса
        console.log(isLogin ? 'Вход:' : 'Регистрация:', formData);
        setSuccess(isLogin ? 'Вы успешно вошли!' : 'Регистрация прошла успешно!');

        // Очистка формы после успеха (опционально)
        setTimeout(() => {
            setSuccess('');
            if (!isLogin) {
                setIsLogin(true);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }
        }, 2000);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="auth-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <div className="auth-card">
                            <div className="auth-header">
                                <h2>{isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}</h2>
                                <p>
                                    {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
                                    <button type="button" className="auth-toggle-link" onClick={toggleMode}>
                                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                                    </button>
                                </p>
                            </div>

                            {error && <Alert variant="danger" className="auth-alert">{error}</Alert>}
                            {success && <Alert variant="success" className="auth-alert">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Введите ваше имя"
                                            className="auth-input"
                                        />
                                    </Form.Group>
                                )}

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email адрес</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@mail.com"
                                        className="auth-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="auth-input"
                                    />
                                </Form.Group>

                                {!isLogin && (
                                    <Form.Group className="mb-4" controlId="formConfirmPassword">
                                        <Form.Label>Подтверждение пароля</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="auth-input"
                                        />
                                    </Form.Group>
                                )}

                                <Button type="submit" className="auth-btn w-100">
                                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                </Button>
                            </Form>

                            {isLogin && (
                                <div className="auth-footer">
                                    <a href="#" className="forgot-password">Забыли пароль?</a>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Auth;