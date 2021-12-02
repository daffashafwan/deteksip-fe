import React, { useState, useEffect } from 'react';
import { READ_SOAL } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Button, Col, Container, Row, ListGroup } from "react-bootstrap"
import '../../../App.css';
import Speech from './components/Speech';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { read_cookie, delete_cookie } from 'sfcookies';
import { useTour } from '@reactour/tour';


const Quiz = () => {
    const navigate = useNavigate();
    const { setIsOpen, ...rest } = useTour()
    const { loading, error, data } = useQuery(READ_SOAL);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState("");
    const [counter, setCounter] = useState(0);
    const [hintIndex, setHintIndex] = useState(0);
    const [hintDisabled, setHintDisabled] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [start, setStart] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (read_cookie('user_cred').length < 1) {
            navigate('/user/login');
        }
        if (result) {
            HandleAnswer(result)
        }
    });

    const callbackFunction = (childData) => {
        setResult(childData);
    };

    const HandleLogout = () => {
        delete_cookie('user_cred');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Berhasil Logout',
            showConfirmButton: false,
            timer: 1200
        });
        setTimeout(function () {
            navigate('/user/login');
        }, 1500)
    };

    const HandleStart = () => {
        setStart(true);
    }

    const HandleRestart = () => {
        setScore(0);
        setResult("");
        setCurrentQuestion(0);
        setCounter(0);
        setShowScore(false);
        setStart(false);
    }

    if (start === false) {
        return (
            <>
                <Container className="h-100">
                    <Row className="mt-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                            <Button className="text-center" onClick={HandleLogout} >Logout</Button>
                            <h1 className="text-primer text-center mt-4">Quiz Menyenangkan</h1>
                            <ListGroup className="mt-4" as="ol" numbered>
                                <ListGroup.Item as="li">Tekan tombol merah untuk menjawab</ListGroup.Item>
                                <ListGroup.Item as="li">Ketika tombol sudah hijau, maka sedang mendengar</ListGroup.Item>
                                <ListGroup.Item as="li">Klik tombol hijau untuk submit jawaban</ListGroup.Item>
                                <ListGroup.Item as="li">Anda akan diberi 3x kesempatan setiap soal</ListGroup.Item>
                                <ListGroup.Item as="li">Setiap soal memiliki hint (bantuan)</ListGroup.Item>
                            </ListGroup>
                            <Button onClick={HandleStart} className="m-1 mt-5 text-white w-100" variant="success btn-block" type="submit">
                                Mulai Quiz
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    const HandleAnswer = (isCorrect) => {
        if (isCorrect === 'benar') {
            setScore(score + 1);
            setResult("");
        } else {
            setCounter(counter + 1);
            setResult("");
            console.log(counter);
        }

        if (counter === 2 || isCorrect === 'benar') {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < data.soal.length) {
                setCurrentQuestion(nextQuestion);
                setHintDisabled(false);
                setCounter(0);
                setHintIndex(0)
            } else {
                setShowScore(true);
            }
        }
    };

    const HandleHint = () => {
        var hint = data.soal[currentQuestion].soal_hint.split(';');
        console.log(hint);
        Swal.fire({
            position: 'top-end',
            text: hint[hintIndex],
            showConfirmButton: false,
            timer: 1500
        });
        setHintIndex(hintIndex + 1);
        if (hintIndex >= hint.length - 1) {
            setHintDisabled(true);
        }
    }
    if (loading) {
        return <div className="tasks">Loading...</div>;
    }
    if (error) {
        console.log(error);
        return <div className="tasks">Error !</div>;
    }

    if (showScore) {
        return (
            <>
                <Container className="h-100">
                    <Row className="mt-5 p-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                            <Button className="text-center" onClick={HandleLogout} >Logout</Button>
                            <div className='score-section'>
                                Skor Antum {score} dari {data.soal.length}
                            </div>
                            <Button onClick={HandleRestart} className="m-1 mt-5 text-white w-100" variant="danger btn-block" type="submit">
                                Coba Lagi Kawan
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    } else {
        return (
            <>

                <Container className="h-100">
                    <Row className="mt-5 p-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                            <div className='question-section'>
                                <div className="row">
                                    <div data-tour="step-3" className="col-4">
                                        <Button className="text-center" onClick={HandleLogout} >Logout</Button>
                                    </div>
                                    <div data-tour="step-1" className="col-4">
                                        <div className='question-count'>
                                            <span>Question {currentQuestion + 1}</span>/{data.soal.length}
                                        </div>
                                        <div className='question-count'>
                                            <span>Attempt {counter + 1}</span>/3
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <Button onClick={HandleHint} className={hintDisabled ? `text-center btn-hint disabled` : `text-center btn-hint`} variant="warning">Hint</Button>
                                    </div>
                                </div>
                                <div className='question-text mt-5 text-center'><img alt="sabar" width="200" src={data.soal[currentQuestion].soal_url} /></div>
                                {/* <div className='question-text'>{data.soal[currentQuestion].soal_soal}</div> */}
                            </div>
                            <div data-tour="step-2" className='answer-section'>
                                <Speech name={data.soal[currentQuestion].soal_soal} parentCallback={callbackFunction} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Quiz;