/* :)
Ciao, sono un componente React che rappresenta un sondaggio denominato Su. 
Utilizzo i hook di React useState e useEffect, così come la libreria axios, per gestire la comunicazione con un API REST. 
Mostro una domanda alla volta all'utente e salvo le risposte che sceglie nel mio stato. 
Inoltre, mostro il progresso del sondaggio e un modale che indica se la risposta scelta dall'utente è corretta o sbagliata. 
Alla fine del sondaggio, invio i dati dell'utente e i punti ottenuti al API per l'archiviazione.*/
import React, { useState, useEffect } from "react";
import { select } from "../../store/userSlice";
import { Card, Form, Button, ProgressBar, Modal, Badge } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { incrementByAmount, selectCount } from "../../store/counterSlice";
import {getQuestions, addUserAnswer} from "../../services/api";
import {Question, UserAnswer} from "../../services/interfaces"


// Dichiarazione dello stato iniziale per la risposta dell'utente
const initialUser: UserAnswer = {
  fullName: "",
  email: "",
  answers: [],
  totalPoint: 0,
};
// Componente Survey con tipo di props
const Survey: React.FC<{ showUserForm: () => void }> = ({}) => {
// State Management
const dispatch = useAppDispatch();
const userdata = useAppSelector(select);
const [questions, setQuestions] = useState<Question[]>([]);
const [newUser, setNewUser] = useState<UserAnswer>(initialUser);
const count = useAppSelector(selectCount);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
const [error, setError] = useState("");
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
//Scrivo un record nel database con il risulato del test attraverso json-server

// Legge le domande 
useEffect(() => {
  const fetchQuestion = async () => {
    try {
      const questions = await getQuestions();
      setQuestions(questions);
    } catch (errore) {
      setError("Non sono riuscito a leggere le domande dal database");
    }
  };
  fetchQuestion();
}, []);



  //Funzione che si attiva alla pressione del pulsante "Successivo"
  const handleNextButtonClick = async() => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.answersId === selectedAnswerId
    );
  
    // Aggiungi la risposta selezionata all'oggetto newUser
    if (!selectedAnswer) 
      setError("Devi selezionare una domanda");
    else {
      newUser.answers.push(selectedAnswer.answersId);
      dispatch(incrementByAmount(selectedAnswer.point));
  
      // Imposta lo stato isCorrect in base alla corretta selezione dell'utente
      setIsCorrect(selectedAnswer.isCorrect);
  
      // Aggiorna il punteggio totale con l'importo della risposta corretta
      if (currentQuestionIndex === questions.length - 1) {
        newUser.fullName = userdata.username;
        newUser.email = userdata.email;
        newUser.totalPoint = count;
        setNewUser(newUser);
        await addUserAnswer(newUser);
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
  const getProgressPercentage = (currentQuestionIndex: number, totalQuestions: number) => {
    return (currentQuestionIndex / totalQuestions) * 100;
  };
  

  return (
    <div className="container">
      <Card className="bg-light border mx-auto my-5" style={{ width: "60%" }}>
        <Card.Body>
          <h1 className="text-center">
            Utente:{" "}
            <Badge bg="secondary">{userdata.username}</Badge>
          </h1>
          {currentQuestion ? (
            <h2 className="text-center">{currentQuestion.question}</h2>
          ) : (
            <h2 className="text-center">
              Complimenti{" "}
              <Badge bg="secondary">Hai completato il sondaggio!</Badge>
            </h2>
          )}
          {questions.length === 0 ? (
            <div className="loading-indicator text-center">
              <p>Caricamento in corso...</p>
            </div>
          ) : (
            <Form className="mx-3">
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
                      className="my-3"
                    />
                  ))
                : null}
              <Button
                variant="primary"
                onClick={() => {
                  handleNextButtonClick();
                  handleShow();
                }}
                disabled={!selectedAnswerId}
                className="mt-5"
              >
                Successivo
              </Button>
            </Form>
          )}
          <ProgressBar
            now={getProgressPercentage(currentQuestionIndex, questions.length)}
            className="my-3"
          />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Risultato</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                {isCorrect ? "Risposta corretta" : "Risposta sbagliata"}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Chiudi
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
  };
  
export default Survey;
