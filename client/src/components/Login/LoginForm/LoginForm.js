import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin, setArtist }) {
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [radioValue, setRadioValue] = useState("login");
  const radios = [
    { name: "Renter", value: "login" },
    { name: "Artist", value: "artist_login" },
  ];


  const nav = useNavigate();

  const handleChange = (e) => {
    setUserObj((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/${radioValue}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => radioValue === 'login' ? onLogin(user) : setArtist(user));
        nav("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div className="background">
      <Container>
        <Card style={{ width: "20rem" }} className="login_card">
          <Card.Body>
            <h1 className="welcome">To_do_app </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="login">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  autoComplete="off"
                  id="email"
                  value={userObj.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="login">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={userObj.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <button className="login_button" type="submit">
                {isLoading ? "Loading..." : "Login"}
              </button>
              {errors?.map((error) => (
                <Alert className="mt-3" variant="danger" key={error}>
                  {error}
                </Alert>
              ))}
            </Form>
          </Card.Body>
        </Card>

        <br />
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>
    </div>
  );
}

export default LoginForm;
