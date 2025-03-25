import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";


function Register() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault()
  };

  return (
    <>
      <div className="register-section">
        <Container className="d-flex justify-content-center align-items-center register-container">
          <div className="register-box">
            <h2 className="text-center title mb-4">Sign Up</h2>

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </Form.Group>

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

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Check type="checkbox" required />
                <span className="ms-2">I agree to the terms and conditions</span>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 submit-button">
                Sign up
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Register;
