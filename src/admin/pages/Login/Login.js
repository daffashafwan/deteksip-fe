import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        username: '',
        password: '',
        name: ''
    });
    return (
        <>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Admin Login</h1>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group className="m-1" controlId="formBasicUsername">
                                <Form.Control value={formState.username} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        username: e.target.value
                                    })
                                } type="text" placeholder="Enter Username" />
                            </Form.Group>

                            <Form.Group className="m-1" controlId="formBasicPassword">
                                <Form.Control value={formState.password} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        password: e.target.value
                                    })
                                } type="password" placeholder="Enter Password" />
                            </Form.Group>

                            <Button className="m-1" variant="success btn-block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;