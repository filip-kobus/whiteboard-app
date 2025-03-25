import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Login() {
  // State definitions for the form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

  };

  return (
    <div className="login-section">
      <Container className="d-flex justify-content-center align-items-center login-container">
        <div className="login-box">
          <h2 className="text-center title mb-4">Sign in</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Check type="checkbox" label="Remember me" />
              <a href="/forgot-password" className="text-primary text-decoration-none">
                Forgot your password?
              </a>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 submit-button">
              Continue with email
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
