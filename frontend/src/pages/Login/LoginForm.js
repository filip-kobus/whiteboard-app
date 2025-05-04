import React from "react";
import { Form, Button } from "react-bootstrap";

function LoginForm({ email, setEmail, password, setPassword, handleSubmit }) {
  return (
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

      <Form.Group className="mb-3 d-flex gap-3 align-items-center mt-2">
        <span className="me-1">Don't have account?</span>
        <a href="/register" className="text-primary text-decoration-none">
          Sign up
        </a>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;