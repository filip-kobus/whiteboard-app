import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoConfig } from "../utils/CognitoConfig";
import { useNavigate } from "react-router";
import { useAuth } from "../utils/AuthContext";

const userPool = new CognitoUserPool(cognitoConfig);

function Login() {
  const { login } = useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("✅ Login successful", result);

        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();

        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("idToken", idToken);
        sessionStorage.setItem("refreshToken", refreshToken);

        login(result.user)
        navigate("/dashboard");
      },
      onFailure: (err) => {
        setError(err.message);
      }
    });
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
