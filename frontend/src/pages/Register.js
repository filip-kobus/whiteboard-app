import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoConfig } from "../utils/CognitoConfig";
import { useNavigate } from "react-router";

const userPool = new CognitoUserPool(cognitoConfig);

function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const attributeList = [
      { Name: "nickname", Value: nickname },
      { Name: "email", Value: email }
    ];

    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        setSuccess("Account verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/confirm-registration"), 3000);
      }
    );
  }

  return (
    <>
      <div className="register-section">
        <Container className="d-flex justify-content-center align-items-center register-container">
          <div className="register-box">
            <h2 className="text-center title mb-4">Sign Up</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

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
