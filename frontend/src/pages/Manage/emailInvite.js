import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

function EmailInviteForm() {
  const [emails, setEmails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emails.trim()) {
      console.log('Emails to send codes to:', emails);

    } else {
      console.log('No emails provided, skipping email invite.');
    }

    setIsSubmitted(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Invite by Email (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter email addresses (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </Form.Group>
        {isSubmitted && (
          <Alert variant="success">
            {emails.trim()
              ? 'Access codes have been sent to the provided emails!'
              : 'No emails were provided, but the form was submitted successfully!'}
          </Alert>
        )}
      </Form>
    </>
  );
}

export default EmailInviteForm;