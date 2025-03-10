import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Login.css';

function Login() {
  return (
    <>
      {/* Login Form */}
      <div className="login-section">
        <Container className="d-flex justify-content-center align-items-center login-container">
          <div className="login-box">
            <h2 className="text-center title mb-4">Sign in</h2>
            
            <Form>
              {/* Email Input */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" required />
              </Form.Group>

              {/* Remember Me & Forgot Password */}
              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="/forgot-password" className="text-primary text-decoration-none">
                  Forgot your password?
                </a>
              </Form.Group>

              {/* Login Button */}
              <Button variant="primary" type="submit" className="w-100 submit-button">
                Continue with email
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Login;