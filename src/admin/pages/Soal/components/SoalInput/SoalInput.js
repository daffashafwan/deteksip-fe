import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CREATE_SOAL, READ_SOAL } from "../../../../../graphql/queries";


const updateCache = (cache, { data }) => {
    console.log("23456")
    const existingSoal = cache.readQuery({
        query: READ_SOAL,
    });
    console.log("1");
    const newSoal = data.insert_soal.returning[0];
    console.log("5");
    cache.writeQuery({
        query: READ_SOAL,
        data: { soal: [newSoal,...existingSoal.soal] },
    });
    console.log("4");
};

const SoalInput = () => {
    const [createSoal] = useMutation(CREATE_SOAL, { update: updateCache });
    const [formState, setFormState] = useState({
        soal: '',
        url: '',
    });
    const submitSoal = () => {
        var soal = formState.soal;
        var url = formState.url;
        createSoal({ variables: {soal: soal, url } });
        console.log("3");
    };
    return (
        <>
            <Form>
                <Form.Group className="m-1 mt-5" controlId="formBasicSoal">
                    <Form.Control value={formState.soal} onChange={(e) =>
                        setFormState({
                            ...formState,
                            soal: e.target.value
                        })
                    } type="text" placeholder="Masukkan Soal" />
                </Form.Group>

                <Form.Group className="m-1 mt-5" controlId="formBasicURL">
                    <Form.Control value={formState.url} onChange={(e) =>
                        setFormState({
                            ...formState,
                            url: e.target.value
                        })
                    } type="text" placeholder="Masukkan URL" />
                </Form.Group>
                <Button className="m-1 mt-5 btn-primer text-white w-100" variant="btn-block" onClick={submitSoal} >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SoalInput;