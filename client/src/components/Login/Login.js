import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUp/SignUpForm";
import { Container, Button, Figure, Row, Col } from "react-bootstrap";
import "./Login.css";

function Login({ onLogin, setArtist }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container id="card_container">
      <Row className="justify-content-md-center">
        <Col>
          {showLogin ? (
            <>
              <LoginForm setArtist={setArtist} onLogin={onLogin} />

              <div id="register_click"onClick={() => setShowLogin(false)}>
                register for account
              </div>
            </>
          ) : (
            <>
              <SignUpForm setArtist={setArtist} onLogin={onLogin} />
              <p>
                Already have an an account?
                <Button
                  variant="outline-dark"
                  onClick={() => setShowLogin(true)}
                >
                  Log In
                </Button>
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
