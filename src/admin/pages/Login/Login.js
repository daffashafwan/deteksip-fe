import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { READ_USER } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import { bake_cookie } from 'sfcookies';
import '../../../App.css';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const cookie_key = 'admin_cred';
    const { loading, error, data } = useQuery(READ_USER);
    const [formState, setFormState] = useState({
        login: true,
        username: '',
        password: '',
        name: ''
    });

    const HandleInput = () => {
        data.user.forEach((k, v) => {
            if (k.user_username === formState.username && k.user_password === formState.password) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Login',
                    showConfirmButton: false,
                    timer: 1200
                });
                bake_cookie(cookie_key, k.user_id);
                setTimeout(function () {
                    navigate('/admin/soal');
                }, 1500)

            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Gagal Login, Silahkan Cek Kredensial Anda',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (

        <>
            <Container className="h-100">
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
                            <Button className="m-1 mt-5 btn-primer text-white w-100" variant="btn-block" onClick={HandleInput}>
                                Masuk
                            </Button>
                            <Link style={{ textDecoration: 'none' }} to="/user/login"><h5 className="text-dark text-center mt-3">Login Sebagai <span className="text-primer">Pengguna</span> </h5></Link>
                            <Link style={{ textDecoration: 'none' }} to="/"><h5 className="text-secondary text-center mt-3">Kembali Ke Home</h5></Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;