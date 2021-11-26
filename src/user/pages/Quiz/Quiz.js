import React, { useState, useEffect } from 'react';
import { READ_SOAL, DELETE_SOAL } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import '../../../App.css';
import Speech from './components/Speech';


const Quiz = (props) => {
    const { loading, error, data } = useQuery(READ_SOAL);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [result, setResult] = useState("");
    const [counter, setCounter] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [start, setStart] = useState(false);
    const [score, setScore] = useState(0);
    const callbackFunction = (childData) => {
        setResult(childData);
    };

    useEffect(() => {
        if (result) {
            console.log('woi');
            HandleAnswer(result)
        }
    });

    const HandleStart = () =>{
        setStart(true);
    }

    const HandleRestart = () =>{
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
                <Container className="background h-100">
                    <Row className="mt-5 p-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                            <h1 className="text-primer text-center">Quiz Menyenangkan</h1>
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
        }

        if (counter > 2 || isCorrect === 'benar') {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < data.soal.length) {
                setCurrentQuestion(nextQuestion);
                setCounter(0);
            } else {
                setShowScore(true);
            }
        }
    };
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
                <Container className="background h-100">
                    <Row className="mt-5 p-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
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
                <Container className="background h-100">
                    <Row className="mt-5 p-5">
                        <Col lg={5} md={6} sm={12} className="bg-white p-5 m-auto shadow-lg card-primer">
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{data.soal.length}
                                </div>
                                <div className='question-count'>
                                    <span>Attempt {counter + 1}</span>/3
                                </div>
                                <div className='question-text mt-5'><img alt="sabar" width="200" src={data.soal[currentQuestion].soal_url} /></div>
                                {/* <div className='question-text'>{data.soal[currentQuestion].soal_soal}</div> */}
                            </div>
                            <div className='answer-section'>
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