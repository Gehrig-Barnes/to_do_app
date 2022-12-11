import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUpForm ({onLogin}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();



  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate("/")
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
                  placeholder="Enter User Name"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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