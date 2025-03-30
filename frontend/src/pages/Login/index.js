import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signIn } from 'aws-amplify/auth';
import { useAppContext } from "../../libs/contextLib";

function Login() {
  // State definitions for the form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userHasAuthenticated } = useAppContext();

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await signIn({
        username: email,
        password: password,
      })
      alert("Logged in");
      userHasAuthenticated(true)
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="content-section">
        <div className="content-container">
          <h2 className="text-center title mb-4">Sign in</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="username"
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
    </div>
  );
}

export default Login;
