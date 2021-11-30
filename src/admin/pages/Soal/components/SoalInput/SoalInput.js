import React, { useEffect, useState, useContext } from 'react';
import { useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import { CREATE_SOAL, READ_SOAL, UPDATE_SOAL } from "../../../../../graphql/queries";
import { SoalContext } from '../../contexts/SoalContext';


const updateCache = (cache, { data }) => {
    const existingSoal = cache.readQuery({
        query: READ_SOAL,
    });
    const newSoal = data.insert_soal.returning[0];
    cache.writeQuery({
        query: READ_SOAL,
        data: { soal: [newSoal, ...existingSoal.soal] },
    });
};

const updateEditCache = (cache, { data }) => {
    const existingSoal = cache.readQuery({
        query: READ_SOAL,
    });
    const edited = data.update_soal.returning[0];
    const soals = { soal: existingSoal.soal.filter((t) => t.soal_id !== edited.soal_id) }
    cache.writeQuery({
        query: READ_SOAL,
        data: { soal: [edited, ...soals.soal] },
    });
};

const SoalInput = () => {
    const { onEdit, formStateContext, setOnEdit } = useContext(SoalContext);
    const [createSoal] = useMutation(CREATE_SOAL, { update: updateCache });
    const [updateSoalMutation] = useMutation(UPDATE_SOAL, { update: updateEditCache });
    const [formState, setFormState] = useState({
        id: '',
        soal: '',
        url: '',
        hint: ''
    });

    useEffect(() => {
        if (onEdit) {
            setFormState({
                id: formStateContext.id,
                soal: formStateContext.soal,
                url: formStateContext.url,
                hint: formStateContext.hint,
            });
        }
    }, [onEdit])

    const HandleReset = () =>{
        setOnEdit(false);
        setFormState({
            id: "",
            soal: "",
            url: "",
            hint: "",
        });
    }

    const SubmitSoal = () => {
        var soal = formState.soal;
        var url = formState.url;
        var hint = formState.hint;
        var id = formState.id;
        if (onEdit) {
            updateSoalMutation({variables: { id, soal, url, hint }});
        }else{
            createSoal({ variables: { soal: soal, url, hint } });
        }
        setFormState({
            id: "",
            soal: "",
            url: "",
            hint: "",
        });
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

                <Form.Group className="m-1 mt-5" controlId="formBasicHint">
                    <Form.Control value={formState.hint} onChange={(e) =>
                        setFormState({
                            ...formState,
                            hint: e.target.value
                        })
                    } type="text" placeholder="Masukkan Hint" />
                </Form.Group>
                <Button className="m-1 mt-5 text-white w-100" variant="warning btn-block" onClick={HandleReset} >
                    Reset
                </Button>
                <Button className="m-1 mt-5 btn-primer text-white w-100" variant="btn-block" onClick={SubmitSoal} >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default SoalInput;