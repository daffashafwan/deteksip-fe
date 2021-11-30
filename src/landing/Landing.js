import React from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <>
            <Container className="h-100">
                <Row className="mt-5 p-5">
                    <Col lg={12} md={12} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                        <div class="text-center m-5">
                            <h2 className="text-dark">
                                Selamat Datang di Aplikasi <span className="text-primer">tebaggambar.</span>
                            </h2>
                            <p>tebaggambar merupakan aplikasi dimana Anak dapat belajar mengenai nama nama benda dalam bahasa inggris. Berbeda dengan metode yang umum kita temui, <span className="text-primer">tebaggambar.</span> menggunakan AI dalam bentuk Speech Recognition untuk lebih interaktif</p>
                            <Link style={{ textDecoration: 'none' }} to="/user/login">
                                <Button className="m-1 mt-5 btn-primer text-white w-50" variant="btn-block">
                                    Yuk Mulai
                                </Button>
                            </Link>
                            <h5 className="mt-5 text-dark text-center"><span className="text-primer">tebaggambar.</span> part of <span className="text-primer">DeteksipApp</span></h5>
                            <p className="mt-5 text-secondary text-center">2021&copy; Made with	&hearts; and &#x2615; by <a style={{ textDecoration: 'none', color:'inherit' }} target="_blank" href="https://github.com/daffashafwan">Daffa Shafwan</a></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Landing;