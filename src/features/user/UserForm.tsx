import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateUserData, select } from "./userSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface UserData {
  username: string;
  email: string;
}
const UserForm: React.FC<{ showSurvey: () => void }> = ({ showSurvey }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData({ username, email }));
    showSurvey();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UserForm;
