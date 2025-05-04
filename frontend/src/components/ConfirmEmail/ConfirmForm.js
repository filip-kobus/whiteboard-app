import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ConfirmForm({ code, setCode, onSubmit, onResend }) {
  return (
    <Form className="form" onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="code"
          placeholder="Enter code from your email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 submit-button">
        Confirm
      </Button>
      <Button
        variant="link"
        type="button"
        className="w-100 mt-2 resend-button"
        onClick={onResend}
      >
        Resend Code
      </Button>
    </Form>
  );
}