import React from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import { ApolloProvider } from "@apollo/client";
import {client} from '../../../config.js';
import SoalInput from './components/SoalInput';
import SoalList from './components/SoalList';

const Soal = () => {

    return (
        <ApolloProvider client={client}>
        <>
            <Container className="h-100">
                <Row className="mt-5 p-5">
                    <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                        <h1 className="text-primer text-center">Kelola Soal</h1>
                        <SoalInput/>
                        <SoalList/>
                    </Col>
                </Row>
            </Container>
        </>
        </ApolloProvider>
    );
};

export default Soal;