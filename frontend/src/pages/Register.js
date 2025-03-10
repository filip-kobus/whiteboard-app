import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Register.css';

function Register() {
  return (
    <>
      {/* Register Form */}
      <div className="register-section">
        <Container className="d-flex justify-content-center align-items-center register-container">
          <div className="register-box">
            <h2 className="text-center title mb-4">Sign up</h2>

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

              {/* Confirm Password Input */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat your password" required />
              </Form.Group>

              {/* Terms & Conditions */}
              <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Check type="checkbox" required />
                <span className="ms-2">I agree to the terms and conditions</span>
              </Form.Group>

              {/* Register Button */}
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
