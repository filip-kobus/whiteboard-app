import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signUp, oauth } from 'aws-amplify/auth';
import Confirm from "./confirm";


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSigned, setIsSigned] = useState(true)

  async function handleRegister(e) {
    e.preventDefault()
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          name: name,
        },
      }
    });
    setIsSigned(false)
  };

  if(!isSigned) return <Confirm username={email} />

  return (
    <>
      <div className="content-section">
          <div className="content-container">
            <h2 className="title mb-4">Sign Up</h2>

            <Form className="form" onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <Button variant="primary" type="submit" className="w-100 submit-button">
                Sign up
              </Button>

              <Form.Group className="mb-3 d-flex gap-3 align-items-center">
                <span className="me-2">Already have an account?</span>
                <a href="/login" className="text-primary text-decoration-none">
                  Sign in
                </a>
              </Form.Group>
            </Form>
          </div>
      </div>
    </>
  );
}

export default Register;
