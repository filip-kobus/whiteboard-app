import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function EmailInviteForm() {
  const [emails, setEmails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Emails to send codes to:', emails);
    setIsSubmitted(true);
    
    // In a real app, you would call your API here:
    // await api.sendBoardCodes(emails.split(',').map(email => email.trim()));
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Invite by Email</Form.Label>
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
          Access codes have been sent to the provided emails!
        </Alert>
      )}
    </>
  );
}

export default EmailInviteForm;