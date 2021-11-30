import React from "react";
import { useMutation } from "@apollo/client";
import './Soal.css';
import { READ_SOAL, DELETE_SOAL, UPDATE_SOAL } from "../../../../../graphql/queries";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


const Soal = ({ soal }) => {
    const [deleteSoalMutation] = useMutation(DELETE_SOAL);
    //const [updateSoalMutation] = useMutation(UPDATE_SOAL);
  
    //const toggleCompleted = ({ soal_id, completed }) => {};
  
    const deleteSoal = (soal_id) => {
      deleteSoalMutation({
        variables: { soal_id: soal_id },
        optimisticResponse: true,
        update: (cache) => {
          const existingSoal = cache.readQuery({ query: READ_SOAL }); 
          const soals = {soal: existingSoal.soal.filter((t) => t.soal_id !== soal_id)}
          cache.writeQuery({
            query: READ_SOAL,
            data: soals
          });
        },
      });
    };
  
    return (
    <>
      <div key={soal.soal_id} className="btn btn-dark soal m-4">
        <span>{soal.soal_soal}</span>
        <Button type="submit" onClick={() => deleteSoal(soal.soal_id)}>
          Edit
        </Button>
        <Button type="submit" onClick={() => deleteSoal(soal.soal_id)}>
          remove
        </Button>
      </div>
    </>
    );
  };
  
  export default Soal;