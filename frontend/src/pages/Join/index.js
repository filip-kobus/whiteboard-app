import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Join() {
  const [code, setCode] = useState('');

  async function handleSubmit(event) {
    ;
  }

  return (
    <div className="content-section">
        <div className="content-container">
          <h2 className="text-center title mb-4">Enter board</h2>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter your code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 submit-button">
              Submit
            </Button>
          </Form>
        </div>
    </div>
  );
}

export default Join;
