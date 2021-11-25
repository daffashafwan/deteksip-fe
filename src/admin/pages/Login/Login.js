import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie'
import '../../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


const Login = () => {
    //const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
    const [formState, setFormState] = useState({
        login: true,
        username: '',
        password: '',
        name: ''
    });

    async function onSubmit(values) {
        const response = 1;
    
        let expires = new Date()
        expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
        setCookie('access_token', response.data.access_token, { path: '/',  expires})
        setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
    }

    return (
        
        <>
            <Container className="background h-100">
                <Row className="mt-5 p-5">
                    <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                        <h1 className="text-primer text-center">Akses Akun Anda</h1>
                        <h5 className="text-dark text-center">Login Sebagai Admin</h5>
                        <Form>
                            <Form.Group className="m-1 mt-5" controlId="formBasicUsername">
                                <Form.Control value={formState.username} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        username: e.target.value
                                    })
                                } type="text" placeholder="Enter Username" />
                            </Form.Group>

                            <Form.Group className="m-1 mt-5" controlId="formBasicPassword">
                                <Form.Control value={formState.password} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        password: e.target.value
                                    })
                                } type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Button className="m-1 mt-5 btn-primer text-white w-100" variant="btn-block" type="submit">
                                Masuk
                            </Button>
                            <Link style={{ textDecoration: 'none' }} to="/user"><h5 className="text-dark text-center mt-3">Login Sebagai <span className="text-primer">Pengguna</span> </h5></Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;