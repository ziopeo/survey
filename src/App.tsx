import React, { useState } from 'react';
import { Counter } from './components/counter/Counter'
import './App.css'
import Survey from './components/survey/Survey'
import UserForm from './components/user/UserForm';
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FC = () => {
  const [surve, setSurvey] = useState(false);
  const [userForm, setUserForm] = useState(true);
  const showsurve = () => {
    setSurvey(true);
    setUserForm(false);
  };

  const showuserform = () => {
    setSurvey(false);
    setUserForm(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        Test Survey
        <Counter />
      </header>
      <Container>
        <Row>
          
            {userForm && (
              <div>
                <UserForm showSurvey={showsurve} />
              </div>
            )}
            {surve && (
              <Survey showUserForm={showsurve} />
            )} 
        </Row>
      </Container> 
    </div>
  );
};

export default App;
