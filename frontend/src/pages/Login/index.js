import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signIn } from 'aws-amplify/auth';
import { useAppContext } from "../../libs/contextLib";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Login() {
  // State definitions for the form fields and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const { userHasAuthenticated } = useAppContext();

  async function handleSubmit(event) {
    event.preventDefault();
    setAlert({ show: false, variant: '', message: '' });

    try {
      await signIn({
        username: email,
        password: password,
      });
      setAlert({
        show: true,
        variant: 'success',
        message: 'Login successful! Redirecting...'
      });
      userHasAuthenticated(true);
    } catch (error) {
      setAlert({
        show: true,
        variant: 'danger',
        message: error.message || 'Login failed. Please try again.'
      });
    }
  }

  return (
    <div className="content-section">
        <div className="content-container">
          <h2 className="text-center title mb-4">Sign in</h2>

          {alert.show && (
          <Alert 
            variant={alert.variant} 
            className="custom-alert"
            dismissible
            onClose={() => setAlert({ ...alert, show: false })}
          >
            <div className="d-flex align-items-center">
              <FontAwesomeIcon 
                icon={alert.variant === 'success' ? faCheckCircle : faExclamationCircle} 
                className="me-2" 
              />
              <span>{alert.message}</span>
            </div>
          </Alert>
        )}

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
