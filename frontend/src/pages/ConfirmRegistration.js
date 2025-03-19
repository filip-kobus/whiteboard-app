import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { CognitoUser } from "amazon-cognito-identity-js";
import { cognitoConfig } from "../utils/CognitoConfig";
import { useNavigate } from "react-router";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool(cognitoConfig);

const ConfirmRegistration = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerification = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        if (err.message === "User is already confirmed.") {
          setSuccess("Your account is already verified. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
          return;
        }
        setError(err.message);
        return;
      }
      setSuccess("Account verified successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    });
  };

  const handleResendCode = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.resendConfirmationCode((err, result) => {
      if (err) {
        setError(err.message);
      } else {
        setSuccess("A new verification code has been sent to your email.");
      }
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center register-container">
      <div className="register-box">
        <h2 className="text-center mb-4">Confirm Your Email</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleVerification}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the code from your email"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Confirm Email
          </Button>

          <Button variant="link" onClick={handleResendCode} className="w-100 mt-2">
            Resend Code
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ConfirmRegistration;
