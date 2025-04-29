import React from "react";
import { Form, Button } from "react-bootstrap";

export default function RegisterForm({ formData, handleChange, handleRegister }) {
  return (
    <Form className="form" onSubmit={handleRegister}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your username"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Repeat your password"
          value={formData.confirmPassword}
          onChange={handleChange}
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
  );
}