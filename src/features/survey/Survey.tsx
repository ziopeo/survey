/* :)
Ciao, sono un componente React che rappresenta un sondaggio denominato Su. 
Utilizzo i hook di React useState e useEffect, così come la libreria axios, per gestire la comunicazione con un API REST. 
Mostro una domanda alla volta all'utente e salvo le risposte che sceglie nel mio stato. 
Inoltre, mostro il progresso del sondaggio e un modale che indica se la risposta scelta dall'utente è corretta o sbagliata. 
Alla fine del sondaggio, invio i dati dell'utente e i punti ottenuti al API per l'archiviazione.*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { select } from "../user/userSlice";
import { Card, Form, Button, ProgressBar, Modal, Badge } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { incrementByAmount, selectCount } from "../counter/counterSlice";

interface Question {
  surveyId: string;
  question: string;
  textCorrectAnswer: string;
  textWrongAnswer: string;
  answers: Array<{
    answersId: string;
    answer: string;
    isCorrect: boolean;
    point: number;
  }>;
}
interface UserAnswer {
  fullName: string;
  email: string;
  answers: string[];
  totalPoint: number;
}
// Dichiarazione dello stato iniziale per la risposta dell'utente
const initialUser: UserAnswer = {
  fullName: "",
  email: "",
  answers: [],
  totalPoint: 0,
};
// Componente Survey con tipo di props
const Survey: React.FC<{ showUserForm: () => void }> = ({ showUserForm }) => {
  // State Management
  const dispatch = useAppDispatch();
  const userdata = useAppSelector(select);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newUser, setNewUser] = useState<UserAnswer>(initialUser);
  const count = useAppSelector(selectCount);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [checked, setChecked] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswerId(answerId);
    setChecked(answerId);
  };

  //CHIAMATE API
  //Scrive un record nel database con il risulato del test attraverso json-server
  async function addUserAnswer() {
    try {
      const response = await axios.post(
        "http://localhost:3001/userAnswers",
        newUser
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //Legge le domande

  useEffect(() => {
    const fetchQuestion = async () => {
      const result = await axios.get("http://localhost:3001/questions");
      setQuestions(result.data);
    };
    fetchQuestion();
  }, []);

  const handleNextButtonClick = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.answersId === selectedAnswerId
    );

    // Aggiungi la risposta selezionata all'oggetto newUser
    if (selectedAnswer) {
      newUser.answers.push(selectedAnswer.answersId);
      dispatch(incrementByAmount(selectedAnswer.point));

      // Imposta lo stato isCorrect in base alla corretta selezione dell'utente
      setIsCorrect(selectedAnswer.isCorrect);

      // Aggiorna il punteggio totale con l'importo della risposta corretta
      if (currentQuestionIndex === questions.length - 1) {
        newUser.fullName = userdata.username;
        newUser.email = userdata.email;
        newUser.totalPoint = count;
        addUserAnswer();
      }
    }

    // Avanza alla prossima domanda
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // Resetta la risposta selezionata alla domanda successiva
  useEffect(() => {
    setSelectedAnswerId(null);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  // Calcola la percentuale di progresso dell'utente
  const getProgressPercentage = (
    currentQuestionIndex: number,
    totalQuestions: number
  ) => {
    return (currentQuestionIndex / totalQuestions) * 100;
  };

  return (
    <Card className="bg-light border ">
      <Card.Body>
        <Card>
          <h1>
            Utente: <Badge bg="secondary">{userdata.username}</Badge>
          </h1>
          {currentQuestion ? (
            currentQuestion.question
          ) : (
            <h2>
              Complimenti{" "}
              <Badge bg="secondary">Hai completato il sondaggio!</Badge>
            </h2>
          )}
        </Card>
        <Form>
          {currentQuestion
            ? currentQuestion.answers.map((answer, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={answer.answer}
                  name={currentQuestion.question}
                  id={answer.answersId}
                  value={answer.answersId}
                  onChange={() => handleAnswerSelection(answer.answersId)}
                  checked={answer.answersId === checked}
                />
              ))
            : null}
          <Button
            className="me-5"
            variant="primary"
            onClick={() => {
              handleNextButtonClick();
              handleShow();
            }}
            disabled={!selectedAnswerId}
          >
            Successivo
          </Button>
        </Form>
        <ProgressBar
          now={getProgressPercentage(currentQuestionIndex, questions.length)}
        />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Risultato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{isCorrect ? "Risposta corretta" : "Risposta sbagliata"}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Risultato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{isCorrect ? "Risposta corretta" : "Risposta sbagliata"}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Survey;
