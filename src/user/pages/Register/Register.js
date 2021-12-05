import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { CREATE_CHILD, READ_CHILD } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import '../../../App.css';
import { Link, useNavigate } from 'react-router-dom';

const updateCache = (cache, { data }) => {
    const existingChild = cache.readQuery({
        query: READ_CHILD,
    });
    const newChild = data.insert_child.returning[0];
    cache.writeQuery({
        query: READ_CHILD,
        data: { child: [newChild, ...existingChild.child] },
    });
};

const Register = () => {
    const navigate = useNavigate();
    const [createChild] = useMutation(CREATE_CHILD, { update: updateCache });
    const [formState, setFormState] = useState({
        login: true,
        username: '',
        password: '',
        passwordconfirm: '',
        nama: ''
    });

    const HandleInput = () => {
        var nama = formState.nama;
        var username = formState.username;
        var password = formState.password;
        var passwordconfirm = formState.passwordconfirm;
        if (password === passwordconfirm) {
            createChild({ variables: { nama, username, password } });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Berhasil Register, silahkan login dengan akun yang sudah didaftarkan',
                showConfirmButton: false,
                timer: 1200
            });
            setTimeout(function () {
                navigate('/user/login');
            }, 1500)
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Gagal Register, Silahkan Cek Input Anda',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
            <Container className="h-100">
                <Row className="mt-5 p-5">
                    <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                        <h1 className="text-primer text-center">Akses Akun Anda</h1>
                        <h5 className="text-dark text-center">Login Sebagai Pengguna</h5>
                        <Form>
                            <Form.Group className="m-1 mt-5" controlId="formBasicName">
                                <Form.Control required value={formState.nama} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        nama: e.target.value
                                    })
                                } type="text" placeholder="Enter Name" />
                            </Form.Group>
                            <Form.Group className="m-1 mt-5" controlId="formBasicUsername">
                                <Form.Control required  value={formState.username} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        username: e.target.value
                                    })
                                } type="text" placeholder="Enter Username" />
                            </Form.Group>

                            <Form.Group className="m-1 mt-5" controlId="formBasicPassword">
                                <Form.Control required value={formState.password} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        password: e.target.value
                                    })
                                } type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group className="m-1 mt-5" controlId="formBasicPasswordConfirm">
                                <Form.Control required value={formState.passwordconfirm} onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        passwordconfirm: e.target.value
                                    })
                                } type="password" placeholder="Re Enter Password" />
                            </Form.Group>
                            <Button onClick={HandleInput} className="m-1 mt-5 btn-primer text-white w-100" variant="btn-block">
                                Register
                            </Button>
                            <Link style={{ textDecoration: 'none' }} to="/admin/login"><h5 className="text-dark text-center mt-3">Login Sebagai <span className="text-primer">Admin</span> </h5></Link>
                            <Link style={{ textDecoration: 'none' }} to="/"><h5 className="text-secondary text-center mt-3">Kembali Ke Home</h5></Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;