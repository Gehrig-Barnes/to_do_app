import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ToggleButton,
  ButtonGroup,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onLogin, setArtist }) {
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setUserObj({
      ...userObj,
      [e.target.id]: e.target.value,
    });
  };
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [radioValue, setRadioValue] = useState("login");
  const radios = [
    { name: "Renter", value: "signup" },
    { name: "Artist", value: "artist_signup" },
  ];

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`/${radioValue}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => radioValue === 'signup' ? onLogin(user) : setArtist(user));
        navigate("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <div>
      <Container>
        <Card style={{ width: "20rem" }} className="sign_card">
          <Card.Body>
            <h1>Create an Account</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  value={userObj.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  value={userObj.password_confirmation}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit">
                {isLoading ? "Loading..." : "Login"}
              </Button>
              {errors.map((error) => (
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

export default SignUpForm;
