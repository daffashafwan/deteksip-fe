import React, {useEffect} from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import SoalInput from './components/SoalInput';
import SoalList from './components/SoalList';
import Swal from "sweetalert2";
import { read_cookie, delete_cookie } from 'sfcookies';
import { useNavigate } from 'react-router-dom';

const Soal = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(read_cookie('admin_cred').length < 1){
            navigate('/admin/login');
        }
    })

    const HandleLogout = () =>{
        delete_cookie('admin_cred');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Berhasil Logout',
            showConfirmButton: false,
            timer: 1200
        });
        setTimeout(function(){
            navigate('/admin/login');
        }, 1500)
    };

    return (
        <>
            <Container className="h-100">
                <Row className="mt-5 p-5">
                    <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                        <Button className="text-center" onClick={HandleLogout} >Logout</Button>
                        <h1 className="text-primer text-center">Kelola Soal</h1>
                        <SoalInput/>
                        <SoalList/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Soal;