import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

function SignUpForm ({onLogin}){
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
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
                  id="username"
                  type="username"
                  placeholder="Enter User Name"
                  autoComplete="off"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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
      </Container>
    </div>
    )
}

export default SignUpForm