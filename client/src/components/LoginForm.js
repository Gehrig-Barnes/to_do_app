import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'

function LoginForm({onLogin}){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
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
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="login">
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
                <button className="login_button" type="submit">
                  {isLoading ? "Loading..." : "Login"}
                </button>
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

export default LoginForm


